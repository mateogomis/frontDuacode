# core/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EmpleadoViewset

router = DefaultRouter()
router.register(r'empleados', EmpleadoViewset)  # Genera rutas como /api/empleados/

urlpatterns = [
    path('', include(router.urls)),
]

