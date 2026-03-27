# Troubleshooting Guide - API Error 500

## Problème
Vous recevez une erreur 500 (Internal Server Error) sur `https://sojif.vercel.app/api/contact`

## Diagnostic

### 1. Vérifier la configuration des variables d'environnement

Visitez: `https://sojif.vercel.app/api/health`

Cet endpoint affiche quelles variables d'environnement sont configurées:
```json
{
  "timestamp": "2026-03-27T...",
  "environment": "production",
  "configured": {
    "supabase": {
      "url": true,        // ✓ ou ✗
      "anonKey": true,    // ✓ ou ✗
      "serviceRole": true // ✓ ou ✗
    },
    "resend": {
      "apiKey": true      // ✓ ou ✗
    },
    "upstash": {
      "url": true,        // ✓ ou ✗
      "token": true       // ✓ ou ✗
    },
    "flutterwave": {
      "publicKey": true,  // ✓ ou ✗
      "secretKey": true   // ✓ ou ✗
    },
    "sentry": {
      "dsn": true         // ✓ ou ✗
    }
  }
}
```

### 2. Configurer les variables d'environnement sur Vercel

1. Allez à: https://vercel.com/dashboard
2. Sélectionnez votre projet SOJIF
3. Allez à **Settings > Environment Variables**
4. Ajoutez les variables manquantes:

```
NEXT_PUBLIC_SUPABASE_URL=https://mhwjvyswjsaiidctihwx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
RESEND_API_KEY=re_...
UPSTASH_REDIS_REST_URL=https://...
UPSTASH_REDIS_REST_TOKEN=...
FLUTTERWAVE_PUBLIC_KEY=FLWPUBK_...
FLUTTERWAVE_SECRET_KEY=...
SENTRY_DSN=https://...
SENTRY_SUPPRESS_TURBOPACK_WARNING=1
```

5. Cliquez **Save**
6. Redéployez votre application

### 3. Vérifier les logs sur Vercel

1. Dans le dashboard Vercel
2. Allez à **Deployments** > dernier déploiement
3. Cliquez sur **Logs**
4. Cherchez les erreurs dans la section "Runtime"

### 4. Solutions courantes

**Erreur: "Supabase error"**
- Vérifier `NEXT_PUBLIC_SUPABASE_URL` et `SUPABASE_SERVICE_ROLE_KEY`
- S'assurer que la table `contact_messages` existe dans Supabase

**Erreur: "Public Key required"** 
- Verifier `FLUTTERWAVE_PUBLIC_KEY` et `FLUTTERWAVE_SECRET_KEY`

**Erreur: "Redis config missing"**
- Vérifier `UPSTASH_REDIS_REST_URL` et `UPSTASH_REDIS_REST_TOKEN`

**Erreur: "Resend API key"**
- Vérifier `RESEND_API_KEY`

### 5. Test simple

Pour tester manuellement l'API, ouvrez la console du navigateur et exécutez:

```javascript
const response = await fetch('https://sojif.vercel.app/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
    phone: '+33612345678',
    subject: 'Test',
    message: 'This is a test message'
  })
});

const data = await response.json();
console.log(response.status, data);
```

### 6. Logs locaux pour le développement

En développement local (`npm run dev`), consultez la sortie du terminal pour plus de détails sur les erreurs:

```bash
npm run dev
# Envoyez une requête pour voir les logs détaillés
```

## Support

Si le problème persiste:
1. Vérifiez `/api/health` pour identifier les services manquants
2. Consultez les logs Vercel  
3. Testez avec curl pour isoler le problème
4. Vérifiez que les bases de données Supabase ont les tables correctes
