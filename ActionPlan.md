# XDose – Action Plan

## 0. PRIORITÉ : Flow d'Upload Vidéo Production (Prisma/PostgreSQL + Mux)

### Backend (API Node/Express ou Next.js API routes)
- [ ] Configurer Prisma et PostgreSQL
  - [ ] Initialiser Prisma (`npx prisma init`)
  - [ ] Définir les modèles (User, Video, etc.) dans `schema.prisma`
  - [ ] Générer le client Prisma
  - [ ] Configurer la connexion à PostgreSQL (`DATABASE_URL`)
  - [ ] Migrer la base (dev & prod)
- [ ] Intégrer Mux côté serveur
  - [ ] Installer le SDK Mux Node.js
  - [ ] Créer une route pour générer une URL d'upload direct (Direct Uploads API)
  - [ ] Stocker assetId/playbackId dans la base
  - [ ] (Optionnel) Gérer les webhooks Mux pour l'état des vidéos
- [ ] Endpoints API vidéo
  - [ ] POST `/api/videos/upload-url` (générer URL upload Mux)
  - [ ] POST `/api/videos` (enregistrer vidéo dans la base)
  - [ ] GET `/api/videos` (feed, profil)
  - [ ] GET `/api/videos/:id` (détail)
- [ ] Authentification & sécurité
  - [ ] Middleware d'auth (JWT/session)
  - [ ] Vérification du rôle (créateur/viewer)
  - [ ] Validation des entrées

### Frontend
- [ ] Appeler l'API backend pour obtenir l'URL d'upload Mux
- [ ] Uploader la vidéo sur Mux (Direct Upload)
- [ ] Suivre la progression de l'upload (progress bar)
- [ ] Récupérer assetId/playbackId à la fin
- [ ] Envoyer les métadonnées à l'API backend
- [ ] Afficher le feedback utilisateur (succès/erreur)
- [ ] Réinitialiser le formulaire après succès
- [ ] Utiliser playbackId pour lire la vidéo
- [ ] Gérer les droits d'accès (tiers, abonnements)

### Configuration Production
- [ ] Utiliser une base PostgreSQL managée (Supabase, Railway, etc.)
- [ ] Configurer les variables d'environnement (`DATABASE_URL`, `MUX_TOKEN_ID`, `MUX_TOKEN_SECRET`)
- [ ] Lancer les migrations Prisma en production
- [ ] Déployer backend & frontend (Vercel, Railway, etc.)
- [ ] Sécuriser les endpoints et les tokens
- [ ] Limiter la taille des uploads
- [ ] Monitoring/logs (Sentry, etc.)

---

## 1. Monétisation & Paiements
- [ ] Implémenter les abonnements flexibles (tiers, gestion, paiement)
  - [ ] Intégration Stripe/crypto/NFT
  - [ ] UI de souscription/annulation
  - [ ] Gestion des statuts d'abonnement
- [ ] Paiement à la demande (PPV)
- [ ] Système de pourboires (tips)
- [ ] Intégration NFT/crypto (optionnel)

## 2. Tableau de bord Créateur
- [ ] Page analytics (vues, revenus, abonnés)
- [ ] Gestion des abonnements (voir, annuler, rembourser)
- [ ] Historique des transactions

## 3. Marketplace d'Assets
- [ ] UI/UX Marketplace
- [ ] Upload/achat/vente d'assets
- [ ] Paiement et gestion des droits

## 4. XDose Academy
- [ ] Page d'accueil Academy
- [ ] Cours/vidéos/tutoriels pour créateurs
- [ ] Système de progression/certification

## 5. Découverte IA
- [ ] Algorithme de suggestion IA (contenus/créateurs)
- [ ] UI de recommandations personnalisées

## 6. Studio IA & Création
- [ ] Outils IA (édition vidéo, templates, collaboration)
- [ ] Intégration musique/texte IA
- [ ] Sauvegarde brouillons
- [ ] Collaboration temps réel (optionnel)

## 7. Paramètres avancés
- [ ] Bien-être numérique (temps d'écran, alertes)
- [ ] Accessibilité (contraste, police, navigation clavier)
- [ ] Préférences utilisateur (notifications, confidentialité)

## 8. Sécurité & Robustesse
- [ ] Vérification stricte des rôles côté backend (API)
- [ ] Tests unitaires et E2E (auth, studio, paiement, feed)
- [ ] Gestion avancée des erreurs API
- [ ] Logs et monitoring (production)

## 9. UX/UI
- [ ] Finaliser responsive sur tous les écrans
- [ ] Améliorer animations et transitions
- [ ] Optimiser performance (lazy loading, code splitting)
- [ ] Accessibilité (audit complet)

## 10. Déploiement & Documentation
- [ ] Scripts de build/CI/CD pour Vercel
- [ ] Documentation technique (README, API, onboarding)
- [ ] Guide utilisateur (FAQ, support)

---

**Légende** :
- [ ] = À faire
- [x] = Fait

Ce plan doit être mis à jour à chaque sprint ou livraison. 