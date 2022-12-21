from django.db import models
from users.models import User
from datetime import datetime

class Services(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField('Servicio', max_length=50, unique=True, null=False, blank=False)
    description = models.CharField('Descripción', max_length=150, blank=False, null=False)
    logo = models.ImageField('Logo', upload_to='logos/', blank=True, null=True)

    def __str__(self) -> str:
        return self.name

class Payment_user(models.Model):
    id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="Usuario")
    service_id = models.ForeignKey(Services, on_delete=models.CASCADE, verbose_name="ID del servicio")
    amount = models.FloatField(verbose_name="Monto a pagar")
    paymentdate = models.DateField(auto_now_add=True, verbose_name="Fecha de pago")
    expirationdate = models.DateField(verbose_name="Fecha de vencimiento")

    def __str__(self) -> str:
        return str(self.id)

class Expired_payments(models.Model):
    id = models.AutoField(primary_key=True)
    payment_user_id = models.ForeignKey(Payment_user, on_delete=models.CASCADE)
    penalty_fee_amount = models.FloatField(default=0.0, verbose_name="Importe de la multa")

    def __str__(self) -> str:
        return self.payment_user_id.expirationdate

