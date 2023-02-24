
 ## Dernier reboot 

```bat
Net Statistics Server
```
  
  ## Lister un processus (Powershell version)

```bat
netstat -ano | Out-String -Stream | Select-String -Pattern <PATTERN>
```

  ## Lister un processus par numéro de port
  
 ```bat
 netstat -an | find /n <N° Port>
 ```

## Créer une boucle for pour renommer une liste de fichiers (Debut du fichier)

```bat
@echo off
setlocal enabledelayedexpansion

for /f "delims=="<nowiki> f in ('dir /b ^| findstr mp3') do ( set old=</nowiki>f & call :trait)

goto next

:trait
set new=%old:~3%
Ren "!old!" "!new!"

:next
```

> Le FINDSTR permet de cibler un type particulier de fichier
> Remplacer le nombre dans la variable NEW pour tronquer un nombre de caractere precis (espace inclus)  
{.is-info}

## Equivalent SED


- Trouver la ligne et la stocker en variable
```bat
for /f "delims=" %%i in ('type %PATH%\%FILE% ^|find "LA_LIGNE"') do @set LIGNE=%%i
```

- Modifier un champ dans la ligne (ACTIVE en SUSPEND)
```bat
set LIGNE=%LIGNE:ACTIVE=SUSPEND%
```

- Copier vers un fichier TMP , exclure la ligne à modifier, supprimer le fichier TMP
```bat
Copy %PATH%\%FILE% %PATH%\%TMPFIC%
Find /V "LA_LIGNE" <%PATH%\%TMPFIC%> %PATH%\%JOBFILE%
Del %PATH%\%TMPFIC%
```

- Inclure la ligne modifié dans le fichier
```bat
echo %LIGNE%>> %PATH%\%FILE%
```


## Test fichier vide

```bat
for /f %%i in ('echo %PATH%\Fichier.txt') do if %%~zi GTR 0 goto error
```


## Extension de paramètres (substitution)

   La substitution de paramètres de commandes (%n) a été améliorée. Vous

   pouvez maintenant utiliser la syntaxe suivante en option :

      %~1         - étend %1 en supprimant les guillemets (")

      %~f1        - étend %1 en nom de chemin d'accès reconnu

      %~d1        - étend %1 en lettre de lecteur uniquement

      %~p1        - étend %1 en chemin d'accès uniquement

      %~n1        - étend %1 en nom de fichier uniquement

      %~x1        - étend %1 en extension de fichier uniquement

      %~s1        - chemin étendu contenant uniquement des noms courts

      %~a1        - étend %1 en attributs du fichier

      %~t1        - étend %1 en date/heure du fichier

      %~z1        - étend %1 en taille du fichier

      %~$PATH:1   - parcourt les répertoires de la variable

                     d'environnement PATH et étend %1 en nom du

                     premier fichier reconnu trouvé. Si le nom de la

                     variable d'environnement n'est pas défini ou

                     que le fichier n'est pas trouvé par la recherche,

                     alors ce modificateur étend en chaîne vide

   Vous pouvez combiner les modificateurs pour des résultats composés :

       %~dp1       - étend %1 en lettre de lecteur et chemin d'accès

                      uniquement

       %~nx1       - étend %1 en nom de fichier et extension uniquement

       %~dp$PATH:1 - parcourt les répertoires listés dans la variable

                      d'environnement PATH à la recherche de %1 et étend

                      en lettre de lecteur du premier trouvé.

       %~ftza1     - étend %1 en DIR comme ligne en sortie

Dans les exemples ci-dessus %1 et PATH peuvent être remplacés par d'autres valeurs valides. La syntaxe %~ se termine par un numéro d'argument valide. Vous ne pouvez pas utiliser les modificateurs %~ avec %*

## Substring

Dans le cas présent, mydate = 20140630 et my_year = 2014
```bat
set my_date=%1
set my_year=%my_date:~0,4%
```


