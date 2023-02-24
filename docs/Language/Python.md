
## Créer un serveur HTTP en Python

Avec Python 2 : 

```py
python -m SimpleHTTPServer port 
```

Avec Python 3 : 
```py
python -m http.server port 
```

> Credit : Matt
> http://doc.callmematthi.eu

## Ecrire dans un fichier

```py
#!/usr/bin/python

text_file = open("/tmp/send.txt", "w")
text_file.write(strMsg)
text_file.close()
```
