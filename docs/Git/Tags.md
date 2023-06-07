## Tags

### Gérer les Tags d'un dépôt git
#### Supprimer tous les Tags "remote"

    git tag | xargs -L 1 | xargs git push origin --delete

#### Supprimer tous les Tags "locaux"

    git tag | xargs -L 1 | xargs git tag --delete