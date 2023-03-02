
## En vrac
### "Strict mode" bash

```bash
set -euo pipefail
IFS=$'\n\t'
```

See: [Unofficial bash strict mode](http://redsymbol.net/articles/unofficial-bash-strict-mode/)

### Modifier les couleurs dans un shell (RedHat)
Editer le fichier /etc/DIR_COLORS et remplacer 
`DIR 00;34       # directory`
par
`DIR 00;32       # directory`

!!! note
    Les répertoires vont apparaitre en vert au lieu de bleu

&nbsp;

### Clear screen "like" en shell
```bash
echo -en "\ec"
```

&nbsp;

### Faire un calcul en shell
```bash
echo $((0+0)) 
```

```bash
$((a + 200))      # Add 200 to $a
```

```bash
$(($RANDOM%200))  # Random number 0..199
```

!!! note
    Permet de faire un calcul , notamment dans ce cas précis, ou un résultat égale à 0 fait planter expr

&nbsp;

### Lire une entrée STDIN

```bash
echo -n "Proceed? [y/n]: "
read ans
echo $ans
```
&nbsp;

!!! note
    lecture STDIN si option, sinon, fichier
    ```bash
    test() { 
    if [ "$1" == "-" ]; then 
    	cat <&0 
    else 
	    cat "$1"
    fi 
    }
    ```

&nbsp;

### Gestion des options dans un menu

```bash
while [[ "$1" =~ ^- && ! "$1" == "--" ]]; do case $1 in
  -V | --version )
    echo $version
    exit
    ;;
  -s | --string )
    shift; string=$1
    ;;
  -f | --flag )
    flag=1
    ;;
esac; shift; done
if [[ "$1" == '--' ]]; then shift; fi
```

&nbsp;

### Redirections

```bash
python hello.py > output.txt   # stdout to (file)
python hello.py >> output.txt  # stdout to (file), append
python hello.py 2> error.log   # stderr to (file)
python hello.py 2>&1           # stderr to stdout
python hello.py > output.txt 2>&1  # stderr to stdout (file and no screen output)
python hello.py 2>/dev/null    # stderr to (null)
python hello.py &>/dev/null    # stdout and stderr to (null)
```

## Variables spécifique
### Environnement

| Expression | Description                                                                  |
| ---------- | ------------------------------------------------------------------           |
|	`$HOME` 	 |	chemin du répertoire personnel de l'utilisateur                               |
|	`$OLDPWD`	 |  chemin du répertoire précédent                                                |
|	`$PATH`	 |  liste des chemins de recherche des commandes exécutables                        |
|	`$PPID`	 |  PID du processus père du shell                                                  |
|	`$PS1`	 |	invite principale du shell	                                                    |
|	`$PS2`	 |  invite secondaire du shell                                                      |
|	`$PS3`	 |  invite de la structure shell "select"                                           |
|	`$PS4`	 |  invite de l'option shell de débogage "xtrace"                                   |
|	`$PWD`	 |	chemin du répertoire courant	                                                  |
|	`$RANDOM`	 |  nombre entier aléatoire compris entre 0 et 32767                              |
|	`$REPLY`	 |  variable par défaut de la commande "read" et de la structure shell "select"   |
|	`$SECONDS` |  nombre de secondes écoulées depuis le lancement du shell                      |

### Status

| Expression | Description                  |
| ---------- | ---------------------------- |
| `$?`       | Exit status de la dernière tache     |
| `$!`       | PID de la dernière tache en BG  |
| `$$`       | PID du shell                 |
| `$0`       | Nom du script shell |

&nbsp;

### Arguments

| Expression | Description                            |
| ---        | ---                                    |
| `$#`       | Nombre d'arguments                    |
| `$*`       | Tous les arguments                          |
| `$@`       | Tous les arguments, en commencant par le premier     |
| `$1`       | Premier argument                         |
| `$_`       | Argument de la dernière commande  |

&nbsp;

### Variable avec valeur par défaut

| Expression        | Description                                              |
| ----------------- | -------------------------------------------------------- |
| `${FOO:-val}`     | `$FOO`, or `val` if unset (or null)                      |
| `${FOO:=val}`     | Set `$FOO` to `val` if unset (or null)                   |
| `${FOO:+val}`     | `val` if `$FOO` is set (and not null)                    |
| `${FOO:?message}` | Show error message and exit if `$FOO` is unset (or null) |

Omitting the `:` removes the (non)nullity checks, e.g. `${FOO-val}` expands to `val` if unset otherwise `$FOO`.

&nbsp;

### Substrings

| Expression      | Description                    |
| --------------- | ------------------------------ |
| `${FOO:0:3}`    | Substring _(position, length)_ |
| `${FOO:(-3):3}` | Substring from the right       |

&nbsp;

### Longueur

| Expression | Description      |
| ---------- | ---------------- |
| `${#FOO}`  | Taille de la variable `$FOO` |

&nbsp;

### Braket expension
```bash
echo {A,B}.js
```

| Expression | Description         |
| ---------- | ------------------- |
| `{A,B}`    | Same as `A B`       |
| `{A,B}.js` | Same as `A.js B.js` |
| `{1..5}`   | Same as `1 2 3 4 5` |

&nbsp;

### Manipulation

**variable**

```bash
STR="HELLO WORLD!"
echo ${STR,}   #=> "hELLO WORLD!" (lowercase 1st letter)
echo ${STR,,}  #=> "hello world!" (all lowercase)

STR="hello world!"
echo ${STR^}   #=> "Hello world!" (uppercase 1st letter)
echo ${STR^^}  #=> "HELLO WORLD!" (all uppercase)
```

```bash
name="John"
echo ${name}
echo ${name/J/j}    #=> "john" (substitution)
echo ${name:0:2}    #=> "Jo" (slicing)
echo ${name::2}     #=> "Jo" (slicing)
echo ${name::-1}    #=> "Joh" (slicing)
echo ${name:(-1)}   #=> "n" (slicing from right)
echo ${name:(-2):1} #=> "h" (slicing from right)
echo ${food:-Cake}  #=> $food or "Cake"
```

**répertoire**
```bash
STR="/path/to/foo.cpp"
echo ${STR%.cpp}    # /path/to/foo
echo ${STR%.cpp}.o  # /path/to/foo.o
echo ${STR%/*}      # /path/to

echo ${STR##*.}     # cpp (extension)
echo ${STR##*/}     # foo.cpp (basepath)

echo ${STR#*/}      # path/to/foo.cpp
echo ${STR##*/}     # foo.cpp

echo ${STR/foo/bar} # /path/to/bar.cpp
```
```bash
STR="Hello world"
echo ${STR:6:5}   # "world"
echo ${STR: -5:5}  # "world"
```

```bash
SRC="/path/to/foo.cpp"
BASE=${SRC##*/}   #=> "foo.cpp" (basepath)
DIR=${SRC%$BASE}  #=> "/path/to/" (dirpath)
```

&nbsp;

### Substitution

| Code              | Description         |
| ----------------- | ------------------- |
| `${FOO%suffix}`   | Supprimer suffix       |
| `${FOO#prefix}`   | Supprimer prefix       |
| ---               | ---                 |
| `${FOO%%suffix}`  | Supprimer long suffix  |
| `${FOO##prefix}`  | Supprimer long prefix  |
| ---               | ---                 |
| `${FOO/from/to}`  | Remplacer premier match |
| `${FOO//from/to}` | Remplacer tout         |
| ---               | ---                 |
| `${FOO/%from/to}` | Remplacer suffix      |
| `${FOO/#from/to}` | Remplacer prefix      |

&nbsp;



## Tableau
### Definition d'un tableau

```bash
Fruits=('Apple' 'Banana' 'Orange')
```

```bash
Fruits[0]="Apple"
Fruits[1]="Banana"
Fruits[2]="Orange"
```

### Gestion d'un tableau

```bash
echo ${Fruits[0]}           # Element #0
echo ${Fruits[-1]}          # Last element
echo ${Fruits[@]}           # All elements, space-separated
echo ${#Fruits[@]}          # Number of elements
echo ${#Fruits}             # String length of the 1st element
echo ${#Fruits[3]}          # String length of the Nth element
echo ${Fruits[@]:3:2}       # Range (from position 3, length 2)
echo ${!Fruits[@]}          # Keys of all elements, space-separated
```

### Operations sur un tableau

```bash
Fruits=("${Fruits[@]}" "Watermelon")    # Push
Fruits+=('Watermelon')                  # Also Push
Fruits=( ${Fruits[@]/Ap*/} )            # Remove by regex match
unset Fruits[2]                         # Remove one item
Fruits=("${Fruits[@]}")                 # Duplicate
Fruits=("${Fruits[@]}" "${Veggies[@]}") # Concatenate
lines=(`cat "logfile"`)                 # Read from file
```

### Utilisation d'un tableau en shell
```bash
#!/bin/bash

declare -A dict
dict=( [‘a’]=1
       [‘b’]=2
       [‘c’]=3 )

for item in “${!dict[@]}”
do
    echo “$item => ${dict[$item]}”
done
```


## Dictionnaire
### Définition

On déclare `sound` en tant que dictionnaire (couple clé:valeur)

```bash
declare -A sounds
```

```bash
sounds[dog]="bark"
sounds[cow]="moo"
sounds[bird]="tweet"
sounds[wolf]="howl"
```

```bash
echo ${sounds[dog]} # Dog's sound
echo ${sounds[@]}   # All values
echo ${!sounds[@]}  # All keys
echo ${#sounds[@]}  # Number of elements
unset sounds[dog]   # Delete dog
```

### Iteration sur les valeurs

```bash
for val in "${sounds[@]}"; do
  echo $val
done
```
&nbsp;

### Iteration sur les clés 

```bash
for key in "${!sounds[@]}"; do
  echo $key
done
```

&nbsp;

## Boucles (loop)
----
### Boucle simple

```bash
for i in /etc/rc.*; do
  echo $i
done
```

### Boucle incrémentale

```bash
for ((i = 0 ; i < 100 ; i++)); do
  echo $i
done
```

### Boucle "range"

```bash
for i in {1..5}; do
    echo "Welcome $i"
done
```

#### Boucle "etape"

```bash
for i in {5..50..5}; do
    echo "Welcome $i"
done
```

### Boucle avec lecture (read)

```bash
cat file.txt | while read line; do
  echo $line
done
```

### Boucle while

```bash
while true; do
  ···
done
```
&nbsp;

## Grep
### Afficher un ou des process sans le process grep himself
```bash
ps - elf | grep squid | grep -v grep
ou
ps -elf | grep [s]quid
```
&nbsp;

### Affichier un fichier sans les commentaires
```bash
grep -E -v '^(#|$)' <fichier>
ou
egrep -v '^(#|$)' <fichier>
```
&nbsp;

### Grep avec multiple patterns
```bash
egrep -i "apache|lsyncd" <file>
ou
grep -i -e apache -e lsyncd <file>
```
&nbsp;

### Grep d'un pattern
```bash
if grep -q 'foo' ~/.bash_history; then
  echo "You appear to have typed 'foo' in the past"
fi
```

## Gestion des pipe
### Variable PIPESTATUS
```bash
ls toto 2>&1 | tee -a toto.log;
echo ${PIPESTATUS[0]} #RC Avant pipe
echo $? #RC après pipe
```
&nbsp;


## AWK
### Supprimer les caractères ^M
```
awk 'sub(/^M/, "");1' <ficsource> <ficmaj>
```
&nbsp;

### Afficher champ selon séparateur
```
awk -F"\t"  '{ print $56 }'
```

!!! note
    Afficher le premier champ de chaque ligne avec tabulation en séparateur de champ

&nbsp;
### Remplacer EXPR par AWK
```
awk 'BEGIN{print 1024 / 1000}'
```
&nbsp;

### Selectioner la première ou la dernière ligne + imprimer un champ
```
awk 'BEGIN{print $2}'
awk 'END{print $2}'
```
&nbsp;



## Sed
### Supprimer les caractères ASCII ^M
```bash
sed 's/^M//g' <ficsource> <ficmaj>
ou
sed -i 's/^M//g' <ficsource>
```
&nbsp;

### Critère de recherche
```bash
sed -e " //{N;s/Hxxxxx/Pxxxxx/g;} "\
```
&nbsp;

### Supprimer les caractères "Newline" (LF)
```bash
sed -i '{:q;N;s/\n//g;t q}' days.txt
```
&nbsp;

### Supprimer les 10 premiers caractères de chaque ligne
```bash
sed -i 's/^.\{10\}//g' fichier.txt
```
&nbsp;

### Affichier une ligne en particulier
```bash
<code>sed -n 1p check_toto.txt
```
!!! note
    Ici la première ligne

&nbsp;

### Savoir si une variable est numérique
```bash
if [ -n "$(echo $var | sed 's/[0-9]//g')" ]; then
    echo 'is not numeric'
else
    echo 'is numeric'
fi
```
&nbsp;

## Basename
### Lister les fichiers sans extensions
```bash
for i in "$@"; 
do
BN=$(basename "${i%.*}")
 ...
done
```
&nbsp;

### Directory of script

```bash
DIR="$(readlink -f "$(dirname "$0")/../data/transfers")"
```
> *readlink* permet le suivi des liens
{.is-info}


&nbsp;

### Afficher le nom du script exécuté
`Le script $(basename ${0}) est correctement exécuté`
&nbsp;

## Find
### Renommer l'extension de plusieurs fichiers
```
find . -name '*.mp4' | rename mp4 txt *
```
&nbsp;

### Recherche récursive avec "mot-clé"
```
find / -xdev -type f -exec grep -i toto {} /dev/null \;
```
&nbsp;

!!! note
    recherche récursive de tous les fichiers qui contiennent le mot « toto » (ou TOTO… ou ToTo…)

!!! warning
    Attention : « \; » obligatoire à la fin de la commande

!!! info
    N.B : L’option xdev permet de ne pas franchir les limites du systeme de fichiers

&nbsp;

### Purge de fichiers
```
find . -type f -mtime +7 -name « *.trc » -exec rm -f {} \;
find . -type f -mtime +2 -size xx -exec rm {}; avec xx = 10M ou 10K par ex 
find . -type f -mtime +2 -name /*/backup/*/ -exec rm {};  (enlever les / )
find . -type f -mtime +1 -exec rm
```
### Recherche "mot-clé" avec redirection log
```
find . -type f -print | xargs grep -i « my_string_to_search »> /tmp/search.log 2>/dev/null;
```
### Recherche des fichiers sans arborescence répertoire
```
find . -name '*.txt' -exec basename {} \;
```

## Test

### Condition d'execution

```bash
git commit && git push
git commit || echo "Commit failed"
```

```bash
if [[ -z "$string" ]]; then
  echo "String is empty"
elif [[ -n "$string" ]]; then
  echo "String is not empty"
fi
```



| Condition                | Description           |
| ---                      | ---                   |
| `[[ -z STRING ]]`        | Empty string          |
| `[[ -n STRING ]]`        | Not empty string      |
| `[[ STRING == STRING ]]` | Equal                 |
| `[[ STRING != STRING ]]` | Not Equal             |
| ---                      | ---                   |
| `[[ NUM -eq NUM ]]`      | Equal                 |
| `[[ NUM -ne NUM ]]`      | Not equal             |
| `[[ NUM -lt NUM ]]`      | Less than             |
| `[[ NUM -le NUM ]]`      | Less than or equal    |
| `[[ NUM -gt NUM ]]`      | Greater than          |
| `[[ NUM -ge NUM ]]`      | Greater than or equal |
| ---                      | ---                   |
| `[[ STRING =~ STRING ]]` | Regexp                |
| ---                      | ---                   |
| `(( NUM < NUM ))`        | Numeric conditions    |

#### More conditions

| Condition            | Description              |
| -------------------- | ------------------------ |
| `[[ -o noclobber ]]` | If OPTIONNAME is enabled |
| ---                  | ---                      |
| `[[ ! EXPR ]]`       | Not                      |
| `[[ X && Y ]]`       | And                      |
| `[[ X || Y ]]`       | Or                       |

### File conditions

| Condition               | Description             |
| ---                     | ---                     |
| `[[ -e FILE ]]`         | Exists                  |
| `[[ -r FILE ]]`         | Readable                |
| `[[ -h FILE ]]`         | Symlink                 |
| `[[ -d FILE ]]`         | Directory               |
| `[[ -w FILE ]]`         | Writable                |
| `[[ -s FILE ]]`         | Size is > 0 bytes       |
| `[[ -f FILE ]]`         | File                    |
| `[[ -x FILE ]]`         | Executable              |
| ---                     | ---                     |
| `[[ FILE1 -nt FILE2 ]]` | 1 is more recent than 2 |
| `[[ FILE1 -ot FILE2 ]]` | 2 is more recent than 1 |
| `[[ FILE1 -ef FILE2 ]]` | Same files              |

### Example

```bash
# String
if [[ -z "$string" ]]; then
  echo "String is empty"
elif [[ -n "$string" ]]; then
  echo "String is not empty"
else
  echo "This never happens"
fi
```

```bash
# Combinations
if [[ X && Y ]]; then
  ...
fi
```

```bash
# Equal
if [[ "$A" == "$B" ]]
```

```bash
# Regex
if [[ "A" =~ . ]]
```

```bash
if (( $a < $b )); then
   echo "$a is smaller than $b"
fi
```

```bash
if [[ -e "file.txt" ]]; then
  echo "file exists"
fi
```


&nbsp;

## Fonctions
### Gestion des erreurs

```bash
log_and_die() {
  >&2 echo "[FATAL] $*"
  exit 1
}
```
