from django.views.generic import TemplateView

class MapaView(TemplateView):
    template_name = 'mapa.html'  # Asegúrate de que este archivo HTML existe en la carpeta de plantillas
