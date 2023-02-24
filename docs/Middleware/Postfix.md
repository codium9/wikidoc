---
title: Postfix
description: 
published: true
date: 2022-02-17T14:00:54.812Z
tags: 
editor: markdown
dateCreated: 2021-05-06T15:14:55.428Z
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



