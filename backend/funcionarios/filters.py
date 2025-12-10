import django_filters
from .models import Funcionario

class FuncionarioFilter(django_filters.FilterSet):
    id = django_filters.NumberFilter(field_name='id', lookup_expr='exact')
    nome = django_filters.CharFilter(field_name='nome', lookup_expr='icontains')
    sobrenome = django_filters.CharFilter(field_name='sobrenome', lookup_expr='icontains')
    cargo = django_filters.CharFilter(field_name='cargo', lookup_expr='iexact')

    class Meta:
        model = Funcionario
        fields = ['ativo', 'cpf']