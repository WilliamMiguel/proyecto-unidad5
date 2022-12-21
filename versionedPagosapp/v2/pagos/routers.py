from pagos.api import ServicesViewSet, ExpiredPaymentsViewSet, PaymentUserViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'payment', PaymentUserViewSet, basename="payment")
router.register(r'services', ServicesViewSet, basename="services")
router.register(r'expired-payments', ExpiredPaymentsViewSet, basename="expired-payments")

urlpatterns = router.urls