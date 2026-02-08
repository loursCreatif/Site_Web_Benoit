# BT Électricité - Site Vitrine

Site web professionnel pour **BT Électricité** (Benoit Taquet), artisan électricien spécialisé en électricité générale et installation de bornes de recharge (IRVE) à Lyon et ses environs.

## 🚀 Fonctionnalités

- **Architecture Modulaire** : Chargement dynamique des sections HTML pour une maintenance facilitée.
- **Design Responsive** : Optimisé pour mobiles, tablettes et ordinateurs.
- **Spécialisation IRVE** : Mise en avant de l'expertise en bornes de recharge pour véhicules électriques.
- **Formulaire de Contact** : Système de demande de devis intégré avec validation.
- **Animations Modernes** : Effets de révélation au scroll, particules et transitions fluides.

## 🛠️ Stack Technique

- **Frontend** : HTML5, CSS3 (Variables, Flexbox/Grid), JavaScript Vanilla.
- **Backend** : PHP (pour l'envoi d'e-mails via `send-email.php`).
- **Outils** : Architecture sans framework (Vanilla JS) pour une performance optimale.

## 📁 Structure du Projet

```text
├── index.html          # Point d'entrée principal
├── sections/           # Fragments HTML des différentes sections
├── css/                # Feuilles de style organisées par section
│   ├── animations/     # Effets visuels et animations
│   └── sections/       # Styles spécifiques aux modules
├── js/                 # Logique JavaScript modulaire
│   ├── loader.js       # Chargement dynamique des sections
│   └── main.js         # Initialisation et scripts globaux
└── assets/             # Images, logos et ressources graphiques
```

## 💻 Lancer le projet localement

Pour prévisualiser le site avec le chargement dynamique des sections, vous devez utiliser un serveur local (le protocole `file://` ne permet pas les requêtes fetch vers les fragments HTML).

Exécutez la commande suivante à la racine du projet :

```bash
npx -y serve .
```

Le site sera accessible sur [http://localhost:3000](http://localhost:3000).

## 🔗 Liens

- **Dépôt GitHub :** [https://github.com/loursCreatif/Site_Web_Benoit](https://github.com/loursCreatif/Site_Web_Benoit)
