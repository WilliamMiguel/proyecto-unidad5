from pagos.models import Services, Payment_user, Expired_payments
from rest_framework import viewsets
from rest_framework import generics
from .serializers import ServicesSerializer, ExpiredPaymentsSerializer, PaymentUserSerializer
from rest_framework.permissions import IsAuthenticated
from pagos.pagination import StandardResultsSetPagination
from rest_framework import viewsets, filters 

class ServicesViewSet(viewsets.ModelViewSet):
    queryset = Services.objects.get_queryset().order_by('id')
    serializer_class = ServicesSerializer
    pagination_class = StandardResultsSetPagination
    filter_backends = [filters.SearchFilter]
    # permission_classes = [IsAuthenticated]

class ServicesListView(generics.ListAPIView):
    queryset = Services.objects.all()
    serializer_class = ServicesSerializer
    # permission_classes = [IsAuthenticated]

class PaymentUserViewSet(viewsets.ModelViewSet):
    queryset = Payment_user.objects.all()
    serializer_class = PaymentUserSerializer
    filter_backends = [filters.SearchFilter]
    # permission_classes = [IsAuthenticated]
    search_fields = ['paymentdate', 'expirationdate']
    throttle_scope = 'pagos'

class ExpiredPaymentsView(generics.ListCreateAPIView):
    queryset = Expired_payments.objects.all()
    serializer_class = ExpiredPaymentsSerializer
    # permission_classes = [IsAuthenticated]