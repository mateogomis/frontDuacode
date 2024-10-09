# proyectos/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProyectoViewSet

router = DefaultRouter()
router.register(r'', ProyectoViewSet)  # Registra el prefijo "proyectos" solo una vez

urlpatterns = [
    path('', include(router.urls)),  # Esto evitará la duplicación de "proyectos"
]


