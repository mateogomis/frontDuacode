from django.db import models
from core.models import Empleado  # Asegúrate de importar tu modelo Empleado

class Sede(models.Model):
    nombre = models.CharField(max_length=100)
    direccion = models.CharField(max_length=255)
    ciudad = models.CharField(max_length=100)  # Asegúrate de que este campo exista
    pais = models.CharField(max_length=100)    # Asegúrate de que este campo exista

    def __str__(self):
        return self.nombre



class SalaReuniones(models.Model):
    nombre = models.CharField(max_length=100)
    capacidad = models.IntegerField()
    sede = models.ForeignKey(Sede, on_delete=models.CASCADE, related_name='salas')  # Relación con Sede

    def __str__(self):
        return f'{self.nombre} en {self.sede.nombre}'

    class Meta:
        db_table = 'salas_reuniones'  # Nombre de la tabla


class ReservaSala(models.Model):
    sala = models.ForeignKey(SalaReuniones, on_delete=models.CASCADE, related_name='reservas')  # Relación con SalaReuniones
    reservado_por = models.ForeignKey(Empleado, on_delete=models.CASCADE)  # Empleado que reserva la sala
    fecha_inicio = models.DateTimeField()
    fecha_fin = models.DateTimeField()
    empleados_asistentes = models.ManyToManyField(Empleado, related_name='reservas_asistentes', blank=True)  # Empleados que asistirán

    def __str__(self):
        return f'Reserva de {self.sala.nombre} por {self.reservado_por}'

    class Meta:
        db_table = 'reservas_sala'  # Nombre de la tabla

