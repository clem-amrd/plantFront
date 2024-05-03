## Description


Ce projet combine Laravel comme backend et Angular comme frontend pour créer une application


## Prérequis


Avant de commencer, assurez-vous que les logiciels suivants sont installés sur votre système :
- Git
- PHP (version 7.3 ou supérieure)
- Composer
- Node.js
- npm


## Installation


### Laravel (Backend)


1. **Clonage du dépôt Git** :
  Ouvrez un terminal et exécutez la commande suivante pour cloner le dépôt backend :
  ```bash
  git clone https://github.com/clem-amrd/plantBack
  cd laravel-backend


2.**Install
composer install


3.**Configuration
cp .env.example .env


4.**Clé d’application
php artisan key:generate


5.**Migration de la base de données:
php artisan migrate


### Angular (Frontend)
1/**Clonage du dépôt de Git:
git clone https://github.com/clem-amrd/plantFront
cd angular-frontend


2.**Installation
npm install


3.**Démarrage de l’application
ng serve


### BDD

Il y a 3 tables préremplis:
1. Localisations
2. Habitats
3. Plants

L'export de ces tables se trouvent dans le dossier plantBack < exports