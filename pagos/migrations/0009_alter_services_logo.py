# Generated by Django 4.1.4 on 2022-12-29 20:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pagos', '0008_alter_services_description_alter_services_prefix'),
    ]

    operations = [
        migrations.AlterField(
            model_name='services',
            name='logo',
            field=models.ImageField(upload_to='images/logos/', verbose_name='Logo'),
        ),
    ]