---
title: Firewall
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

