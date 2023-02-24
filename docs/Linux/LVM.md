
### Créer une partition + PV associés
```
parted /dev/sdX

(parted) print
Modèle: ATA SAMSUNG SSD PM85 (scsi)
Disque /dev/sda : 128GB
Taille des secteurs (logiques/physiques): 512B/512B
Table de partitions : msdos
Disk Flags:

Numéro  Début   Fin     Taille  Type     Système de fichiers  Fanions
 1      1049kB  1075MB  1074MB  primary  xfs                  démarrage
 2      1075MB  41,2GB  40,1GB  primary                       lvm (gestionnaire de volumes logiques)
 3      41,2GB  51,2GB  9987MB  primary                       lvm (gestionnaire de volumes logiques)

(parted) mkpart
Type de partition ?  primary/primaire/extended/étendue? primary
Type de système de fichiers ?  [ext2]? ext3
Début ? 51,2GB
Fin ? 128GB

Numéro  Début   Fin     Taille  Type     Système de fichiers  Fanions
 1      1049kB  1075MB  1074MB  primary  xfs                  démarrage
 2      1075MB  41,2GB  40,1GB  primary                       lvm (gestionnaire de volumes logiques)
 3      41,2GB  51,2GB  9987MB  primary                       lvm (gestionnaire de volumes logiques)
 4      51,2GB  128GB   76,8GB  primary


(parted) set 4 lvm on
(parted) print

Numéro  Début   Fin     Taille  Type     Système de fichiers  Fanions
 1      1049kB  1075MB  1074MB  primary  xfs                  démarrage
 2      1075MB  41,2GB  40,1GB  primary                       lvm (gestionnaire de volumes logiques)
 3      41,2GB  51,2GB  9987MB  primary                       lvm (gestionnaire de volumes logiques)
 4      51,2GB  128GB   76,8GB  primary                       lvm (gestionnaire de volumes logiques)
```

&nbsp;
### Créer un volume logique
```bash
lvcreate -L 1G -n <Label Volume> <VG>
lvdisplay <Volume_du_FS>
mkfs.ext4 <Volume_du_FS>
mkdir <FS>
<Modifier /ets/fstab>
== /dev/root_vg/lv_usr_tivoli_tsm /usr/tivoli/tsm ext4 defaults 1 3 ==
mount -a <FS>
df -h <FS> ==> pour vérifier
```

!!! note
    Si la commande `umount` ne marche pas, faire un `lsof`du FS pour voir si un process tente d'y accéder, sinon utiliser commande `umount -l`


&nbsp;
### Manipuler un volume logique
```bash
df -h <FS>
lvextend -L 12G <Volume_du_FS>
umount <FS>
e2fsck -f <Volume_du_FS>
resize2fs <Volume_du_FS>
mount <FS>
df -h <FS> ==> Pour vérifier
```
variante XFS
!!! note
    Remplacer 
        `resize2fs` <Volume_du_FS>
    Par
        `xfs_growfs` <Volume_du_FS>







