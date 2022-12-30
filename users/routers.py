from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
from django.urls import path

from users.api import *

router = DefaultRouter()
router.register(r'', GetUsersView, basename='users')

urlpatterns = [
    path("signup/", SignUpView.as_view(), name="signupview"),
    path("login/", LoginView.as_view(), name="loginview"),
    path("logout/", LogoutView.as_view(), name="logoutview"),
    path("refresh-token/", TokenRefreshView.as_view(), name="token_refresh"),
]

urlpatterns += router.urls
