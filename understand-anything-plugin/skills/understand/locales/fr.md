# Directives de sortie en français (French)

Ce fichier fournit des directives spécifiques à la langue pour générer le contenu du graphe de connaissances en français.

## Conventions de balises (tags)

Utilisez des balises en français ou les termes techniques anglais courants :

| Motif | Balises recommandées |
|-------|----------------------|
| Point d'entrée | `point-entree`, `barrel`, `exports` ou `entry-point` |
| Fonctions utilitaires | `utilitaire`, `helpers`, `utility` |
| Gestionnaires d'API | `api-handler`, `controleur`, `endpoint` |
| Modèles de données | `modele-donnees`, `entity`, `schema` ou `data-model` |
| Fichiers de test | `test`, `unit-test`, `spec` |
| Configuration | `configuration`, `build-system`, `parametres` |
| Infrastructure | `infrastructure`, `deploiement`, `containerisation` |
| Documentation | `documentation`, `guide`, `reference` |

**Stratégie mixte :** conservez en anglais les termes techniques courants (`middleware`, `api-handler`, etc.) ; les balises descriptives peuvent être en français. Gardez les balises en minuscules et avec des traits d'union (pas d'accents dans les balises pour rester compatibles avec les filtres).

## Style des résumés

Rédigez des résumés de 1 à 2 phrases en français qui :
- Décrivent le **but** et le **rôle** dans le projet
- Emploient la voix active (« Fournit… », « Gère… », « Orchestre… »)
- Évitent de répéter le nom du fichier

**Exemples :**
- Bon : « Fournit les utilitaires de formatage de dates et d'assainissement de chaînes utilisés dans toute la couche API. »
- Mauvais : « Le fichier utils contient des fonctions utilitaires. »

## Termes techniques

Conservez ces termes en anglais (pas de traduction quand il n'existe pas d'équivalent standard) :
- `middleware`, `hook`, `barrel`, `entry-point`
- `ORM`, `REST API`, `CI/CD`, `CRUD`
- `singleton`, `factory`, `observer`
- `interceptor`, `guard`

## Noms de couches

Utilisez des noms de couches en français :
- `Couche API`, `Couche Service`, `Couche Données`, `Couche UI`
- `Infrastructure`, `Configuration`, `Documentation`
- `Couche Utilitaire`, `Couche Middleware`, `Couche Test`

ou conservez l'anglais (selon les conventions de l'équipe) :
- `API Layer`, `Service Layer`, `Data Layer`
