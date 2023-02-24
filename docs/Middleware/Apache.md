---
title: Apache
description: 
published: true
date: 2022-02-17T14:00:14.617Z
tags: 
editor: markdown
dateCreated: 2021-05-06T15:14:30.887Z
---

### Installer apache (one-liner)
```
$APACHE_HOME/bin/scripts; ./build-instance -i <site> -p 80 -s 443 --adresse $(hostname -i) --fqdn <fqdn> --console --boot
```
</br>

### Afficher les modules dans apache

```
$APACHE_HOME/bin/apachectl -t -D DUMP_MODULES
```
ou

```
$APACHE_HOME/bin/apachectl -M
```


