from django.contrib import admin
from .models import Post, Profile, Categories, Comments

# Register your models here.
admin.site.register(Profile)
admin.site.register(Post)
admin.site.register(Categories)
admin.site.register(Comments)