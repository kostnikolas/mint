from rest_framework.generics import CreateAPIView, RetrieveUpdateAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from .serializers import UserRegisterSerializer, UserPrivateSerializer, UserSigninSerializer

class UserRegistrationView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegisterSerializer

class UserProfileView(RetrieveUpdateAPIView):
    permission_classes = (IsAuthenticated, )
    queryset = User.objects.filter(is_active=True)
    serializer_class = UserPrivateSerializer

    def get_object(self):
        return self.request.user

class UserSigninView(APIView):

    def post(self, request, *args, **kwargs):
        serializer = UserSigninSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = authenticate(request, username=request.data['username'], password=request.data['password'])
        if user is None:
            return Response({"message": "username or password not found"}, status=status.HTTP_403_FORBIDDEN)
        login(request, user)
        return Response({"success": True}, status=status.HTTP_200_OK)
        
    


