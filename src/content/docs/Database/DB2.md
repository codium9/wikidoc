
## DB2 en vrac
### Logs DB2
```sql
/home/sqllib/db2dump/db2diag.log
```
&nbsp;


### Derniere sauvegarde FULL
```sql
db2adutl query database <DB> full 
```

Depuis un serveur distant
> db2adutl query full db <DB> nodename <SRV> owner <USER_DB>`


&nbsp;

### Recupérer l'historique pour l'ensemble d'une DB
```sql
db2 list history backup all for db <DB>
```
&nbsp;

### Récupérer l'historique depuis un point dans le temps
```sql
db2 list history BACKUP since 20120101 for db mydb 
```
&nbsp;

### Appliquer un grant user sur une DB qui ne lui appartient pas
```sql
db2adutl grant user <USER> on nodename <SRV_CIBLE> for db <DB_CIBLE>
```

&nbsp;

### Rollfoward pending
!!! note
    il se peut que lors d'un refresh de base DB2, des logs DB2 existe sur l'environnemnt cible et que celles-ci soient confondus avec les logs de la base source.
    Dans ce cas présent, le plus simple étant de supprimer totalement les logs db2 encore présent sur l'environnement cible

**Exemple de suppression des fichiers de logs**

```sql
db2adutl query logs chain 2 database <DB>
db2adutl delete logs chain 2 database <DB> without prompting
```

&nbsp;
**Exemple de suppression d'une liste de fichiers de logs**
```sql
db2adutl delete logs between S0000282 and S0000292 database <DB>
```




