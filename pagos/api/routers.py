from pagos.api.api import PagoViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'', PagoViewSet, basename='pagos')

urlpatterns = router.urls