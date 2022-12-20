from django.urls import include, path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions


schema_view_v1 = get_schema_view(
   openapi.Info(
      title="Documentación de API",
      default_version='v1',
      description="Documentación pública",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="william.vilcah@outlook.com"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=[permissions.AllowAny],
)

urlpatterns = [
    path('docs/', schema_view_v1.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
]




