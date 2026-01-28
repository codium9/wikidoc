---
title: Apache
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


