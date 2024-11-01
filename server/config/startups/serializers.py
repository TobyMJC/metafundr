from .models import MetaUser, Post, PostComment
from rest_framework.response import Response
from rest_framework import serializers, viewsets, status
from rest_framework.exceptions import NotAuthenticated, PermissionDenied

class MetaUserSerializer(serializers.ModelSerializer): 
    class Meta:
        model = MetaUser
        fields = ['username','password', 'email', 'first_name', 'last_name', 'phone_number', 'date_of_birth']
        extra_kwargs = {'password': {'write_only': True}, 'phone_number': {'write_only': True}}

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

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    
    def perform_create(self, serializer):
        if self.request.user.is_authenticated:
            serializer.save(author=self.request.user)
        else:
            raise NotAuthenticated("You are not authenticated")

class PostCommentViewSet(viewsets.ModelViewSet):
    queryset = PostComment.objects.all()
    serializer_class = PostCommentSerializer
    
    def perform_create(self, serializer):
        if self.request.user.is_authenticated:
            serializer.save(author=self.request.user)
        else:
            raise NotAuthenticated("You are not authenticated")


    def update(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            raise NotAuthenticated("You are not authenticated")

        instance = self.get_object()

        if request.user != instance.post.author:
            raise PermissionDenied("You are not the author of the post")

        serializer = self.serializer_class(instance, data=request.data, partial = True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response("OK", status=status.HTTP_200_OK)

