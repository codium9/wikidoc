---
title: Terraform
description: 
published: true
date: 2022-03-24T15:10:41.043Z
tags: terraform iac
editor: markdown
dateCreated: 2022-03-24T15:10:41.043Z
---

## Utiliser une liste d'items dans un fichier texte


Avec une liste d'item de type :

```shell
item1
item2
item3
[...]
```

Exemple lors la création d'objects à l'intérieur d'un bucket S3 de manière itérative (boucle "for_each")

```tf
resource "aws_s3_bucket_object" "chroot_folder_keep_file_input" {
  for_each = toset(compact((split("\n", file("../../environments/${var.aws_env}/${var.env}/${var.domaine}/data/exstream_domains.conf") ))))
  bucket   = "mmb-${var.domaine}-edit-exstream-${var.env}"
  key      = "/${each.key}/in/.keep"
}
```

l'usage de la fonction `split` terraform permet le découpage selon un pattern, ici le retour chariot
la fonction `compact` permet de gérer les lignes vide et de les supprimer de la liste si besoin
