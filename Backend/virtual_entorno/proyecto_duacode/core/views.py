from django.shortcuts import render
from rest_framework import viewsets
from .models import Empleado
from .serializers import Serializador_Empleado

# Create your views here.
# core/views.py

class Mostrar_Empleado(viewsets.ModelViewSet):
    queryset = Empleado.objects.all() 
    serializer_class = Serializador_Empleado