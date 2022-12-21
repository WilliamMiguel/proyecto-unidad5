from pagos.models import Services, Payment_user, Expired_payments
from rest_framework import viewsets
from pagos.serializers import ServicesSerializer, ExpiredPaymentsSerializer, PaymentUserSerializer
from pagos.pagination import StandardResultsSetPagination
from rest_framework import viewsets, filters 
from pagos.permissions import IsAdminOrReadOnly, IsUserOrAdmin

class ServicesViewSet(viewsets.ModelViewSet):
    queryset = Services.objects.all().order_by('id')
    serializer_class = ServicesSerializer
    permission_classes = [IsAdminOrReadOnly]
    throttle_scope = 'others'

class PaymentUserViewSet(viewsets.ModelViewSet):
    queryset = Payment_user.objects.all().order_by('id')
    serializer_class = PaymentUserSerializer
    # pagination_class = StandardResultsSetPagination
    permission_classes = [IsUserOrAdmin]
    filter_backends = [filters.SearchFilter]
    search_fields = ['paymentdate', 'expirationdate']
    throttle_scope = 'pagos'

class ExpiredPaymentsViewSet(viewsets.ModelViewSet):
    queryset = Expired_payments.objects.all().order_by('id')
    serializer_class = ExpiredPaymentsSerializer
    permission_classes = [IsAdminOrReadOnly]
    throttle_scope = 'others'