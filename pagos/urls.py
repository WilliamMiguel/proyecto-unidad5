from django.urls import re_path, include
from versionedPagosapp.v1.pagos.api.routers import urlpatterns as api_v1
from versionedPagosapp.v2.pagos.api.routers import urlpatterns as api_v2


urlpatterns = [
    re_path(r'^api/v3/', include(api_v1)),
    re_path(r'^api/v4/', include(api_v2)),
]