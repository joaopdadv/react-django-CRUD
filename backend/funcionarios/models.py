from django.db import models

class Funcionario(models.Model):
    nome = models.CharField(max_length=100)
    sobrenome = models.CharField(max_length=100)    
    cpf = models.CharField(max_length=11, unique=True) 
    cargo = models.CharField(max_length=100)
    ativo = models.BooleanField(default=True)