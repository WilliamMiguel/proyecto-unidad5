from rest_framework import serializers
from pagos.models import Services, Expired_payments, Payment_user

class ServicesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Services
        fields = '__all__'
        read_only_fields = '__all__',

class ExpiredPaymentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expired_payments
        fields = '__all__'
        read_only_fields = '__all__',

    def to_representation(self, instance):
        return {
            'id': instance.id,
            'importe de la multa': instance.penalty_fee_amount,
            'payment_user_id': instance.payment_user_id.id,
            'user': instance.payment_user_id.user_id.username,
            'email': instance.payment_user_id.user_id.email,
            'service': instance.payment_user_id.service_id.name,
            'fecha de pago': instance.payment_user_id.paymentdate,
            'monto': instance.payment_user_id.amount,
            'logo': instance.payment_user_id.service_id.logo.url,
        }

class PaymentUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment_user
        fields = '__all__'
        read_only_fields = '__all__',

    def to_representation(self, instance):
        return {
            'id': instance.id,
            'monto': instance.amount,
            'fecha de pago': instance.paymentdate,
            'fecha de vencimiento': instance.expirationdate,
            'usuario': instance.user_id.username,
            'servicio': instance.service_id.name,
            'email': instance.user_id.email,
            'logo': instance.service_id.logo.url,
        }