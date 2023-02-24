---
title: Websphere
description: 
published: true
date: 2022-02-17T14:18:29.806Z
tags: websphere ibm
editor: markdown
dateCreated: 2022-02-17T14:15:03.466Z
---

## Installer un SDK7 sur WAS 8.5.5

- Stopper les serveurs applicatifs
- Lister les version de SDK disponible
```bash
./imcl listAvailablePackages -repositories /mntnfs/EXPORT_PRODUIT/Websphere/WAS-8.5.5/AIX/SDK7/repository.config
```

- Installation du SDK + prise en compte du nouveau SDK
```bash
/tech/IBMIM/eclipse/tools/imcl install com.ibm.websphere.IBMJAVA.v71_7.1.3030.20160224_1952 -repositories /mntnfs/EXPORT_PRODUIT/Websphere/WAS-8.5.5/AIX/SDK7/ -installationDirectory /tech/WebSphere/8.5.0/noyau/cr3_64 -showProgress

./bin/managesdk.sh -setNewProfileDefault -sdkname 1.7.1_64
./bin/managesdk.sh -listAvailable
./bin/managesdk.sh -listEnabledProfileAll
./bin/managesdk.sh -enableProfile -profileName DmgrVCR3_01 -sdkname 1.7.1_64      //  + relance DMGR
./bin/managesdk.sh -listEnabledProfileAll
./bin/managesdk.sh -enableProfile -profileName ProfVCR3_01_01 -sdkname 1.7.1_64   //  + relance Node
```

- Désinstaller un package avec IMCL
```bash
./imcl listInstalledPackages
./imcl listInstallationDirectories

./imcl uninstall com.ibm.websphere.IHS.v85_8.5.5000.20130514_1044 -installationDirectory /was/IBM/HTTPServer
Uninstalled com.ibm.websphere.IHS.v85_8.5.5000.20130514_1044 from the /was/IBM/HTTPServer directory.
```

## Manage Profile

```bash
$app_server_root/bin/manageprofiles.sh

-listProfiles
-delete -profileName <ProfName>
-validateAndUpdateRegistry  (after a delete for example)
```

## Commande Jython

- Se connecter en jython
```bash
wsadmin.sh -lang jython -f <file>
```

- List Application Server
```bash
AdminTask.listServers('[-serverType APPLICATION_SERVER ]')
```

- Remove Server
```bash
AdminTask.deleteServer( '[ -nodeName NodeGWF01 -serverName AsJGWF_WKF02 ]' )
```

- Add Server
```bash
AdminConfig.create('Server', mynode, ['name', 'AsJGWF_WKF02'])
AdminTask.createApplicationServer ( mynode , ['-name', 'test1', '-templateName', 'default']) 

JACL version
$AdminTask createApplicationServer mynode {-name <servername> -templateName default}
```

- Save config
```bash
AdminConfig.save()
```
