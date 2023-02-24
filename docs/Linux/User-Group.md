
### Gestion User/Group
#### Créer un utilisateur
```bash
useradd -g <gid> <user>
```
&nbsp;

#### Créer un groupe
```bash
groupadd -g <gid> <user>
```
&nbsp;



#### Modifier l'UID d'un user
```bash
usermod -u <uid> <user>
```
&nbsp;

#### Ajout d'un groupe primaire à un utilisateur
```bash
usermod -g <group> <user>
```
&nbsp;

#### Ajout de multiple utilisateur à un groupe existant
```bash
usermod -a -G <group1>,<group2>,<group3> <user>
```
&nbsp;

**option pour usermod**

>-d répertoire utilisateur
-g définit le GID principal
-l identifiant utilisateur
-u UID utilisateur
-s shell par défaut
-G ajoute l’utilisateur à des groupes secondaires
-m déplace le contenu du répertoire personnel vers le nouvel emplacement
{.is-info}

