---
title: Containers
---


### Container command
#### Lister les containers
```bash
docker ps [-a]
```
&nbsp;

#### Récupérer le container ID avec le nom de l'image docker
```bash
docker-compose ps -q alerta-web
```
&nbsp;



#### Se connecter à un container 
```bash
docker exec -i -t <INSTANCE_ID> bash
```
ou
```bash
docker exec -it $(docker-compose ps -q alerta-web) bash
```
&nbsp;

#### Cibler l'emplacement d'un fichier de log d'un container
```bash
docker inspect --format='{{.LogPath}}' $INSTANCE_ID
```
&nbsp;

#### Afficher les logs d'un container
```bash
docker logs <INSTANCE_ID>
```
&nbsp;

#### Supprimer le storage adossé à un container
```bash
rm -Rf /var/lib/docker/volumes/...
```
&nbsp;

