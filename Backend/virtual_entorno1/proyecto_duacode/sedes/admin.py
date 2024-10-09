# admin.py en la aplicación 'sedes'

from django.contrib import admin
from .models import Sede, SalaReuniones, ReservaSala

@admin.register(Sede)
class SedeAdmin(admin.ModelAdmin):
    list_display = ('id', 'nombre', 'direccion')  # Campos a mostrar en la lista
    search_fields = ('nombre',)  # Campo por el que se puede buscar

@admin.register(SalaReuniones)
class SalaReunionesAdmin(admin.ModelAdmin):
    list_display = ('id', 'nombre', 'capacidad', 'sede')  # Campos a mostrar en la lista
    search_fields = ('nombre', 'sede__nombre')  # Busca por nombre de sala o sede

@admin.register(ReservaSala)
class ReservaSalaAdmin(admin.ModelAdmin):
    list_display = ('id', 'sala', 'fecha_inicio', 'fecha_fin', 'reservado_por')  # Campos a mostrar
    list_filter = ('sala', 'fecha_inicio')  # Filtros en el panel
    search_fields = ('sala__nombre', 'reservado_por__nombre')  # Busca por sala o empleado
