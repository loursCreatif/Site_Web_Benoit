# Plan d'Amélioration du Site Web - Électricien Pro

## Analyse Actuelle

### Problèmes Identifiés

1. **Hero Section** - Message trop centré sur les bornes
   - Titre actuel : "Votre électricien expert en bornes de recharge véhicules électriques"
   - Badge uniquement "Certifié IRVE"
   - Manque de mention de l'électricité générale

2. **Statistiques** - Trop orientées bornes
   - "500+ Bornes installées" en première position
   - Pas de stats sur les installations électriques générales
   - "2h temps d'intervention moyen" - générique mais pas lié à l'électricité

3. **Services** - Équilibre présent mais peut être renforcé
   - Deux catégories existantes : Électricité Générale et Bornes de Recharge
   - La spécialité IRVE est bien mise en valeur
   - Besoin de hiérarchie visuelle plus marquée

4. **Témoignages** - 100% orientés bornes
   - 4 témoignages : 3 sur les bornes, 1 sur dépannage
   - Aucun sur rénovation électrique, mise aux normes, éclairage

5. **SEO/Métadonnées** - Titre et description trop spécifiques aux bornes
   - Title : "ÉlecPro | Électricien Certifié IRVE - Bornes de Recharge..."
   - Meta description : uniquement sur les bornes

---

## Plan d'Amélioration

### 1. Hero Section - Double Message Clé

**Structure proposée :**
```
┌─────────────────────────────────────────────────────────────┐
│  BADGE PRINCIPAL                                            │
│  "Électricien Certifié · Spécialiste Bornes IRVE"           │
│                                                             │
│  TITRE PRINCIPAL                                            │
│  "Votre Expert Électrique"                                  │
│  "Spécialiste Bornes de Recharge"                           │
│                                                             │
│  SOUS-TITRE                                                 │
│  "Installations, dépannages, rénovations et bornes IRVE"    │
│  "Particuliers & Professionnels · Devis gratuit sous 24h"   │
│                                                             │
│  [CTA BORNES]        [CTA ÉLECTRICITÉ]     [TÉLÉPHONE]      │
│  "Simuler devis borne"  "Devis électricité"  "07 49 45 79 23"│
└─────────────────────────────────────────────────────────────┘
```

**Modifications :**
- Badge combiné : "Électricien Certifié · Spécialiste Bornes IRVE"
- Titre sur 2 lignes avec accent visuel différent
- Description mentionnant explicitement les 2 domaines
- Deux CTA distincts : un pour les bornes (simulateur), un pour l'électricité générale

### 2. Section Statistiques - Équilibrage

**Nouvelles statistiques :**
| Actuel | Proposé |
|--------|---------|
| 500+ Bornes installées | 2000+ Projets électriques |
| 15+ Années d'expérience | 500+ Bornes installées |
| 98% Clients satisfaits | 15+ Années d'expérience |
| 2h Temps d'intervention | 98% Clients satisfaits |

**Rationale :** Mettre "Projets électriques" en premier montre l'expertise générale, suivi de la spécialité bornes.

### 3. Section Services - Hiérarchie Visuelle

**Structure actuelle :**
1. Électricité Générale (4 services)
2. Bornes de Recharge (4 services)
3. Spécialité IRVE (encadré)

**Structure proposée :**
1. **Section "Notre Expertise Complète"** - Présentation des 2 piliers
2. **Services Électricité Générale** - Style classique professionnel
3. **Services Bornes de Recharge** - Style mis en valeur (spécialité)
4. **Encadré Certification IRVE** - Garde sa position actuelle

**Différenciation visuelle :**
- Électricité générale : cartes avec bordure subtile, icônes bleues
- Bornes : cartes avec glow/effet néon, icônes vertes, badge "Spécialité"

### 4. Témoignages - Diversification

**Actuels (4) :**
- Marie L. : borne résidentielle
- Pierre D. : copropriété
- Sophie M. : commerce/bornes
- Jean-Claude B. : dépannage

**Proposés (6) :**
1. **Marie L.** - Lyon 3ème - Installation borne Wallbox
2. **Pierre D.** - Copropriété Lyon 7ème - Bornes collectives
3. **Sophie M.** - Restaurant Lyon 1er - Bornes clients entreprise
4. **Jean-Claude B.** - Villeurbanne - Dépannage urgent
5. **Nouveau** - Mise aux normes complète maison ancienne
6. **Nouveau** - Rénovation électrique + éclairage LED

### 5. Appels à l'Action Distincts

**Header :**
- "Devis gratuit" → ouvre modal avec choix : "Borne électrique" / "Électricité générale"

**Hero :**
- CTA Principal : "Simuler mon devis borne" (vers simulateur)
- CTA Secondaire : "Devis électricité" (vers formulaire contact)
- CTA Tertiaire : Téléphone

**Section Services :**
- Bouton "Demander un devis" sur chaque carte de service
- Différenciation : simulateur pour bornes, formulaire pour électricité

### 6. SEO et Métadonnées

**Nouveau Title :**
```
ÉlecPro | Électricien Généraliste & Spécialiste Bornes IRVE - Lyon
```

**Nouvelle Meta Description :**
```
Électricien professionnel à Lyon : installations, dépannages, rénovations et mise aux normes. Spécialiste certifié IRVE pour bornes de recharge véhicules électriques. Devis gratuit.
```

**Mots-clés ajoutés :**
- électricien généraliste
- installation électrique complète
- rénovation électrique
- mise aux normes électrique
- dépannage électricien

### 7. Schéma JSON-LD Mis à Jour

```json
{
  "@type": "Electrician",
  "name": "ÉlecPro",
  "description": "Électricien généraliste et spécialiste bornes de recharge IRVE",
  "serviceType": [
    "Installation électrique générale",
    "Rénovation électrique", 
    "Dépannage électrique",
    "Mise aux normes NF C 15-100",
    "Bornes de recharge IRVE",
    "Éclairage et domotique"
  ]
}
```

---

## Implémentation Technique

### Fichiers à Modifier

1. **index.html**
   - Title, meta description
   - Schema.org JSON-LD

2. **sections/hero.html**
   - Badge combiné
   - Titre sur 2 lignes
   - Double CTA

3. **sections/stats.html**
   - Nouvelles statistiques
   - Icônes adaptées

4. **sections/services.html**
   - Header avec message double
   - Styles différenciés

5. **js/loader.js**
   - Nouveaux témoignages diversifiés
   - Données services éventuellement ajustées

6. **js/main.js** ou **sections/header.html**
   - Modal devis avec choix

### Styles CSS à Ajuster

1. **css/sections/hero.css**
   - Style pour titre sur 2 lignes
   - Deux CTA côte à côte

2. **css/sections/services.css**
   - Différenciation visuelle catégories
   - Badge "Spécialité" pour bornes

---

## Validation du Plan

Ce plan vise à :
- ✅ Garder la borne électrique comme service phare et différenciant
- ✅ Clarifier que l'entreprise couvre toute l'électricité générale
- ✅ Équilibrer la communication sans confusion
- ✅ Hiérarchiser visuellement les deux univers
- ✅ Diversifier les témoignages pour couvrir toutes les prestations
- ✅ Offrir des parcours utilisateurs distincts selon le besoin
