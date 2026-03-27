# Configuration Recommandée pour Sentry (Optionnel mais Recommandé)

Sentry vous aide à capturer et analyser les erreurs en production.

## 1. Créer un compte Sentry

Allez sur https://sentry.io et créez un compte gratuit.

## 2. Créer un projet

1. Cliquez sur "Create Project"
2. Choisissez "Next.js" comme plateforme
3. Sentry vous donnera un DSN (clé d'authentification)

## 3. Ajouter les variables d'environnement

```env
# DSN Sentry (obligatoire)
SENTRY_DSN=https://xxxxx@xxxxx.ingest.sentry.io/xxxxxx

# Token d'authentification Sentry (optionnel, pour l'upload des source maps)
SENTRY_AUTH_TOKEN=sntrys_xxxxxxxxxxx
SENTRY_ORG=your-organization-name
SENTRY_PROJECT=your-project-name
```

## 4. Vérifier que Sentry fonctionne

### En développement
Les erreurs ne sont capturées qu'en production (pour éviter le bruit).

### En production
1. Allez sur votre tableau de bord Sentry
2. Vous verrez les erreurs en temps réel
3. Cliquez sur une erreur pour voir les détails (source maps, breadcrumbs, user context, etc.)

## 5. Bonnes pratiques

- ✅ Configurez des alertes pour les erreurs critiques
- ✅ Ajoutez des équipes pour la collaboration
- ✅ Intégrez Slack/Discord pour les notifications
- ✅ Définissez des projets pour dev/staging/prod
- ✅ Testez avec une erreur intentionnelle en prod

## 6. Limites du plan gratuit

- 10,000 erreurs par mois
- Rétention de 30 jours
- Pas de Session Replay

Pour plus d'erreurs, passez à un plan payant.

---

# Configuration Recommandée pour Analytics

## Google Analytics

### Créer un compte
1. Allez sur https://analytics.google.com
2. Cliquez sur "Create Account"
3. Entrez le nom de votre site
4. Créez une nouvelle propriété pour votre domaine

### Ajouter l'ID de suivi
```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Vérifier les données
1. Allez sur le tableau de bord
2. Cliquez sur "Real-time"
3. Les visiteurs doivent apparaître en temps réel

## Vercel Analytics

Vercel Analytics est automatiquement disponible suite à la configuration de Next.js et ne nécessite aucune clé d'API.

Il vous donne accès aux Core Web Vitals.

---

# Top 10 des Erreurs à Éviter

1. ❌ Commiter `.env.local` dans git
2. ❌ Utiliser SERVICE_ROLE_KEY côté client
3. ❌ Oublier HTTPS en production
4. ❌ Ne pas configurer les RLS policies Supabase
5. ❌ Ignorer les logs d'erreur Sentry
6. ❌ Ne pas tester les paiements avant le live
7. ❌ Oublier la signature du webhook (Flutterwave)
8. ❌ Ne pas valider les emails côté serveur
9. ❌ Partager les clés API sur les réseaux
10. ❌ Déployer sans tests

---

# Ressources Utiles

## Documentation Officielle
- [Next.js 15](https://nextjs.org/docs)
- [Supabase](https://supabase.com/docs)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [React](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)

## Services Gratuits
- [Vercel](https://vercel.com) - Hosting
- [Supabase](https://supabase.com) - Database
- [Sentry](https://sentry.io) - Error tracking
- [Resend](https://resend.com) - Email service
- [Upstash](https://upstash.com) - Redis
- [Flutterwave](https://flutterwave.com) - Payment processor
- [Google Analytics](https://analytics.google.com) - Analytics

## Outils de Développement
- [insomnia](https://insomnia.rest/) - API testing
- [DBeaver](https://dbeaver.io/) - Database management
- [Figma](https://figma.com) - Design
- [GitHub Copilot](https://github.com/features/copilot) - AI assistant

---

# Commandes Utiles

```bash
# Développement
npm run dev                # Démarrer le serveur
npm run build              # Build de production
npm start                  # Lancer en production

# Tests
npm test                   # Tests unitaires
npm run test:watch        # Watch mode
npm run test:e2e          # Tests E2E
npm run test:e2e:ui       # E2E avec UI

# Qualité de code
npm run lint              # ESLint
npm run type-check        # TypeScript check

# Maintenance
npm audit                 # Vérifier les vulnérabilités
npm outdated              # Vérifier les mises à jour
nbpm update               # Mettre à jour les dépendances
```

---

Besoin d'aide ? Consultez la documentation ou ouvrez une issue dans votre repo GitHub.
