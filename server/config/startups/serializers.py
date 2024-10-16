from .models import MetaUser, Post
from rest_framework import serializers, viewsets

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

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields= 'id', 'title', 'description', 'goal', 'income', 'thumbnail', 'author' 
        
    def to_representation(self, instance):
        self.fields['author'] = MetaUserSerializer(read_only=True)
        return super(PostSerializer, self).to_representation(instance)

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer