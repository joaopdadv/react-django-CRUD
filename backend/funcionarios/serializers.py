from rest_framework import serializers
from .models import Funcionario

class FuncionarioInputSerializer(serializers.Serializer):
    nome = serializers.CharField(max_length=100)
    sobrenome = serializers.CharField(max_length=100)
    cpf = serializers.CharField(max_length=11)
    cargo = serializers.CharField(max_length=100)
    ativo = serializers.BooleanField(default=True)

    def validate_cpf(self, value):
        if len(value) != 11:
            raise serializers.ValidationError("O CPF deve ter exatamente 11 dígitos.")
        
        if not value.isdigit():
             raise serializers.ValidationError("O CPF deve conter apenas números.")
             
        return value
    
class FuncionarioOutputSerializer(serializers.ModelSerializer):
    class Meta:
        model = Funcionario
        fields = ['id', 'nome', 'sobrenome', 'cpf', 'cargo', 'ativo']