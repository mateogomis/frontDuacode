from django.db import models

# Create your models here.
from django.db import models
from core.models import Empleado  # Importa el modelo Empleado desde la app empleados

class Proyecto(models.Model):
    nombre = models.CharField(max_length=100)  # Nombre del proyecto
    descripcion = models.TextField()  # Descripción del proyecto
    fecha_inicio = models.DateField()  # Fecha de inicio del proyecto
    fecha_fin = models.DateField(blank=True, null=True)  # Fecha de finalización
    empleados = models.ManyToManyField(Empleado, related_name='proyectos')  # Relación ManyToMany con Empleado

    def __str__(self):
        return self.nombre