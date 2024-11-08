from django.views.decorators.csrf import csrf_exempt
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken
from rest_framework import generics
from .models import MetaUser, Post, PostComment
from .serializers import MetaUserSerializer, PostSerializer, PostCommentSerializer
from datetime import date, datetime
from dateutil.relativedelta import relativedelta
from rest_framework.response import Response
from rest_framework import viewsets, status
from rest_framework.exceptions import NotAuthenticated, PermissionDenied

# Create your views here.
age_limit = date.today() - relativedelta(years=18)

class RegisterView(generics.GenericAPIView):
    serializer_class = MetaUserSerializer

    def post(self, request, *args, **kwargs):
        data = request.data.copy()
            
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        
        date = datetime.strptime(data['date_of_birth'], '%Y-%m-%d').date()
        
        if(date > age_limit):
            raise AuthenticationFailed("Minimum date is 18")

        user = serializer.save()

        return Response({
            "access_token": str(AccessToken.for_user(user)),
            "refresh_token": str(RefreshToken.for_user(user))
        }, status=status.HTTP_201_CREATED)

#View sets

class MetaUserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = MetaUser.objects.all()
    serializer_class = MetaUserSerializer
    
    def update(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            raise NotAuthenticated("You are not authenticated")

        instance = self.get_object()

        if request.user != instance:
            raise PermissionDenied("No permission")
            
        data = {'image': request.data.get('image')}

        serializer = self.serializer_class(instance, data=data, partial = True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response("OK", status=status.HTTP_200_OK)

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    
    def perform_create(self, serializer):
        if self.request.user.is_authenticated:
            serializer.save(author=self.request.user)
        else:
            raise NotAuthenticated("You are not authenticated")

    def destroy(self, request, *args, **kwargs): 
        if self.request.user.is_authenticated:
            instance = self.get_object()
            if instance.author == self.request.user:
                self.perform_destroy(instance)
                return Response("OK", status=status.HTTP_200_OK)
            else:
                raise PermissionDenied("You are not the author of the post")
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

