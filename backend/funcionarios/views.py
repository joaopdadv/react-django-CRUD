from rest_framework import viewsets
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend

from .pagination import StandardResultsSetPagination
from .models import Funcionario
from .serializers import FuncionarioOutputSerializer
from .filters import FuncionarioFilter

class FuncionarioViewSet(viewsets.ModelViewSet):
    queryset = Funcionario.objects.all()
    serializer_class = FuncionarioOutputSerializer
    pagination_class = StandardResultsSetPagination

    filter_backends = [
        DjangoFilterBackend,
        SearchFilter,
        OrderingFilter
    ]

    filterset_class = FuncionarioFilter
    ordering_fields = ['id', 'nome', 'sobrenome', 'cargo', 'ativo']