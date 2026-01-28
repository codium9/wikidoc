---
title: Firewall
---

### Etat Firewall
```bash
firewall-cmd --state
```

### Liste des services actifs
```
firewall-cmd --list-services
```

### Ajouter un service (zone public)
```
firewall-cmd --zone=public --permanent --add-service=http
```
puis
```
systemctl restart firewalld.service
```

