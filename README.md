# Site coaching escalade — prototype

Site statique (HTML/CSS/JS, sans framework), pensé mobile d'abord.

Site en une seule page (`index.html`) : Accueil (`#accueil`), Coaching (`#coaching`),
Stages (`#stages`), Contact (`#contact`). Le menu surligne la partie affichée.
`coaching.html` et `stages.html` ne font que rediriger vers la partie correspondante.

## À personnaliser
- Coordonnées (téléphone, e-mail) : dans la section contact de `index.html`.
- Les photos sont dans `assets/img/` : garder les mêmes noms pour les remplacer.

## Formulaire de contact (Web3Forms)
Les demandes du formulaire arrivent par e-mail via le service gratuit Web3Forms (250 envois/mois).
1. Aller sur https://web3forms.com, saisir l'adresse e-mail qui doit recevoir les demandes : la clé (« Access Key ») arrive par e-mail.
2. Dans `index.html`, remplacer `TA_CLE_WEB3FORMS` par cette clé.
3. Tester une fois en ligne : une demande de test doit arriver dans la boîte mail (vérifier les spams la première fois).

Les boutons « Réserver ma place », « Rejoindre le groupe » et « Proposer un projet de stage » descendent
au formulaire et pré-sélectionnent l'objet (attribut `data-objet`).

## Après une modification du CSS ou du JS
Les pages chargent `style.css?v=AAAAMMJJ` et `main.js?v=AAAAMMJJ`. Changer ce numéro (dans
index.html, cgv.html et mentions-legales.html) force les navigateurs à recharger les fichiers
au lieu d'utiliser une ancienne version en cache.

## Mise en ligne sur GitHub Pages
1. Créer un dépôt et y déposer le contenu de ce dossier (index.html à la racine).
2. Settings > Pages > Source : « Deploy from a branch », branche `main`, dossier `/ (root)`.
3. Nom de domaine : Settings > Pages > Custom domain, saisir `ton-domaine.fr`
   (GitHub crée un fichier CNAME). Chez ton registrar, ajouter les enregistrements DNS
   indiqués dans la doc GitHub Pages, puis cocher « Enforce HTTPS ».
