from versionedPagosapp.v1.pagos.api import PagoViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('', PagoViewSet, basename='pagos')

api_urlpatterns = router.urls