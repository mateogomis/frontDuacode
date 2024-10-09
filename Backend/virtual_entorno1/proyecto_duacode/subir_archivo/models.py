from django.db import models

class SubirArchivo(models.Model):
    file = models.FileField(upload_to='uploaded_files/')  # Cambia 'uploaded_files/' según tu necesidad
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.file.name
