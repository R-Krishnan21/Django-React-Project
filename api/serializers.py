from rest_framework import serializers
from .models import Post, Profile, Categories, Comments, User
from account.serializers import UserSerializer

class PostSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    comments= serializers.SerializerMethodField()
    category = serializers.SlugField(read_only=True)
    class Meta:
        model = Post
        fields = '__all__'

    def get_comments(self,obj):
        comments = Comments.objects.filter(post=obj.id)
        serializer = CommentSerializer(comments,many=True)
        return serializer.data

class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = Profile
        fields = '__all__'

class CategoriesSerializer(serializers.ModelSerializer):
    Category_Post = PostSerializer(read_only=True, many=True)
    class Meta:
        model = Categories
        fields = ['id','category','Category_Post']

class CommentSerializer(serializers.ModelSerializer):
    user = serializers.SlugField(read_only=True)
    class Meta:
        model = Comments
        fields = '__all__'
