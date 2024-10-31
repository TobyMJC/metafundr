from django.contrib import admin
from .models import Post, PostComment, MetaUser

# Register your models here.
admin.site.register(Post)
admin.site.register(MetaUser)
admin.site.register(PostComment)