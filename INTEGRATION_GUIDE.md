# 🎯 Integration Guide - Utiliser les Nouelles Features

Ce guide explique comment intégrer les nouvelles features dans vos routes API.

## 📋 Table des Matières

1. [Rate Limiting](#rate-limiting)
2. [Emails](#emails)
3. [Sentry Monitoring](#sentry-monitoring)
4. [Flutterwave Paiements](#flutterwave-paiements)
5. [Pattern Complet](#pattern-complet)

---

## 🛡️ Rate Limiting

### Importer les utilitaires
```typescript
import { rateLimiters, getClientIP } from '@/lib/rate-limit';
```

### Ajouter dans votre route
```typescript
export async function POST(request: Request) {
    const clientIP = getClientIP(request);

    // Appliquer le rate limiting
    const rateLimit = await rateLimiters.contact(clientIP); // ou newsletter, payment, etc.

    if (!rateLimit.success) {
        return NextResponse.json(
            {
                success: false,
                message: 'Trop de tentatives. Veuillez réessayer plus tard.',
                retryAfter: rateLimit.resetTime,
            },
            { status: 429, headers: { 'Retry-After': rateLimit.resetTime.toString() } }
        );
    }

    // Votre logique ici...
}
```

### Rate limiters disponibles
```typescript
// Respecter les limites prédéfinies
rateLimiters.login(identifier)           // 5 / 5 min
rateLimiters.signup(identifier)          // 3 / hour
rateLimiters.magicLink(identifier)       // 3 / 10 min
rateLimiters.contact(identifier)         // 5 / hour
rateLimiters.newsletter(identifier)      // 5 / hour
rateLimiters.recruitment(identifier)     // 10 / day
rateLimiters.payment(identifier)         // 20 / hour
rateLimiters.cvUpload(identifier)        // 5 / hour
```

### Créer un limiter personnalisé
```typescript
import { checkRateLimit } from '@/lib/rate-limit';

const myLimit = await checkRateLimit(
    `my-endpoint:${clientIP}`,
    10,     // limit: 10
    3600    // window: 1 hour (in seconds)
);

if (!myLimit.success) {
    // Handle rate limit exceeded
}
```

---

## ✉️ Emails

### Importer les fonctions
```typescript
import {
    sendSignupConfirmation,
    sendPasswordReset,
    sendNewsletterConfirmation,
    sendContactConfirmation,
    sendRecruitmentConfirmation,
} from '@/lib/email';
```

### Pattern d'utilisation
```typescript
try {
    // Envoyer un email (les erreurs ne bloquent pas la requête)
    await sendContactConfirmation(email, name, subject);
} catch (error) {
    // Log l'erreur mais continuer
    console.warn('Email send failed:', error);
}
```

### Ajouter un nouvel email

Pour ajouter un nouvel email, créez une fonction dans `src/lib/email.ts` :

```typescript
export async function sendMyCustomEmail(email: string, data: any) {
    try {
        const result = await resend.emails.send({
            from: FROM_EMAIL,
            to: email,
            subject: 'My Custom Email',
            html: `
<!DOCTYPE html>
<html>
<head>
    <style>
        /* Votre CSS */
    </style>
</head>
<body>
    <!-- Votre contenu -->
</body>
</html>
            `,
        });
        return result;
    } catch (error) {
        console.error('My custom email error:', error);
        throw error;
    }
}
```

---

## 🎯 Sentry Monitoring

### Importer les utilitaires
```typescript
import {
    captureException,
    captureMessage,
    addBreadcrumb,
    setUserContext,
    clearUserContext,
} from '@/lib/sentry';
```

### Capturer les erreurs
```typescript
try {
    // Votre code risqué
} catch (error) {
    if (error instanceof Error) {
        captureException(error, {
            source: 'api/my-endpoint',
            userId: user?.id,
        });
    }
}
```

### Ajouter des breadcrumbs (piste d'audit)
```typescript
addBreadcrumb('User signup started', {
    email: user.email,
    source: 'email-form',
});

// Plus tard...
addBreadcrumb('Email sent', {
    recipient: user.email,
    template: 'signup-confirmation',
});
```

### Tracker les utilisateurs
```typescript
// User login
setUserContext(userId, userEmail, username);

// User logout
clearUserContext();
```

---

## 💳 Flutterwave Paiements

### Importer les fonctions
```typescript
import {
    initializeFlutterwavePayment,
    verifyFlutterwavePayment,
    getFlutterwaveTransaction,
} from '@/lib/flutterwave';
```

### Initialiser un paiement
```typescript
const flutterwaveResponse = await initializeFlutterwavePayment(
    amount,              // montant en XOF
    customerEmail,
    customerName,
    customerPhone,
    paymentId,           // votre ID de transaction
    description
);

// Répondre au client
return NextResponse.json({
    checkoutUrl: flutterwaveResponse.checkoutUrl,
    txRef: flutterwaveResponse.txRef,
});
```

### Webhook de paiement
Le webhook est déjà configuré dans `src/app/api/payments/webhook/route.ts`

Vous devez configurer dans Flutterwave :
- **URL** : `https://yourdomain.com/api/payments/webhook`
- **Événements** : `charge.completed`

---

## 🎨 Pattern Complet (Exemple Réel)

Voici un exemple complet montrant comment utiliser toutes les features ensemble :

```typescript
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { supabaseAdmin } from '@/lib/supabase-server';
import { sendContactConfirmation } from '@/lib/email';
import { rateLimiters, getClientIP } from '@/lib/rate-limit';
import { captureException, addBreadcrumb } from '@/lib/sentry';

const mySchema = z.object({
    email: z.string().email(),
    name: z.string().min(2),
    message: z.string().min(10),
});

export async function POST(request: Request) {
    const clientIP = getClientIP(request);

    try {
        // 1️⃣ RATE LIMITING
        const rateLimit = await rateLimiters.contact(clientIP);
        if (!rateLimit.success) {
            return NextResponse.json(
                { success: false, message: 'Too many requests' },
                { status: 429 }
            );
        }

        // 2️⃣ VALIDATION
        const body = await request.json();
        const validated = mySchema.parse(body);

        // 3️⃣ BREADCRUMB (pour Sentry)
        addBreadcrumb('Contact form submission', {
            email: validated.email,
            clientIP,
        });

        // 4️⃣ SAVE TO DATABASE
        const { data, error: dbError } = await supabaseAdmin
            .from('contact_messages')
            .insert({
                email: validated.email,
                name: validated.name,
                message: validated.message,
            })
            .select('id')
            .single();

        if (dbError) {
            throw dbError;
        }

        // 5️⃣ SEND EMAIL
        try {
            await sendContactConfirmation(
                validated.email,
                validated.name,
                'Your Message'
            );
        } catch (emailError) {
            console.warn('Email failed but request succeeded', emailError);
        }

        // 6️⃣ BREADCRUMB SUCCESS
        addBreadcrumb('Contact message saved and email sent', {
            messageId: data.id,
        });

        // 7️⃣ RESPOND
        return NextResponse.json({
            success: true,
            message: 'Message reçu!',
        });

    } catch (error) {
        // 8️⃣ ERROR HANDLING
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { success: false, errors: error.errors },
                { status: 400 }
            );
        }

        if (error instanceof Error) {
            captureException(error, {
                source: 'my-endpoint',
                ip: clientIP,
            });
        }

        return NextResponse.json(
            { success: false, message: 'Server error' },
            { status: 500 }
        );
    }
}
```

---

## 📝 Checklist d'Intégration

Quand vous ajoutez une nouvelle route API :

- [ ] Importer `getClientIP` et `rateLimiters`
- [ ] Importer `captureException` et `addBreadcrumb`
- [ ] Ajouter le rate limiting au début
- [ ] Ajouter les breadcrumbs pour le debugging
- [ ] Envoyer les emails si nécessaire
- [ ] Capturer les exceptions pertinentes
- [ ] Ajouter les types TypeScript appropriés
- [ ] Écrire des tests unitaires
- [ ] Tester en développement
- [ ] Vérifier dans Sentry en production

---

## 🚨 Erreurs Courantes à Éviter

### ❌ Ne pas faire
```typescript
// Ne pas oublier le rate limiting
export async function POST(request: Request) {
    // Pas de rate limiting!
    const body = await request.json();
    // ...
}

// Ne pas envoyer d'erreurs sensibles au client
return NextResponse.json({
    error: error.message, // Expose database error!
});

// Ne pas oublier d'attendre les promises
sendEmail(email); // Oubli du await!

// Ne pas utiliser SERVICE_ROLE_KEY côté client
const { data } = await supabase // anonymous!
    .from('users')
    .select('*');
```

### ✅ À faire
```typescript
export async function POST(request: Request) {
    const clientIP = getClientIP(request);

    // Rate limiting
    const rateLimit = await rateLimiters.myEndpoint(clientIP);
    if (!rateLimit.success) return error(429);

    try {
        // Validation
        const data = mySchema.parse(body);

        // Database
        const result = await supabaseAdmin
            .from('table')
            .insert(data);

        // Email
        await sendEmail(data.email);

        // Success
        return NextResponse.json({ success: true });

    } catch (error) {
        // Error handling
        captureException(error);
        return error(500, 'Generic message');
    }
}
```

---

## 📚 Ressources Supplémentaires

- [Rate Limiting Library](./src/lib/rate-limit.ts)
- [Email Templates](./src/lib/email.ts)
- [Sentry Utilities](./src/lib/sentry.ts)
- [Flutterwave Integration](./src/lib/flutterwave.ts)
- [API Examples](./src/app/api/)

---

Besoin d'aide ? Consultez les fichiers source ou le documentation principal.
