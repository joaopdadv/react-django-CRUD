from django.urls import path
from .views import FuncionarioCreateView

urlpatterns = [
    path('', FuncionarioCreateView.as_view(), name='criar-funcionario'),
]