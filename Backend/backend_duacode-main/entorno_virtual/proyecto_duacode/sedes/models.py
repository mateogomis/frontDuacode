from django.db import models
from core.models import Empleado
from django.utils import timezone  # Para obtener la fecha/hora actual


class Sede(models.Model):
    nombre = models.CharField(max_length=100)
    direccion = models.CharField(max_length=255)
    ciudad = models.CharField(max_length=100)
    pais = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre


class SalaReuniones(models.Model):
    nombre = models.CharField(max_length=100)
    capacidad = models.IntegerField()
    sede = models.ForeignKey(Sede, on_delete=models.CASCADE, related_name='salas')

    def __str__(self):
        return f'{self.nombre} en {self.sede.nombre}'

    @property
    def is_ocupada(self):
        """
        Determina si la sala está ocupada en función de las reservas actuales.
        """
        ahora = timezone.now()
        return self.reservas.filter(fecha_inicio__lte=ahora, fecha_fin__gte=ahora).exists()

    class Meta:
        db_table = 'salas_reuniones'


class ReservaSala(models.Model):
    sala = models.ForeignKey(SalaReuniones, on_delete=models.CASCADE, related_name='reservas')
    reservado_por = models.ForeignKey(Empleado, on_delete=models.CASCADE)
    fecha_inicio = models.DateTimeField()
    fecha_fin = models.DateTimeField()
    empleados_asistentes = models.ManyToManyField(Empleado, related_name='reservas_asistentes', blank=True)

    def __str__(self):
        return f'Reserva de {self.sala.nombre} por {self.reservado_por}'

    class Meta:
        db_table = 'reservas_sala'
