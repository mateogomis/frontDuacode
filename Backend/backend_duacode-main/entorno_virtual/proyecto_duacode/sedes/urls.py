from rest_framework import routers
from .views import SedeViewSet, SalaReunionesViewSet, ReservaSalaViewSet

router = routers.DefaultRouter()
router.register(r'sedes', SedeViewSet)
router.register(r'salas', SalaReunionesViewSet)
router.register(r'reservas', ReservaSalaViewSet)

urlpatterns = router.urls
