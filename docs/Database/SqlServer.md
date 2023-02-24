
## Authoriser les connexions distante pour root

```sql
GRANT ALL PRIVILEGES ON *.* TO root@'%' IDENTIFIED BY '<password>';
```


## Import / Export MySQL  

	D:\PRODUCT\MySQL\bin>mysqldump -u$user -p$pass <db_name>  > fic.sql

	1 :  --opt --all-databases ==> a mettre au lieu de <db_name> pour toute les DB d'un serveur
	2 : Inverser le redirecteur pour faire un Import
