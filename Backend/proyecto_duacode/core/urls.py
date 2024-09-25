# core/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import Mostrar_Empleado

router = DefaultRouter()
router.register(r'empleados', Mostrar_Empleado)  # Genera rutas como /api/empleados/

urlpatterns = [
    path('', include(router.urls)),
]
