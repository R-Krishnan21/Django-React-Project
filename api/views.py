from django.shortcuts import render
from django.shortcuts import render, get_object_or_404
from django.contrib.auth.models import User
from .models import Post, Profile, Categories, Comments
from .custom_permission import IsOwner
from rest_framework_simplejwt.authentication import JWTAuthentication
from .serializers import PostSerializer, ProfileSerializer, CategoriesSerializer, CommentSerializer
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.permissions import AllowAny,IsAdminUser,IsAuthenticated
from rest_framework.generics import (ListAPIView,CreateAPIView,
                                    RetrieveAPIView,UpdateAPIView,DestroyAPIView, RetrieveDestroyAPIView)

# Create your views here.

#Post Operation
class PostList(ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ['category__category']
    ordering_fields = ['date_posted']

class PostCreate(CreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class PostRetrieve(RetrieveAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class PostUpdate(UpdateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def update(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

class PostDestroy(DestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsOwner]

#User Post
class UserPostList(ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    filter_backends = [SearchFilter,OrderingFilter]
    search_fields = ['title','Cateogries']
    ordering_fields = ['date_posted']

    def get_queryset(self):
        username = self.kwargs['username']
        return Post.objects.filter(author__username=username)

#Profile
class ProfileDetail(RetrieveAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

class ProfileUpdate(UpdateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsOwner]

#Categories
class CategoriesList(ListAPIView):
    queryset = Categories.objects.all()
    serializer_class = CategoriesSerializer

#Comments
class CommentList(ListAPIView):
    queryset = Comments.objects.all()
    serializer_class = CommentSerializer

    def get_queryset(self):
        id = self.kwargs['pk']
        return Comments.objects.filter(post=id)

class CommentCreate(CreateAPIView):
    queryset = Comments.objects.all()
    serializer_class = CommentSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class CommentsList(ListAPIView):
    queryset = Comments.objects.all()
    serializer_class = CommentSerializer

