from rest_framework import serializers
from .models import Empleado, RolModel
from proyectos.models import Proyecto 

class RolModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = RolModel
        fields = ['id', 'nombre']  # Adjust this field list based on your needs

class ProyectoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proyecto
        fields = ['id', 'nombre', 'descripcion', 'fecha_inicio', 'fecha_fin']

class EmpleadoSerializer(serializers.ModelSerializer):
    proyectos = ProyectoSerializer(many=True, read_only=True)  # Optional relationship
    rol = RolModelSerializer()  # Use the nested serializer for the rol field

    class Meta:
        model = Empleado
        fields = [
            'id',  # Include the id if you need it
            'nombre',
            'apellido_1',
            'apellido_2',
            'email',
            'telefono',
            'puesto',
            'fecha_contratacion',
            'cumpleaños',
            'is_on_leave',
            'foto',
            'proyectos',
            'rol',  # This will now return the role as an object
            'sede',
        ]