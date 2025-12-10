from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import FuncionarioInputSerializer, FuncionarioOutputSerializer
from .services import criar_funcionario

class FuncionarioCreateView(APIView):
    
    def post(self, request):
        serializer = FuncionarioInputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            novo_funcionario = criar_funcionario(
                **serializer.validated_data
            )
            
            output = FuncionarioOutputSerializer(novo_funcionario)
            
            return Response(output.data, status=status.HTTP_201_CREATED)

        except ValueError as e:
            return Response({"erro": str(e)}, status=status.HTTP_400_BAD_REQUEST)