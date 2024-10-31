from email.policy import default
import uuid
from datetime import timedelta
from django.utils import timezone
from .managers import MetaUserManager
from django.db import models
from django.contrib.auth.models import AbstractUser, PermissionsMixin
from django.db.models.signals import pre_delete
from django.dispatch import receiver
from django.utils import timezone

def default_date_of_birth():
    return timezone.now().date() - timedelta(days=18*365)

class MetaUser(AbstractUser, PermissionsMixin):
    username = models.CharField(max_length=255, unique=True)
    email = models.EmailField(unique=True, default="placeholder@example.com")

    first_name = models.CharField(max_length=255, default="first name")
    last_name = models.CharField(max_length=255, default="last name")
    phone_number = models.CharField(max_length = 20, default="+11 11 1111-1111")

    date_of_birth = models.DateField(default=default_date_of_birth)
    date_joined = models.DateField(default=timezone.now)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = MetaUserManager()

    def __str__(self):
        return self.email + " / " + self.username
        
class Post(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=64, default="Title")
    description = models.TextField(max_length = 3000, default="Description")
    author = models.ForeignKey(MetaUser, on_delete = models.CASCADE)
    thumbnail = models.ImageField(blank=True, upload_to="posts/")
    goal = models.IntegerField(default=1000)
    income = models.IntegerField(default=0)

    def __str__(self):
        return f'{self.title} - {self.author} / {self.id}'

@receiver(pre_delete, sender=Post)
def delete(sender, instance, using, **kwargs):
    if instance.thumbnail:
        instance.thumbnail.delete()

class PostComment(models.Model):
    post = models.ForeignKey(Post, on_delete = models.CASCADE)
    author = models.ForeignKey(MetaUser, on_delete = models.CASCADE)
    content = models.CharField(max_length=1000)
    answer = models.CharField(max_length=20000, null=True)