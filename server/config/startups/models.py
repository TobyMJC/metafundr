import uuid
from django.utils import timezone
from .managers import MetaUserManager
from django.db import models
from django.contrib.auth.models import AbstractUser, PermissionsMixin
from django.db.models.signals import pre_delete
from django.dispatch import receiver
from django.utils import timezone

class MetaUser(AbstractUser, PermissionsMixin):
    
    username = models.CharField(max_length=255, unique=True)
    email = models.EmailField(unique=True)

    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length = 16)

    date_of_birth = models.DateField()
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
    author = models.ForeignKey(MetaUser, on_delete=models.CASCADE)
    thumbnail = models.ImageField(blank=True, upload_to="posts/")
    goal = models.IntegerField(default=1000)
    income = models.IntegerField(default=0)

    def __str__(self):
        return f'{self.title} - {self.author} / {self.id}'

@receiver(pre_delete, sender=Post)
def delete(sender, instance, using, **kwargs):
    if instance.thumbnail:
        instance.thumbnail.delete()
