from django.urls import path
from .views import MapaView

urlpatterns = [
    path('', MapaView.as_view(), name='mapa'),  # Asegúrate de que este es el nombre correcto de la vista
    # otras rutas...
]
