from xml.etree.ElementInclude import include
from django.urls import path, include
from . import views
from rest_framework import routers
from .rest.posts import PostViewSet

router = routers.DefaultRouter()
router.register(r'posts', PostViewSet)

urlpatterns = [
    path('api/', include(router.urls))
]