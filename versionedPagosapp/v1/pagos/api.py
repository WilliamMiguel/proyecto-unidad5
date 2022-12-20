from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets, filters 

from versionedPagosapp.v1.pagos.models import Pagos
from versionedPagosapp.v1.pagos.pagination import StandardResultsSetPagination
from versionedPagosapp.v1.pagos.serializers import PagoSerializer

class PagoViewSet(viewsets.ModelViewSet):
    queryset = Pagos.objects.get_queryset().order_by('id')
    serializer_class = PagoSerializer
    pagination_class = StandardResultsSetPagination
    filter_backends = [filters.SearchFilter]
    # permission_classes = [IsAuthenticated]

    search_fields = ['usuario__id', 'fecha_pago', 'servicio']
    throttle_scope = 'pagos'