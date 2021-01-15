from django.shortcuts import render
from .serializers import UserSerializer, UserUpdateSerializer
from rest_framework.generics import CreateAPIView,UpdateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth.models import User

# Create your views here.
class Registration(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UpdateUser(UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserUpdateSerializer
    permission_classes = [IsAuthenticated]

    