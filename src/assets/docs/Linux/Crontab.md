
### Lire une crontab
> Dans l'ordre des étoiles (de gauche à droite)
{.is-info}

- minutes (0 à 59)
- heures (0 à 23)
- jours du mois (1 à 31)
- mois (1à12)
- jours de la semaine (0 à 6) 0 = dimanche

Avec pour chaque unités de temps, le notations possible

- * : a chaque unité de temps
- 2-5 : les unités de temps (2,3,4,5)
- */3 : toutes les 3 unités de temps (0,3,6,…)
- 5,8 : les unités de temps 5 et 8

<u>Exemple :</u>

**$ Toutes les 5 minutes**
```
*/5 * * * * /usr/bin/php /home/user1/scripts/test.php >> /dev/null
```
**$ Tous les jours à 10h42**
```
42 10 * * * /usr/bin/php /home/user1/scripts/test.php >> /dev/null
```
**$ Tous les premiers mars à 12h15**
```
15 12 1 3 * /usr/bin/php /home/user1/scripts/test.php >> /dev/null
```
**$ Tous les lundis à 19h00**
```
0 19 * * 1 /usr/bin/php /home/user1/scripts/test.php >> /dev/null
```

