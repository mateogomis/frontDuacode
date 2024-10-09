from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import Proyecto
from .serializers import ProyectoSerializer

class ProyectoViewSet(viewsets.ModelViewSet):
    queryset = Proyecto.objects.all()
    serializer_class = ProyectoSerializer