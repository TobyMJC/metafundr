from xml.etree.ElementInclude import include
from django.urls import path, include
from . import views
from rest_framework import routers
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView
from .serializers import PostViewSet, PostCommentViewSet

router = routers.DefaultRouter()
router.register(r'posts', PostViewSet)
router.register(r'comments', PostCommentViewSet)

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/', include(router.urls)), 
    path('login/', views.login),
    path('register/', views.RegisterView.as_view()),
    path('dj-rest-auth/', include('dj_rest_auth.urls'))
]