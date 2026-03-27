# 🚀 Post-Installation Setup Guide

Après avoir installé les dépendances avec `npm install`, suivez ces étapes pour finaliser les configurations.

## 1️⃣ Configuration des Variables d'Environnement

### Copier le fichier exemple
```bash
cp .env.local.example .env.local
```

### Remplir chaque variable

#### **Supabase** (Déjà configuré ?)
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...
```

#### **Flutterwave** (Créer compte gratuit : flutterwave.com)
```env
FLUTTERWAVE_PUBLIC_KEY=FLWPUBK_TEST_xxxxxxx
FLUTTERWAVE_SECRET_KEY=FLWSECK_TEST_xxxxxxx
FLUTTERWAVE_ENCRYPTION_KEY=xxxxxxx
FLUTTERWAVE_WEBHOOK_SECRET=webhook_secret_xxxxxxx
```

#### **Resend** (Créer compte gratuit : resend.com)
```env
RESEND_API_KEY=re_xxxxxxxxxx
```

#### **Sentry** (Créer compte gratuit : sentry.io)
```env
SENTRY_DSN=https://xxxxx@xxxxx.ingest.sentry.io/xxxxxx
SENTRY_AUTH_TOKEN=sntrys_xxxxxxxxxxx
```

#### **Upstash Redis** (Créer compte gratuit : upstash.com)
```env
UPSTASH_REDIS_REST_URL=https://xxx-xxx-xxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=xxxxxxxxxxxxx
```

#### **Google Analytics** (Optionnel : Créer compte gratuit : analytics.google.com)
```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

#### **App Config**
```env
NEXT_PUBLIC_APP_URL=http://localhost:3000  # http://localhost:3000 en dev, https://yourdomain.com en prod
NEXT_PUBLIC_APP_NAME=SOJIF Consulting
NODE_ENV=development  # development ou production
```

## 2️⃣ Configuration Supabase (RLS Policies)

### Appliquer les RLS policies
1. Aller sur [Supabase Console](https://app.supabase.com)
2. Ouvrir l'éditeur SQL
3. Copier le contenu de `SECURITY_RLS_POLICIES.sql`
4. Exécuter les requêtes

### Vérifier que RLS est activé
- Aller à "Authentication" > "Policies"
- S'assurer que chaque table a au moins une policy

## 3️⃣ Configuration Sentry (Optionnel mais Recommandé)

### Créer un projet Sentry
1. Créer un compte gratuit sur [sentry.io](https://sentry.io)
2. Créer un nouveau projet
3. Choisir "Next.js" comme plateforme
4. Copier le DSN et le AUTH TOKEN dans `.env.local`

### (Optionnel) Variables additionnelles pour Sentry
```env
SENTRY_ORG=your-organization-name
SENTRY_PROJECT=your-project-name
SENTRY_AUTH_TOKEN=sntrys_xxxxxxxxxxx
```

## 4️⃣ Configuration Flutterwave (Paiements)

### Créer un compte Flutterwave
1. S'inscrire sur [flutterwave.com](https://flutterwave.com)
2. Aller à "Settings" > "API Keys"
3. Copier les clés TEST dans `.env.local`
4. Plus tard, utiliser les clés LIVE pour la production

### Configurer le Webhook
1. Aller à "Settings" > "Webhooks"
2. Ajouter votre URL : `https://yourdomain.com/api/payments/webhook`
3. Sélectionner les événements : "charge.completed"
4. Copier le webhook secret dans `.env.local`

## 5️⃣ Configuration Resend (Emails)

### Créer un compte Resend
1. S'inscrire sur [resend.com](https://resend.com)
2. Aller à "API Keys"
3. Créer une nouvelle clé
4. Copier la clé dans `RESEND_API_KEY`

### (Important) Configurer le domaine
1. Ajouter votre domaine personnalisé (non obligatoire en développement)
2. Vérifier les enregistrements DNS
3. D'ici là, les emails seront envoyés depuis `noreply@sojif-consulting.com`

## 6️⃣ Configuration Upstash Redis (Rate Limiting)

### Créer une base Redis Upstash
1. S'inscrire sur [upstash.com](https://upstash.com)
2. Créer une nouvelle database
3. Copier l'URL REST et le TOKEN dans `.env.local`

## 7️⃣ Configuration Google Analytics (SEO)

### Créer un compte Google Analytics
1. Créer un compte gratuit sur [analytics.google.com](https://analytics.google.com)
2. Créer une nouvelle propriété pour votre site
3. Copier l'ID de suivi (format : `G-XXXXXXXXXX`)
4. Ajouter dans `NEXT_PUBLIC_GA_ID`

Les données commenceront à être collectées automatiquement.

## 8️⃣ Test des Configurations

### Tester en mode développement
```bash
# Démarrer le serveur
npm run dev

# Visiter http://localhost:3000
# Ouvrir les DevTools (F12)
# Aller à l'onglet "Network" et "Console"
```

### Vérifier que tout fonctionne
- [ ] Le site charge sans erreurs
- [ ] Les images WebP/AVIF se chargent
- [ ] Google Analytics envoie des données (DevTools > Console)
- [ ] Rate limiting fonctionne (faire plusieurs requêtes API)
- [ ] Emails s'envoient (tester le formulaire de contact)

### Tester les tests
```bash
# Tests unitaires
npm test

# Tests E2E
npm run test:e2e

# Type checking
npm run type-check

# ESLint
npm run lint
```

## 9️⃣ Déploiement vers Vercel (Recommandé)

### Préparer le déploiement
```bash
# Build local avant de déployer
npm run build

# Vérifier qu'il n'y a pas d'erreurs
npm start
```

### Déployer sur Vercel
```bash
# Installer Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy en production
vercel --prod
```

### Configurer les variables d'environnement sur Vercel
1. Aller à votre projet sur [vercel.com](https://vercel.com)
2. Aller à "Settings" > "Environment Variables"
3. Ajouter toutes les variables du `.env.local`
4. **Important** : Ne pas commiter `.env.local` dans git

## 🔟 Vérifications Finales Avant Production

- [ ] Tous les tests passent : `npm test`
- [ ] Build sans erreurs : `npm run build`
- [ ] Pas de TypeScript errors : `npm run type-check`
- [ ] Linting passe : `npm run lint`
- [ ] E2E tests passent : `npm run test:e2e`
- [ ] Variables d'environnement configurées
- [ ] Sitemap accessible : `/sitemap.xml`
- [ ] Analytics actif (vérifier Google Analytics)
- [ ] Sentry monitoring reçoit les erreurs
- [ ] Rate limiting fonctionne
- [ ] Webhooks Flutterwave configurés
- [ ] HTTPS activé
- [ ] Certificat SSL valide
- [ ] Custom domain configuré (optionnel)

## 📞 Support & Ressources

### Liens utiles
- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Sentry Docs](https://docs.sentry.io)
- [Flutterwave Docs](https://developer.flutterwave.com)
- [Resend Docs](https://resend.com/docs)
- [Upstash Docs](https://upstash.com/docs)

### En cas de problème
1. Vérifier les logs dans `.env.local`
2. Consulter la console du navigateur (DevTools)
3. Vérifier les logs Sentry sur sentry.io
4. Vérifier la documentation du service tierce
5. Demander de l'aide sur les forums ou Discord

---

🎉 **Vous êtes prêt pour la production !**

Votre application bénéficie maintenant de :
- ✅ Paiements sécurisés (Flutterwave)
- ✅ Emails transactionnels (Resend)
- ✅ Monitoring d'erreurs (Sentry)
- ✅ Rate limiting (Upstash Redis)
- ✅ Analytics & SEO (Google Analytics + Sitemap)
- ✅ Tests automatisés (Jest + Playwright)
- ✅ CI/CD pipeline (GitHub Actions)
