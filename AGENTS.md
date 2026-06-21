# 📋 Documentation Projet — Site Web BT Électricité

> **Ce fichier est la mémoire du projet.** Il contient toutes les informations
> dont l'agent IA (Hermes) a besoin pour travailler sur le site de Benoit.
> À conserver et à mettre à jour à chaque changement important.

---

## 1. 🏪 L'entreprise

| | |
|---|---|
| **Nom** | BT Électricité |
| **Propriétaire** | Benoit Taquet |
| **Activité** | Électricien généraliste + installation de bornes de recharge IRVE (véhicules électriques) |
| **Adresse** | 1 bis rue Thomas Helye, 50440 La Hague, Manche, Normandie |
| **Téléphone** | 07 49 45 79 23 |
| **Email** | contact@btelectricite.fr |
| **Zone d'intervention** | La Hague, Cherbourg, Manche, Normandie |

---

## 2. 🌐 Le site web

| | |
|---|---|
| **Nom de domaine** | `btelectricite.fr` |
| **Hébergement** | Hostinger (compte Benoit) — **identifiants à récupérer auprès de Benoit** |
| **URL en ligne** | https://btelectricite.fr |
| **Type de site** | Site vitrine (présentation de l'entreprise + formulaire de contact) |
| **Technologies** | HTML5, CSS3, JavaScript vanilla (pas de framework), PHP pour l'email |
| **Responsive** | Oui — optimisé mobile, tablette, ordinateur |

### 📁 Structure des fichiers du site

```text
Site_Web_Benoit/
├── index.html              ← Page principale (point d'entrée)
├── mentions-legales.html   ← Page mentions légales
├── send-email.php          ← Script PHP d'envoi d'email (backup, voir FormSubmit)
├── sections/               ← Fragments HTML chargés dynamiquement
│   ├── header.html            (en-tête + navigation)
│   ├── hero.html             (bandeau d'accueil)
│   ├── about.html           (à propos / profil de Benoit)
│   ├── services.html       (prestations + bornes IRVE)
│   ├── coverage.html       (zone d'intervention)
│   ├── gallery.html         (portfolio / réalisations)
│   ├── stats.html           (chiffres clés)
│   ├── testimonials.html  (avis clients)
│   ├── faq.html              (questions fréquentes)
│   ├── footer.html          (pied de page)
├── css/                    ← Feuilles de style
│   ├── variables.css        (couleurs, polices — centralisé ici)
│   ├── base.css
│   ├── components.css
│   ├── responsive.css
│   ├── sections/           (un fichier CSS par section)
│   └── animations/         (effets visuels et animations)
├── js/                     ← Scripts JavaScript
│   ├── loader.js            (charge les sections HTML dynamiquement)
│   ├── main.js              (initialisation globale)
│   ├── form-validation.js  (validation + envoi du formulaire de contact)
│   ├── modal-quote.js     (fenêtre popup devis)
│   ├── carousel.js
│   ├── accordion.js
│   ├── gallery.js
│   ├── hero-slider.js
│   └── theme.js
├── assets/                 ← Images, logos, photos
│   ├── images/
│   │   ├── logo_transparent.png
│   │   ├── og-image.jpg         (image pour partage réseaux sociaux)
│   │   ├── hero_van_sunset.jpg
│   │   ├── portfolio/           (Benoit_profil, Borne, Prise, réalisations...)
│   │   └── services/            (illustrations des prestations)
├── plans/                  ← Documentation du développeur précédent
│   ├── architecture.md
│   ├── content.md
│   └── amelioration-site.md
└── screenshots/            ← Captures d'écran (desktop + animation)
```

### 🎨 Charte graphique (couleurs)

Les couleurs sont définies dans `css/variables.css`. La palette principale est :
- Fond sombre : `#1a1a2e` (bleu nuit) et `#16213e`
- Accent / boutons : `#f59e0b` (jaune/orange)
- Voir `css/variables.css` pour la liste complète.

### 📝 Comment le site fonctionne

1. **Chargement** : `index.html` appelle `js/loader.js` qui charge automatiquement tous les fragments HTML du dossier `sections/` dans la page.
2. **Pour modifier une section** (ex. les services, le texte "à propos") : éditer le fichier correspondant dans `sections/`.
3. **Pour changer les couleurs** : éditer `css/variables.css` — tout est centralisé là.
4. **Pour voir le site en local** : il faut un serveur local (le simple ouverture du fichier ne marche pas à cause du chargement dynamique). Commande : `npx -y serve .` (depuis le dossier `Site_Web_Benoit`), puis ouvrir http://localhost:3000

---

## 3. 🔑 GitHub — où est stocké le code

| | |
|---|---|
| **Dépôt GitHub** | https://github.com/loursCreatif/Site_Web_Benoit |
| **Propriétaire du dépôt** | `loursCreatif` (le développeur précédent) — **Benoit est collaborateur, pas propriétaire** |
| **Compte GitHub de Benoit** | `benoit600` (créé juin 2026) |
| **Branche principale** | `main` |
| **Clone local** | `C:\Users\benta\Site_Web_Benoit` |

### 🔒 Token d'accès GitHub (PAT)

- Un **Personal Access Token (PAT)** a été créé pour le compte `benoit600`.
- **Où il est** : il est directement **intégré dans l'URL du remote git** du clone local.
  - Voir avec : `git remote get-url origin` (depuis le dossier `Site_Web_Benoit`)
  - Format : `https://benoit600:ghp_xxxxxx@github.com/loursCreatif/Site_Web_Benoit.git`
- **Pour le récupérer ou le renouveler** : GitHub → Settings → Developer settings → Personal access tokens (sur le compte `benoit600`).

### ⚠️ Problème connu — Git Credential Manager (GCM) sur Windows

Sur cette machine, le GCM intercepte les credentials git et tente d'utiliser d'anciens identifiants (bentaquet-jpg), ce qui fait échouer les `git push`.

**Solution de contournement (workaround établi)** : le token est embarqué directement dans l'URL du remote (voir ci-dessus). Ainsi, `git push origin main` contourne le GCM et utilise directement le token.

### 📤 Procédure pour pousser des modifications sur GitHub

```bash
# 1. Se placer dans le dossier du projet
cd C:\Users\benta\Site_Web_Benoit

# 2. Voir ce qui a changé
git status

# 3. Ajouter les fichiers modifiés
git add .

# 4. Créer un commit (message descriptif)
git commit -m "Description de la modification"

# 5. Envoyer sur GitHub
git push origin main
```

> 💡 **Note pour Benoit** : l'agent IA (Hermes) peut faire tout ça pour toi.
> Tu n'as qu'à décrire la modification souhaitée et il s'occupe de l'édition,
> du commit et du push.

### Derniers commits (historique)

1. `d16a8c6` — Correction SEO: Lyon → La Hague/Cherbourg, elecpro.fr → btelectricite.fr
2. `1a1c70b` — Anti-spam (honeypot + rate limiting) et message de succès avec confettis
3. `8d46f16` — Connexion formulaire contact à FormSubmit + email confirmation auto
4. `acdc89a` — Fix mobile: logo et bornes en colonne
5. `473495d` — Force cache refresh modal-quote.js

---

## 4. 📧 Formulaire de contact — comment il marche

Le formulaire de contact utilise **deux systèmes** :

### Système principal : FormSubmit (gratuit, sans serveur)

- **Service** : FormSubmit.co — envoie les emails sans besoin de backend
- **Endpoint** : `https://formsubmit.co/ajax/contact@btelectricite.fr`
- **Fichier** : `js/form-validation.js` (ligne ~177 : `FORMSUBMIT_URL`)
- **Fonctionnement** : quand un client remplit le formulaire sur le site,
  les données sont envoyées à FormSubmit qui les transmet à `contact@btelectricite.fr`
- **Anti-spam** : honeypot (champ piége caché) + rate limiting (5s min entre envois)
- **Configuration FormSubmit** : `_captcha=false`, `_template=table`
- **Lien d'activation** : la première fois, FormSubmit envoie un email de confirmation
  à `contact@btelectricite.fr` — cliquer sur le lien pour activer le service.

### Système backup : send-email.php

- Le fichier `send-email.php` existe aussi (solution PHP classique via `mail()`).
- Il envoie 2 emails : notification à Benoit + confirmation HTML au client.
- **Non utilisé actuellement** sur Hostinger (le site utilise FormSubmit en JS).
- Disponible si Hostinger supporte PHP et qu'on veut basculer.

### Champs du formulaire

| Nom champ | Type | Règles |
|---|---|---|
| `name` | Texte | Requis, min 2 caractères, lettres uniquement |
| `email` | Email | Requis, format email valide |
| `phone` | Texte | Requis, format téléphone français |
| `type_demande` / `sujet` | Select | Requis |
| `message` | Textarea | Requis, min 10 caractères |
| `consent` | Checkbox | Requis (consentement RGPD) |
| `_honey`, `website` | Cachés | Pièges anti-bot (honeypot) |

---

## 5. 🌍 Hébergement Hostinger

| | |
|---|---|
| **Hébergeur** | Hostinger |
| **Compte** | Compte de Benoit (identifiants non documentés ici — les récupérer auprès de lui si besoin) |
| **Domaine** | btelectricite.fr |
| **Supporte PHP** | Oui (Hostinger supporte PHP — `send-email.php` utilisable si besoin) |
| **Panneau** | hPanel Hostinger |

### 🚀 Déployer le site en ligne

Le site est déployé via **GitHub + Hostinger**. La procédure exacte dépend de la configuration Hostinger :

- **Option A** : Hostinger a un outil de déploiement depuis GitHub (dans hPanel → Sites web → Déploiement Git). On connecte le dépôt `loursCreatif/Site_Web_Benoit` et Hostinger tire automatiquement.
- **Option B** : Upload manuel via FTP (FileZilla ou le gestionnaire de fichiers Hostinger). Glisser-déposer les fichiers du dossier `Site_Web_Benoit` vers `public_html/` sur Hostinger.

> ⚠️ **À clarifier avec Benoit** : comment se fait actuellement le déploiement vers Hostinger ? Git deploy ou upload manuel ?

---

## 6. 🔍 SEO — Référencement

### ✅ Corrections déjà effectuées (commit d16a8c6)

- Les meta tags SEO dans `index.html` référençaient encore **Lyon** et **elecpro.fr** (restes du template d'origine du développeur précédent).
- **Corrigé** : Lyon → La Hague / Cherbourg / Manche / Normandie ; elecpro.fr → btelectricite.fr
- Concernait : `<title>`, `<meta description>`, `<meta keywords>`, Open Graph (Facebook), Twitter Card.

### État actuel du SEO

- `<title>` : "BT Électricité | Électricien Généraliste & Spécialiste Bornes IRVE - La Hague, Cherbourg"
- `<meta name="description">` : description optimisée pour La Hague / Cherbourg
- Open Graph : image `og-image.jpg`, URL `https://btelectricite.fr/`
- `lang="fr"` sur la balise `<html>`
- `robots` : `index, follow`

> ⚠️ **Attention** : le fichier `README.md` (ligne 3) mentionne encore "Lyon et ses environs" — c'est un reste du template. **Pas urgent** (le README n'est pas en ligne sur le site), mais à corriger pour la cohérence.

---

## 7. 📋 Mentions légales

- Fichier : `mentions-legales.html` (page séparée)
- Contient probablement les infos légales (SIRET, etc.) — **à vérifier** que les infos sont correctes pour BT Électricité / La Hague.

---

## 8. 🛠️ Tâches à faire / idées d'amélioration

> Section à maintenir — noter ici les futures modifications envisagées.

- [ ] **Corriger README.md** : encore "Lyon" ligne 3 (reste du template)
- [ ] **Clarifier déploiement Hostinger** : Git deploy ou upload manuel ?
- [ ] **Vérifier mentions-legales.html** : SIRET et infos correctes ?
- [ ] **Console Google Search Console** : indexer btelectricite.fr ?
- [ ] **Google Business** : fiche Google My Business liée au site ?

---

## 9. 👤 Contexte utilisateur

- **Benoit** est non-technique (électricien, pas développeur).
- Il communique en **français**.
- Il préfère que l'agent IA **fasse les opérations lui-même** (push, edits) plutôt que de lui expliquer comment faire.
- Il veut apprendre à gérer lui-même à terme, mais a besoin d'être guidé pas à pas.
- **Toujours s'adresser à lui en français, de façon simple et patiente.**

---

*Dernière mise à jour de ce fichier : juin 2026*
