from .models import MetaUser, Post, PostComment
from rest_framework.response import Response
from rest_framework import serializers, viewsets, status
from rest_framework.exceptions import NotAuthenticated, PermissionDenied

class MetaUserSerializer(serializers.ModelSerializer): 
    image = serializers.ImageField(required = False)
    class Meta:
        model = MetaUser
        fields = ['id', 'image', 'username','password', 'email', 'first_name', 'last_name', 'phone_number', 'date_of_birth']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = MetaUser.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name = validated_data['first_name'],
            last_name = validated_data['last_name'],
            phone_number = validated_data['phone_number'],
            date_of_birth = validated_data['date_of_birth']
        )
        return user

class PostCommentSerializer(serializers.ModelSerializer):
    author = MetaUserSerializer(read_only=True)

    class Meta:
        model = PostComment
        fields = ['id', 'author', 'content', 'answer', 'post']
        read_only_fields = ['id']

    def create(self, validated_data):
        validated_data.pop('answer', None)  
        return super().create(validated_data)

class PostSerializer(serializers.ModelSerializer):
    comments = PostCommentSerializer(source='postcomment_set', many=True, read_only=True)
    author = MetaUserSerializer(read_only=True)

    class Meta:
        model = Post
        fields= 'id', 'title', 'description', 'goal', 'income', 'thumbnail', 'author', 'comments'
