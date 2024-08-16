import uuid
from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import pre_delete
from django.dispatch import receiver

class Post(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=64, default="Title")
    description = models.TextField(max_length = 3000, default="Description")
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    thumbnail = models.ImageField(blank=True, upload_to="images/posts/")
    goal = models.IntegerField(default=1000)
    income = models.IntegerField(default=0)

    def __str__(self):
        return f'{self.title} - {self.author} / {self.id}'


@receiver(pre_delete, sender=Post)
def delete(sender, instance, using, **kwargs):
    if instance.thumbnail:
        instance.thumbnail.delete()
