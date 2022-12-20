from pagos.api.api import ServicesViewSet, ServicesListView, ExpiredPaymentsView, PaymentUserViewSet
from rest_framework.routers import DefaultRouter, SimpleRouter
from django.urls import path

router = DefaultRouter()
router.register(r'payment', PaymentUserViewSet)

urlpatterns = [
    path('services/', ServicesListView.as_view(), name="services"),
    path('expired-services/', ExpiredPaymentsView.as_view(), name="expired-services"),
    # path('payment-services/', PaymentUserViewSet.as_view(), name="payment-services"),
]

urlpatterns += router.urls