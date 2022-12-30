# Generated by Django 4.1.4 on 2022-12-29 19:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pagos', '0007_services_prefix'),
    ]

    operations = [
        migrations.AlterField(
            model_name='services',
            name='description',
            field=models.CharField(blank=True, max_length=150, null=True, verbose_name='Descripción'),
        ),
        migrations.AlterField(
            model_name='services',
            name='prefix',
            field=models.CharField(blank=True, max_length=3, null=True, unique=True, verbose_name='Prefijo'),
        ),
    ]
