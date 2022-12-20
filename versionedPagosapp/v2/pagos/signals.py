from django.db.models.signals import post_save
from django.dispatch import receiver
from pagos.models import Expired_payments, Payment_user

@receiver(post_save, sender = Payment_user)
def create_expired_payment(sender, instance, created, **kwargs):
    if created and instance.paymentdate > instance.expirationdate:
        Expired_payments.objects.create(
            payment_user_id = instance,
            penalty_fee_amount = instance.amount * 0.25
        )