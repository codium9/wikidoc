---
title: Command
---


## Infos CPU
### Affichage type processeur 
```bash
cat /proc/cpuinfo | grep "model name"
```

### Nombre de coeur physique
```bash
grep "physical id" /proc/cpuinfo |sort -u |wc -l
```

### Nombre de coeur logique
```bash
grep -c "processor" /proc/cpuinfo
```


## Infos démarrage
### Dernier reboot
```bash
last reboot | head -1
```
ou
```bash
who -b
```

### Dernier shutdown
```bash
last -x|grep shutdown | head -1
```


## Compression/Décompression
### Décompresser avec rebase
```bash
tar xvf <file> --strip-components 5
```

### Tarball one-liner
```bash
tar xzf - -C ${HOME}/Tools k9s.exe < <(curl -Ls --cacert ${CERTS_FULL_CA_BUNDLE} ${K9S_URL})
```


## Tester une connection TCP
```bash
SERVER=google.com PORT=80 
if (: </dev/tcp/$SERVER/$PORT) 2>/dev/null
then
printf "succeeded \n"
else
printf "failed \n"
fi
```

{% aside %}
variante one-liner

```bash
bash -c 'exec 3<> /dev/tcp/'localhost'/'22';echo $?' 2>/dev/null
```
{% /aside %}

## Tunnel SSH
Exemple d'un tunnel http pour mise a jour yum

Machine 1 : Source
Machine 2 : cible (accès internet)

Machine 1
Dans /etc/yum.conf
```bash
proxy=socks5h://localhost:1080
```
puis taper la commande suivante
```bash
ssh -D 1080 root@machine 2
```

{% badge text="Attention" variant="caution" /%}
puis taper la commande désiré sur la machine 1 depuis un autre terminal (très important)


## YUM
### Option "downloadonly"
```bash
yum install --downloadonly --downloaddir=<path> <package>
```

{% aside %}
Prérequis : Installer le package yum-downloadonly
{% /aside %}


## File System (visualisation)
### Création fichier avec masque défini
```
umask 022
```

{% aside %}
(avec 022 = chmod 755)
{% /aside %}

### Affichage espace libre ou occupé
#### Affichage espace occupé en Mo
```bash
du -sm
```

#### Top 10 des plus gros fichiers
```bash
du -am . | sort -nr | head -10
```

#### Tri sur la 4eme colonne
```bash
df -h | sort -nk4
```
