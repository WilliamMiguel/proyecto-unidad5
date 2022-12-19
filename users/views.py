from django.contrib.auth import authenticate

from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status, generics
from rest_framework.views import APIView
from rest_framework import viewsets

from users.api.serializers import SignUpSerializer, GetUserSerializer
from users.models import User
from users.tokens import create_jwt_pair_for_user

# Create your views here.
class SignUpView(generics.GenericAPIView):
    serializer_class = SignUpSerializer

    def post(self, request: Request):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            serializer.save()

            response = {"message": "El usuario se creó correctamente", "data": serializer.data}

            return Response(data=response, status=status.HTTP_201_CREATED)

        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):

    def post(self, request: Request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(email=email, password=password)
        print(user)
        if user is not None:
            tokens = create_jwt_pair_for_user(user)
            response = {"message": "Logeado correctamente", "email": email ,"tokens": tokens}
            return Response(data=response, status=status.HTTP_200_OK)

        else:
            return Response(data={"message": "Correo inválido o contraseña incorrecta"})

    def get(self, request: Request):
        content = {"user": str(request.user), "auth": str(request.auth)}

        return Response(data=content, status=status.HTTP_200_OK)

class GetUsers(viewsets.ReadOnlyModelViewSet):
    serializer_class = GetUserSerializer
    queryset = User.objects.all()
