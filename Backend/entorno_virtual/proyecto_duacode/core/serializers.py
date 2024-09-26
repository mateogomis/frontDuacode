# core/serializers.py
from rest_framework import serializers
from .models import Empleado


#Creamos un serializador que nos permita convertir Empleado a JSON y viceversa
class Serializador_Empleado(serializers.ModelSerializer):
    class Meta:
        model = Empleado
        fields = '__all__'  # Incluye todos los campos del modelo
