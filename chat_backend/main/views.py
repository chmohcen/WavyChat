from rest_framework.generics import CreateAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, login, logout
from .models import User
from .serializers import UserSerializer


class SignupView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class LoginView(APIView):

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            return Response({"error": "Email and password required"}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(request, email=email, password=password) 

        if user is not None:
            login(request, user)
            return Response({"message": "Logged in successfully", "email": user.email})
        
        return Response({"error": "Email or password incorrect"}, status=status.HTTP_401_UNAUTHORIZED)
    
class LogoutView(APIView):

    def post(self, request):
        logout(request)  
        return Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)