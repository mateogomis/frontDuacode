from django.shortcuts import render
from rest_framework import viewsets
from .models import Empleado
from .serializers import EmpleadoSerializer
# from proyectos.serializers import ProyectoSerializer

# Create your views here.
# core/views.py

class EmpleadoViewset(viewsets.ModelViewSet):
    queryset = Empleado.objects.all() 
    serializer_class = EmpleadoSerializer