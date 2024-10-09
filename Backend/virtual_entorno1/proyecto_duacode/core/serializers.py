from rest_framework import serializers
from .models import Empleado
from proyectos.models import Proyecto 

class ProyectoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proyecto
        fields = ['id', 'nombre', 'descripcion', 'fecha_inicio', 'fecha_fin']

class EmpleadoSerializer(serializers.ModelSerializer):
    proyectos = ProyectoSerializer(many=True, read_only=True)  # Relación opcional

    class Meta:
        model = Empleado
        fields = ['id', 'nombre', 'apellido_1', 'apellido_2', 'email', 'telefono', 'puesto', 'proyectos','foto','cumpleaños','fecha_contratación']
