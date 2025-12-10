from rest_framework import serializers
from .models import Funcionario
    
class FuncionarioOutputSerializer(serializers.ModelSerializer):
    class Meta:
        model = Funcionario
        fields = ['id', 'nome', 'sobrenome', 'cpf', 'cargo', 'ativo']