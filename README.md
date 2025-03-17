# Odoo 18 Personnalisé - Gestion de Marché par YoNetwork

Ce projet propose une version personnalisée d'Odoo 18.0 avec :

- **Thème vert personnalisé**
- **Remplacement des icônes par le logo YoNetwork**
- **Module de gestion de marché (« market_management »)**
- **Modification du module web existant**
- **Déploiement Dockerisé avec PostgreSQL**
- **Vues UI personnalisées et règles de sécurité**

## Contenu du Dépôt

- `README.md` (ce fichier)
- `Dockerfile`
- `compose-docker.yml`
- `.gitignore`
- `odoo-18/addons/` (clonage de la branche `odoo18` d'Odoo)
- `market_management/` (module personnalisé de gestion de marché)
- `web/` (module web modifié)
- `config/odoo.conf` (Configuration Odoo)

## Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **Git**
- **Docker & Docker Compose**
- **Python 3** (si besoin d'un environnement virtuel)

## Installation et Déploiement

### 1. Cloner la branche `odoo18`

```bash
git clone --branch odoo18 https://github.com/odoo/odoo odoo-18
```

### 2. (Optionnel) Configurer un environnement virtuel

```bash
python3 -m venv vvenv
source vvenv/bin/activate  # Windows : vvenv\Scripts\activate
pip install -r requirements.txt  # Si fichier requis
```

### 3. Construire l'image Docker

```bash
docker build -t my-odoo:18.0 .
```

### 4. Démarrer Odoo avec Docker Compose

```bash
docker-compose up --build
```

### 5. Initialiser la base de données

```bash
docker-compose exec odoo odoo -i base --database=odoo --db_host=db --db_port=5432 --db_user=odoo --db_password=odoo --without-demo=all --stop-after-init
```

### 6. Accéder à l'application

Ouvrez [http://localhost:8069](http://localhost:8069) dans votre navigateur.

---

## Détails du Module `market_management`

### 1. Fonctionnalités

- **Gestion des entreprises** avec validation de téléphone et date
- **Suivi des activités du marché** avec contraintes de budget et date
- **Vues UI personnalisées** pour une meilleure ergonomie
- **Règles de sécurité** pour une gestion des accès sécurisée

### 2. Structure des Fichiers

| Fichier/Dossier         | Objectif                                                              |
|-------------------------|-----------------------------------------------------------------------|
| `__init__.py`          | Initialise le package/module Python                                  |
| `__manifest__.py`      | Métadonnées du module (nom, dépendances, fichiers de données)        |
| `entreprise_marche.py` | Définit le modèle `market.company` avec validation de téléphone/date |
| `activite_marche.py`   | Définit le modèle `market.activity` avec contraintes budget/date     |
| `ir.model.access.csv`  | Règles de sécurité pour l'accès aux modèles                         |
| `entreprise_views.xml`  | Vues Liste/Formulaire pour les entreprises                          |
| `activite_views.xml`    | Vues Liste/Formulaire pour les activités                            |
| `actions.xml`           | Actions de navigation dans les menus                                |
| `menus.xml`             | Structure des menus principaux                                     |

### 3. Sécurité et Règles d'Accès

- Permissions CRUD pour les utilisateurs autorisés
- Vérification stricte des données saisies
- Séparation des droits par rôle

---

## Commandes Utiles

### 1. Gestion du Cycle de Vie

```bash
# Démarrer les conteneurs en arrière-plan
docker-compose up -d

# Arrêter et supprimer les conteneurs et volumes
docker-compose down -v

# Afficher les logs en temps réel
docker-compose logs -f web
```

### 2. Sauvegarde et Restauration de la Base de Données

```bash
# Sauvegarder la base de données
docker exec -t odoo-web-1 pg_dump -U odoo > backup.sql

# Restaurer une sauvegarde
cat backup.sql | docker exec -i odoo-db-1 psql -U odoo
```

---

## Support et Contributions

- Ouvrez une issue ou une pull request pour améliorer ce projet.
- Contactez l'équipe YoNetwork pour toute assistance.

---

*Bonne utilisation !*
