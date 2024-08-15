from django.db import models
from django.contrib.auth.models import User

class Post(models.Model):
    title = models.CharField(max_length=64, default="Title")
    description = models.TextField(max_length = 3000, default="Description")
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    thumbnail = models.ImageField(blank=True)
    goal = models.IntegerField(default=1000)
    income = models.IntegerField(default=0)

    def __str__(self):
        return f'{self.title} - {self.author}'