from django.contrib import admin
from django.urls import path, include, re_path

from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from versionedPagosapp.v1.pagos.routers import api_urlpatterns as api_v1_pagos
from versionedPagosapp.v2.pagos.routers import urlpatterns as api_v2_pagos

from versionedPagosapp.v1.users.routers import api_urlpatterns as api_v1_users
from versionedPagosapp.v2.users.routers import urlpatterns as api_v2_users

schema_view = get_schema_view(
   openapi.Info(
      title="Documentación de API",
      default_version='v2',
      description="Documentación pública",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="william.vilcah@outlook.com"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=[permissions.AllowAny],
)

urlpatterns = [
   path('admin/', admin.site.urls),

   # Versión actual (Versión 2)
   path('users/', include('users.routers')),
   path('pagos/', include('pagos.routers')),

   #Versión 1
   # path('api/v1/pagos/', include(api_v1_pagos)),
   # path('api/v1/users/', include(api_v1_users)),

   #Versión 2
   # path('api/v2/pagos/', include(api_v2_pagos)),
   # path('api/v2/users/', include(api_v2_users)),
   
   re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
   re_path(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
   re_path(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]