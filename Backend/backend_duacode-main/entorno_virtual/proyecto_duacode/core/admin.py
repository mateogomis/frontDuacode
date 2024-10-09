from django.contrib import admin

# Register your models here.
from .models import Empleado   #Importamos el modelo empleado desde models.py
from .models import RolModel

#Registramos el modelo empleado para la interfaz admin de Django
#Nos permitirá realizar operaciones CRUD desde la interfaz admin de Django
admin.site.register(Empleado)  
admin.site.register(RolModel)  