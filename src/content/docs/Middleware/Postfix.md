---
title: Postfix
---


### Afficher la mailqueue
```
mailq
```
ou
```
postqueue -p
```
&nbsp;

### Purger la mailqueue
```
postsuper -d ALL <incoming|active|deferred>
```
&nbsp;

### Forcer les envoie de mails
```
postqueue -f
```
&nbsp;



