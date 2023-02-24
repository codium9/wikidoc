---
title: AIX
description: 
published: true
date: 2021-01-22T09:26:46.929Z
tags: 
editor: undefined
dateCreated: 2021-01-22T09:26:42.305Z
---

## Gestion User/Group
### Créer un utilisateur
`mkuser id=uid pgrp=<groupe_principal> home=/home/nom_utilisateur -m <comment> shell=/usr/bin/ksh nom_utilisateur`
&nbsp;

### Créer un groupe
`mkgroup id=gid nom_group`
&nbsp;

## Installation package (smitty)
### Installation
`installp -aF -d /blabla all `
&nbsp;

### Désinstallation
`installp -ug tivoli.tsm.client*`
&nbsp;

### Lister les package
`lslpp -L`
> Par date:
lslpp -qch | awk -F: '{printf "%-12s %-40s %-12s %-10s %-10s\n",$7,$2,$3,$5,$6}' | sort | uniq | sed 's/70/-70/' | sort -t '/' -k 3,3n -k 1,1n -k 2,2n | sed 's/-70/70/'
{.is-info}

## Gestion des FileSystem
### Agrandir ou diminuer un FS
`chfs -a size=[+|-]1G /some/FS`

### lister les VG et FS associés
`lsvg applivg`
```
VOLUME GROUP:       applivg                  VG IDENTIFIER:  00cef4a700004c0000000163d5ddb30f
VG STATE:           active                   PP SIZE:        128 megabyte(s)
VG PERMISSION:      read/write               TOTAL PPs:      399 (51072 megabytes)
MAX LVs:            512                      FREE PPs:       7 (896 megabytes)
LVs:                4                        USED PPs:       392 (50176 megabytes)
OPEN LVs:           4                        QUORUM:         2 (Enabled)
TOTAL PVs:          1                        VG DESCRIPTORS: 2
STALE PVs:          0                        STALE PPs:      0
ACTIVE PVs:         1                        AUTO ON:        yes
MAX PPs per VG:     130048
MAX PPs per PV:     1016                     MAX PVs:        128
LTG size (Dynamic): 1024 kilobyte(s)         AUTO SYNC:      no
HOT SPARE:          no                       BB POLICY:      relocatable
PV RESTRICTION:     none                     INFINITE RETRY: no
DISK BLOCK SIZE:    512                      CRITICAL VG:    no
FS SYNC OPTION:     no                       CRITICAL PVs:   no
```

`lsvg -l applivg`
```
applivg:
LV NAME             TYPE       LPs     PPs     PVs  LV STATE      MOUNT POINT
lv_cmod             jfs2       80      80      1    open/syncd    /appli/CMOD
lv_cmodcache        jfs2       160     160     1    open/syncd    /appli/CMOD-cache
lv_aen              jfs2       80      80      1    open/syncd    /appli/AEN
lv_logs             jfs2       72      72      1    open/syncd    /logs
```
&nbsp;

### Créer un FS (avec son LV)
`crfs -v jfs2 -m /mountpoint -A yes -g datavg -a size=128M -p rw -a logname=INLINE`
&nbsp;

### Supprimer un FS (et le LV associé)
`rmfs -r <FS>`
&nbsp;

### Supprimer un LV
`rmlv -f <LV>`
&nbsp;

### Renommer un LV
`chlv -n nouveau_nom ancien_nom`
&nbsp;

## Divers
### "watch like" pour AIX
`while true; do date; COMMAND ; sleep 1; clear; done`
&nbsp;

### Déterminer le type d'architecture (32 ou 64bits)
`getconf KERNEL_BITMODE`
&nbsp;

### Afficher les erreurs système UNIX
`errpt [Option] [ -c : rapport court ] [ -A : rapport simple ] [ -a : rapport détaillé ]`
&nbsp;

### Afficher les ports en écoute
`netstat -an -f inet | grep LISTEN`
&nbsp;


&nbsp;

