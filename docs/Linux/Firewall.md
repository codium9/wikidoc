---
title: Firewall
description: 
published: true
date: 2021-01-22T10:09:22.359Z
tags: 
editor: undefined
dateCreated: 2021-01-21T16:47:16.528Z
---

### Etat Firewall
```bash
firewall-cmd --state
```
&nbsp;

### Liste des services actifs
```
firewall-cmd --list-services
```

&nbsp;

### Ajouter un service (zone public)
```
firewall-cmd --zone=public --permanent --add-service=http
```
puis
```
systemctl restart firewalld.service
```

