
## Récupération du mot de passe de la console Admin

Lire le contenu du fichier suivant et récupérer le mot de passe crypté : 

```bash
cat /appli/projects/<appli>/weblogic/wl-domains/DOMAINE-WLS-<appli>/boot.properties

#Wed Mar 13 10:14:49 MET 2013
password={3DES}kJ+OsoE3XM3AIqeZ9xpi9w\=\=
username={3DES}undiEtVW0cdtSOY+0sNAWQ\=\=
```
Se positionner dans le répertoire suivant :
```bash
cd /appli/projects/<appli>/weblogic/wl-domains/DOMAINE-WLS-<appli>/security
```

3 - Créer un fichier python avec l'extension ".py" contenant ceci (et le rendre exécutable) : 

```py
from weblogic.security.internal import *
from weblogic.security.internal.encryption import *

# Remind user about how to use
raw_input("Please ensure SerializedSystemIni.dat is in the current directory now, and press ENTER to continue.")

# Get encryption service
encryptionService = SerializedSystemIni.getEncryptionService(".")
clearOrEncryptService = ClearOrEncryptedService(encryptionService)

# Get user to enter password
pwd = raw_input("Enter encrypted password (Eg. {3DES}Y1fA34S...): ")

# Remove unnecessary escape characters
preppwd = pwd.replace("\\", "")

# Decrypt the password
print "Recovered password is: " + clearOrEncryptService.decrypt(preppwd)
```

>Vous devez apercevoir le fichier suivant dans le répertoire : ''**SerializedSystemIni.dat**''
{.is-info}

Exécuter la commande suivante : 

```bash
${WL_HOME}/common/bin/wlst.sh fichier.py
```

Entrer le mot de passe crypté récupéré initialement lorsqu'il vous est demandé.

> FIN
{.is-success}



## Vérifier l'existence des process weblogic

```bash
ps -C java --no-headers --sort=pid -o pid,args | sed -ne 's/^[[:blank:]]*\([[:digit:]]\+\).*-Dweblogic.Name=\([^[:blank:]]\+\).*$/\1\t\2/p'
```
