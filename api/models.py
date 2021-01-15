from django.db import models
from django.contrib.auth.models import User
import account.models 
from django.utils import timezone
from PIL import Image

# Create your models here.
categories = (
    ("Django","Django"),("React","React"),("Android","Android"),("Laravel","Laravel"),
    ("Angular","Angular"),("Flask","Flask"),("Ruby On Rail","Ruby On Rail"),("Python","Python"),
    (" C++"," C++"),("Java","Java")
)

#cateogries
class Categories(models.Model):
    category = models.CharField(choices=categories, max_length=20)

    def __str__(self):
        return self.category

    class Meta:
        verbose_name_plural = "categories"

#Post
class Post(models.Model):
    title = models.CharField(max_length=50)
    content = models.TextField()
    image = models.ImageField(null=True, blank=True)
    url = models.URLField(max_length=600,null=True, blank=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.ForeignKey(Categories,on_delete=models.CASCADE, related_name="Category_Post")
    date_posted = models.DateTimeField(default = timezone.now)

    def __str__(self):
        return self.title

#Comment
class Comments(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    comment = models.TextField()
    date_posted = models.DateTimeField(default = timezone.now)

    def __str__(self):
        return "{},{}".format(self.post,self.user)

    class Meta:
        verbose_name_plural = "comments"

#User Profile
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.ImageField(default= 'default.jpg', upload_to='profile_pics')

    def __str__(self):
        return f'{self.user.username} Profile'

    def save(self, **kwargs):
        super().save()

        img = Image.open(self.image.path)

        if img.height > 500 or img.width > 500:
            output_size = (500, 500)
            img.thumbnail(output_size)
            img.save(self.image.path)
