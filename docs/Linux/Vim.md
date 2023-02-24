
## Modification VIM
### Gestion des erreur de pipe
```bash
set -o pipefail
```

### Exit immédiat du script sur erreur
```bash
set -e
```
> A combiner avec le "pipefail" :)
{.is-info}


### Mode "debug"
```bash
set -vx
```

### Changer l'éditeur par défaut du shell
```bash
set -o vi
```

### Pour en savoir plus sur "set"
[Option sur set](https://www.gnu.org/software/bash/manual/html_node/The-Set-Builtin.html)

&nbsp;


### 

## Colorisation VIM
### Modifier les couleurs dans un shell (RedHat)
Editer le fichier /etc/DIR_COLORS et remplacer 
`DIR 00;34       # directory`
par
`DIR 00;32       # directory`

> Les répertoires vont apparaitre en vert au lieu de bleu
{.is-info}

&nbsp;

