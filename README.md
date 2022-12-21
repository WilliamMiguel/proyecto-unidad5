# Proyecto Unidad 5 - API de Pagos

Proyecto desarrollado usando Django Rest Framework (DRF)

## Instalación

Crear una carpeta e iniciar VS Code dentro de ella, luego crear el entorno virtual ejecutando la siguiente línea:

```bash
py -m venv env
```
Acceder al entorno virtual y activarlo. En Windows:

```bash
.\env\scripts\activate
```

Instalar las dependencias que se encuentran en requirements.txt:

```bash
pip install -r requirements.txt
```

Crear un archivo **.env** en la carpeta del proyecto (pagosapp en este caso). Para la configuración de este archivo se ha seguido la guía: [How to set up environment variables in Django](https://alicecampkin.medium.com/how-to-set-up-environment-variables-in-django-f3c4db78c55f).

Si no se desea crear el archivo **.env** se debe cambiar la siguiente configuración, reemplazando por los valores de un servidor local:
```py
SECRET_KEY = # Clave que proporciona Django al crear un proyecto

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': '',
        'USER': '',
        'PASSWORD': ,
        'HOST': '',
        'PORT': ''
    }
}
```

## Uso

Ejecutar la siguiente línea de código dentro del entorno virtual:
```python
py manage.py runserver
```
La ruta para hacer uso de la API es: http://127.0.0.1:8000/ si se ha configurado DATABASES localmente.

El proyecto tiene despliegue realizado en Railway, se puede acceder desde [aquí](https://proyecto-unidad5-production.up.railway.app/).

Las peticiones se pueden realizar mediante Postman.

## Estructura principal del proyecto

El proyecto se compone de dos aplicaciones: users y pagos. En *users* se controla el registro e inicio de sesión de los usuarios para el acceso a la API, cualquiera que no se encuentre registrado no tendrá acceso a la API. En *pagos* se realiza el pago de determinados servicios como Netflix, Spotify, Movistar, etc para lo cual se deberá iniciar sesión.

### Users

#### Vistas y rutas

Las vistas y rutas que se proporcionan son: 

- Signup (<code>/users/signup/</code>): Permite el registro de usuario, todos pueden acceder a ella, se permite el método <code>POST</code> y los parámetros para el registro son:

```py
{
    "email": "example@example.com",
    "username": "example",
    "password": "examplepass"
}
```

- Login (<code>/users/login/</code>): Permite el inicio de sesión de los usuarios, permite los métodos <code>GET</code> y <code>POST</code>. Se deben enviar los parámetros:
```py
{
    "email":"example@example.com",
    "password": "examplepass"
}
```

Lo cual retorna un token de acceso y refresh que permite el uso de *pagos*. El token de acceso expira luego de 5 minutos.

- GetUsers (<code>/users/</code>): Retorna la lista de usuarios registrados. Permite los métodos <code>GET, PUT, PATCH, DELETE</code> si el usuario es administrador, de lo contrario solo permite el método <code>GET</code>.

#### Permisos

El archivo <code>permissions.py</code> contiene permisos personalizados para las vistas anteriormente mencionadas.

### Pagos

#### Vistas y rutas

Todas las vistas cuentan con los métodos <code>GET, POST, PUT, PATCH, DELETE</code>, sin embargo el acceso a cada uno de ellos dependerá de los permisos que tenga quien accede, a saber:
- No registrado (anónimo): No puede hacer uso de la API.
- Registrado (usuario): Puede hacer uso del método <code>POST</code> en la ruta <code>/pagos/payment/</code> y <code>GET</code> en las demás.
- Administrador (admin): Tiene acceso a todos los métodos.

Las vistas y rutas que se proporcionan son: 

- Services (<code>/pagos/services/{id}/</code>): Muestra los servicios que se pueden pagar, el *usuario* solo puede hacer uso del método <code>GET</code>. Mientras que el *admin* puede añadir servicios (<code>POST</code>), modificar un servicio (<code>PUT o PATCH</code>) o borrar servicios (<code>DELETE</code>). Para lo cual, los parámetros necesarios a enviar son:

```py
{
    "name": "Nombre del servicio",
    "description": "Descripción del servicio"
}
```

- Payment (<code>/pagos/payment/{id}</code>): Lista los pagos realizados (<code>GET</code>) y permite realizar uno (<code>POST</code>), sea *usuario* o *admin*:

```py
{
    "amount": # Admite decimales
    "expirationdate": # Formato: Año-mes-día
    "user_id": # ID del usuario que realiza el pago (int)
    "service_id": # ID del servicio a pagar (int)
}
```
Sin embargo solo el *admin* puede hacer uso de los métodos restantes.

- Expired-payments (<code>/pagos/expired-payments/{id}</code>): Realiza el registro de los pagos que se realizaron después de la fecha de vencimiento y la multa. El *usuario* tiene acceso al método <code>GET</code>, mientras que el *admin* puede hacer uso de todos los métodos. Puede tener un registro manual o automático. 

Manualmente se deben enviar los parámetros:
```py
{
    "payment_user_id": # ID del pago realizado
    "penalty_fee_amount": # Valor de la multa, por defecto se encuentra en 0.0
}
```

El registro automático se realiza cuando la fecha de vencimiento (<code>expirationdate</code>) es menor a la fecha de pago (<code>paymentdate</code>) la cual se registra como fecha actual. Para esto se hace uso de *signals* (archivo <code>signals.py</code>) en donde se comparan las fechas. Este registro automático ingresa una multa del 25% del valor pagado.

De igual forma, el *usuario* solo tiene acceso al método <code>GET</code> y el *admin* a todos los métodos.

#### Permisos

El archivo <code>permissions.py</code> contiene permisos personalizados para las vistas anteriormente mencionadas.

### Settings

En el archivo <code>settings.py</code> del proyecto se ha configurado la paginación y el límite de peticiones:

```py
REST_FRAMEWORK = {
    # ...

     'DEFAULT_THROTTLE_RATES': {
        'others': '2000/day',
        'pagos': '1000/day',
    },

    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',

    'PAGE_SIZE': 100,

    # ...
}
```

Para cambiar el tiempo de duración del *Token* se modifica en:

```py
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=5),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    # ...
}
```

## Documentación

La documentación se ha realizado usando <code>drf-yasg</code>.

Se puede acceder a ella en la ruta <code>/swagger/</code> o desde [aquí](https://proyecto-unidad5-production.up.railway.app/swagger/).
