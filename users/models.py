from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser

class UserManager(BaseUserManager):
    def create_user(self, email, password, **extra_fields):
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("El superusuario necesita que is_staff sea verdadero")

        if extra_fields.get("is_superuser") is not True:
            raise ValueError("El superusuario necesita que is_superuser sea verdadero")

        return self.create_user(email=email, password=password, **extra_fields)

class User(AbstractBaseUser):
    id = models.AutoField(primary_key=True)
    email = models.EmailField('Correo Electrónico',max_length = 255, unique = True,)
    username = models.CharField('Usuario',max_length = 255, unique = True)
    is_staff = models.BooleanField('Admin',default=False)
    objects = UserManager()

    class Meta:
        verbose_name = 'Usuario'
        verbose_name_plural = 'Usuarios'

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.username