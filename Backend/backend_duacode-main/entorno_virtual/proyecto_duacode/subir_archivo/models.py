from django.db import models

class SubirArchivo(models.Model):
    file = models.FileField(upload_to='uploaded_files/')  # Cambia 'uploaded_files/' según tu necesidad
    descripcion = models.TextField(blank=True)  # Campo de descripción opcional
    uploaded_at = models.DateTimeField(auto_now_add=True) #Guardamos cuando se ha subido el fichero

    def __str__(self):
        return self.file.name

    class Meta:
        db_table = 'subir_archivo'  # Especifica el nombre de la tabla

