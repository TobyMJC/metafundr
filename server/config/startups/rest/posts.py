from ..models import Post
from rest_framework import serializers, viewsets

class PostSerializer(serializers.ModelSerializer):
    author_username = serializers.SerializerMethodField()
    class Meta:
        model = Post
        fields= 'id', 'title', 'description', 'goal', 'income', 'thumbnail', 'author_username'         
        
    def get_author_username(self, obj):
        return obj.author.username

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer