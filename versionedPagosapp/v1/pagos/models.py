from django.db import models
from django.utils.translation import gettext_lazy as _

from versionedPagosapp.v1.users.models import User


class Pagos(models.Model):
    class Services(models.TextChoices):
        NETFLIX = 'NTX', _('Netflix')
        AMAZON_VIDEO = 'AZV', _('Amazon Video')
        START = 'ST', _('Start+')
        PARAMOUNT = 'PMT', _('Paramount+')

    services = models.CharField(
        max_length=3,
        choices=Services.choices,
        # default="Elige un servicio",
    )
    date_of_payment = models.DateField(auto_now_add=True)
    amount = models.FloatField(default=0.0)
    user = models.ForeignKey(User, on_delete =models.CASCADE, related_name='users')
