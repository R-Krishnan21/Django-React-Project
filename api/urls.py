from django.urls import path
from .views import (PostList, PostCreate,PostUpdate, PostRetrieve, PostDestroy, 
                    UserPostList, ProfileDetail, ProfileUpdate, CategoriesList, CommentList, CommentCreate, CommentsList)

urlpatterns = [
    path('post/', PostList.as_view(), name='blog-home'),
    path('category/', CategoriesList.as_view(), name='category-list'),
    path('commentslist/', CommentsList.as_view(), name='comments'),
    path('comments/<int:pk>/', CommentList.as_view(), name='comment-list'),
    path('comments/new/', CommentCreate.as_view(), name='comment-create'),
    path('user/<str:username>/', UserPostList.as_view(), name='user-posts'),
    path('post/<int:pk>/', PostRetrieve.as_view(),name='post-detail'),
    path('post/new/', PostCreate.as_view(), name='post-create'),
    path('post/<int:pk>/update/', PostUpdate.as_view(), name='post-update'),
    path('post/<int:pk>/delete/', PostDestroy.as_view(), name='post-delete'),
    path('profiles/<int:pk>/', ProfileDetail.as_view(), name='profile-detail'),
    path('profiles/<int:pk>/update/', ProfileUpdate.as_view(), name='profile-update'),
]