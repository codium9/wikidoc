---
title: Perl
---


## Perl operator  

```perl
Standard  Générique    Signification   Interpolation
        ''       q{}         Littérale            non
        ""      qq{}         Littérale            oui
        ``      qx{}          Commande            oui (sauf si délimiteur '')
                qw{}        Liste de mots         non
        //       m{}   Reconnaissance de motif    oui (sauf si délimiteur '')
                qr{}           Motif              oui (sauf si délimiteur '')
                 s{}{}       Substitution         oui (sauf si délimiteur '')
                tr{}{}     Translittération       non (voir plus bas)
                
\t          tabulation             (HT, TAB)
\n          nouvelle ligne         (LF, NL)
\r          retour chariot         (CR)
\f          page suivante          (FF)
\a          alarme (bip)           (BEL)
\e          escape                 (ESC)
\033        caractère en octal     (ESC)
\x1B        caractère hexadécimal  (ESC)
\x{236a}    caractère hexadécimal long (SMILEY)
\c[         caractère de contrôle  (ESC)
\N{nom}     caractère nommé
    
\l          converti en minuscule le caractère suivant
\u          converti en majuscule le caractère suivant
\L          converti en minuscule jusqu'au prochain \E
\U          converti en majuscule jusqu'au prochain \E
\E          fin de modification de casse
\Q          désactive les méta-caractères de motif jusqu'au prochain \E
````

## Snippet  

### Recherche d'une occurence dans un tableau  

It depends on what you want the search to do:

if you want to find all matches, use the built-in grep:  
```perl		
	my @matches = grep { /pattern/ } @list_of_strings;
```

if you want to find the first match, use first in List::Util:  
```perl		
	use List::Util 'first';
	my $match = first { /pattern/ } @list_of_strings;
```

if you want to find the count of all matches, use true in List::MoreUtils:
```perl	
	use List::MoreUtils 'true';
	my $count = true { /pattern/ } @list_of_strings;
```

if you want to know the index of the first match, use first_index in List::MoreUtils:
```perl	
	use List::MoreUtils 'first_index';
	my $index = first_index { /pattern/ } @list_of_strings;
```

if you want to simply know if there was a match, but you don’t care which element it was or its value, use any in List::MoreUtils:
```perl	 
	use List::MoreUtils 'any';
	my $match_found = any { /pattern/ } @list_of_strings;
```

### Lister les doublons ou les uniques dans un tableau  
```perl	
	my %seen;
	my @doublons = grep {++$seen{$_}==2} @liste
	
	my %seen;
	my @unique = grep {++$seen{$_}==1} @liste
```
