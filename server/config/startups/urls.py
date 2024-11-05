from xml.etree.ElementInclude import include
from django.urls import path, include
from . import views
from rest_framework import routers
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView
from .views import PostViewSet, PostCommentViewSet, MetaUserViewSet

router = routers.DefaultRouter()
router.register(r'posts', PostViewSet)
router.register(r'comments', PostCommentViewSet)
router.register(r'users', MetaUserViewSet)

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/', include(router.urls)), 
    path('register/', views.RegisterView.as_view()),
    path('dj-rest-auth/', include('dj_rest_auth.urls'))
]