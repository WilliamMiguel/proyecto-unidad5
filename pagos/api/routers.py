from pagos.api.api import ServicesViewSet, ExpiredPaymentsViewSet, PaymentUserViewSet
from rest_framework.routers import DefaultRouter, SimpleRouter
from django.urls import path

router = DefaultRouter()
router.register(r'payment', PaymentUserViewSet)
router.register(r'services', ServicesViewSet)
router.register(r'expired-payments', ExpiredPaymentsViewSet)

urlpatterns = router.urls