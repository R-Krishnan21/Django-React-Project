from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('signin/',index),
    path('logout/',index),
    path('signup/',index),
    path('profile/',index),
    path('delete_post/',index),
    path('post/new/',index),
    path('user/<str:username>/',index),
    path('post/<int:pk>/',index),
    path('category/',index),
    path('user/',index),
]