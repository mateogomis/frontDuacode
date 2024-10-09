from django.contrib import admin
from .models import Proyecto

class ProyectoAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'fecha_inicio', 'fecha_fin')  # Campos a mostrar en la lista
    search_fields = ('nombre',)  # Habilitar búsqueda por nombre
    list_filter = ('fecha_inicio', 'fecha_fin')  # Habilitar filtros por fechas

    # Para mostrar los empleados asignados de manera más legible
    def empleados_asignados(self, obj):
        return ", ".join([empleado.nombre for empleado in obj.empleados.all()])
    empleados_asignados.short_description = 'Empleados Asignados'

    # Agrega empleados_asignados a la lista de display
    list_display = ('nombre', 'fecha_inicio', 'fecha_fin', 'empleados_asignados')

admin.site.register(Proyecto, ProyectoAdmin)