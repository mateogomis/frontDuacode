from rest_framework import serializers
from .models import Sede, SalaReuniones, ReservaSala

class SedeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sede
        fields = '__all__'

class SalaReunionesSerializer(serializers.ModelSerializer):
    sede = SedeSerializer(read_only=True)
    sede_id = serializers.PrimaryKeyRelatedField(
        queryset=Sede.objects.all(), source='sede', write_only=True
    )

    class Meta:
        model = SalaReuniones
        fields = ['id', 'nombre', 'capacidad', 'sede', 'sede_id','is_ocupada', ]

class ReservaSalaSerializer(serializers.ModelSerializer):
    sala = SalaReunionesSerializer(read_only=True)
    sala_id = serializers.PrimaryKeyRelatedField(
        queryset=SalaReuniones.objects.all(), source='sala', write_only=True
    )

    class Meta:
        model = ReservaSala
        fields = ['id', 'sala', 'sala_id', 'fecha_inicio', 'fecha_fin', 'reservado_por']
