---
title: TSM
description: 
published: true
date: 2022-02-17T13:58:30.455Z
tags: tivoli ibm tsm
editor: markdown
dateCreated: 2022-02-17T13:58:30.455Z
---

## Recuperer un ou plusieurs fichiers selon la date

Se positionner dans le répertoire qui a contenu les fichiers à restaurer
Interroger TSM

	dsmc query backup '*' -pitd='2011-09-22'

Puis restaurer (avec l'option -Inact si fichier inactif = Depend de la duree de retention de la classe TSM )

	dsmc restore -Inact '*' -pitd='2011-09-22' '/tempspace/RESTORE/'


## Récuperer un ou plusieurs fichiers depuis un virtualnode different

	dsmc query backup '/expl/tomi/tomX/exit/tomgsurv*' –virtualnode='infoexpl8'

	dsmc restore '/DOSSIER/SOURCE/' '/DOSSIER/CIBLE' –virtualnode='infoexpl8'

## Restaurer vers un serveur TSM différent

**Windows**

	dsmc restore '<SOURCE>' '<DEST>' -optfile="C:\Program Files\Tivoli\Tsm\Baclient\dsm.opt" -virtualnode=HNANSSNORA10006

**UNIX**

	dsmc restore -se=TSMEXPL1


## Diverse commande

	dsmc incremental 'toto.zip' = pour un fichier existant

	dsmc backup 'toto.zip' = pour un nouveau fichier