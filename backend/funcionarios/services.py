from django.db import transaction
from .models import Funcionario

def criar_funcionario(*, nome, sobrenome, cpf, cargo, ativo=True):

    with transaction.atomic():
        # validando apenas para retornar erro adequado, serializer já valida unique
        if Funcionario.objects.filter(cpf=cpf).exists():
            raise ValueError(f"O CPF {cpf} já está em uso.")

        funcionario = Funcionario.objects.create(
            nome=nome,
            sobrenome=sobrenome,
            cpf=cpf,
            cargo=cargo,
            ativo=ativo
        )

    return funcionario