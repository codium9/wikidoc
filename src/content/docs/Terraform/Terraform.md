---
title: Terraform
---

## Conditions

### Mode "boolean"

    resource "aws_lb" "network-lb" {
    count = var.lb_type == "network-lb" ? 1 : 0
    name = "bitslovers-nlb"
    [...]
    }

{% aside type="tip" %}
Si la variable "lb_type" est valorisée à "network-lb", alors le module ou la ressource est déployé  
Lien : [https://www.bitslovers.com/terraform-count/](https://www.bitslovers.com/terraform-count/)  
{% /aside %}

### Mode "string"

    bucket_name = var.test == true ? "dev" : "prod"  

{% aside type="tip" %}
Lire : Si la variable de test contient la valeur "true", alors bucket_name = dev , sinon prod  
Lien : [https://spacelift.io/blog/terraform-functions-expressions-loops](https://spacelift.io/blog/terraform-functions-expressions-loops)  
{% /aside %}

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

{% aside type="Note" %}
    l'usage de la fonction `split` terraform permet le découpage selon un pattern, ici le retour chariot  
    la fonction `compact` permet de gérer les lignes vide et de les supprimer de la liste si besoin  
{% /aside %}