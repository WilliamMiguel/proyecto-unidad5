from rest_framework.routers import DefaultRouter
from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)
from versionedPagosapp.v1.users.views import *

router = DefaultRouter()

router.register('', GetUsers, basename='users')

urlpatterns = [
    path("signup/", SignUpView.as_view(), name="signupview"),
    path("login/", LoginView.as_view(), name="loginview"),
    path("jwt/create/", TokenObtainPairView.as_view(), name="jwt_create"),
    path("jwt/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("jwt/verify/", TokenVerifyView.as_view(), name="token_verify"),
]

api_urlpatterns = urlpatterns + router.urls
