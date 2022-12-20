from rest_framework.routers import DefaultRouter
from django.urls import path

from users.api.api import *

router = DefaultRouter()
router.register(r'users', GetUsersView, basename='users')

urlpatterns = [
    path("signup/", SignUpView.as_view(), name="signupview"),
    path("login/", LoginView.as_view(), name="loginview"),
]

urlpatterns += router.urls
