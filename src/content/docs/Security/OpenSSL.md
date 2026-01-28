---
title: OpenSSL
---


Lien utile:
[https://geekflare.com/fr/openssl-commands-certificates/](https://geekflare.com/fr/openssl-commands-certificates/)
&nbsp;

#### Liste des fichiers pris pour exemple
```bash
-rw-r--r-- 1 500000339 1049089 1706 mars  12 15:43 myprivatekey.rsa
-rw-r--r-- 1 500000339 1049089  230 mars  12 15:44 csr.ini
-rw-r--r-- 1 500000339 1049089  460 mars  12 15:47 myprivatekey.rsa.pub
-rw-r--r-- 1 500000339 1049089 1274 mars  12 16:50 cert_out.pem
-rw-r--r-- 1 500000339 1049089    0 mars  12 17:29 csr.pem
```
&nbsp;

#### Contenu de la configuration CSR
```bash
[req]
default_bits = 2048
distinguished_name = dn
prompt             = no
encrypt_key        = no
req_extensions = req_ext

[dn]
C="FR"
L="Nantes"
O="MyEnterprise"
OU="IT"
CN="*.domain.com"
emailAddress="me@domain.com""

[ req_ext ]
subjectAltName = DNS: www.exemple.com, DNS: mail.exemple.com, IP: 192.168.1.1
```
&nbsp;

### Générer une clé privé
```bash
openssl.exe genrsa -out myprivatekey.rsa
```
&nbsp;

### Générer une clé publique depuis une clé privé
```bash
openssl.exe rsa -in myprivatekey.rsa -pubout -out myprivatekey.rsa.pub
```
&nbsp;

### Demande de certificat - Générer son CSR
```bash
openssl req –key myprivatekey.rsa –new -config csr.ini –out csr.pem
```
&nbsp;

### Générer un certificat d'autorité (AC) auto-signé
```bash
openssl x509 -req -signkey myprivatekey.rsa -in csr.pem -days 1000 -out cert_out.pem
```
&nbsp;

### Simuler un échange client/serveur pour debug SSL
```bash

Server :
openssl.exe s_server -accept 127.0.0.1:4433 -cert cert_out.pem -key myprivatekey.rsa

Client :
openssl.exe s_client -host 127.0.0.1 -port 4433
```
&nbsp;






