from django.db import models

# Create your models here.
class Empleado(models.Model): #Empleado hereda de models.Model
    nombre = models.CharField(max_length=50)  #Nombre
    apellido_1 = models.CharField(max_length=50)  #Primer Apellido
    apellido_2 = models.CharField(max_length=50)  #2do Apellido
    email = models.EmailField(unique= True) # Correo electrónico , este campo será único
    telefono = models.CharField(max_length=15, blank=True, null=True)  # Teléfono
    puesto = models.CharField(max_length=100)          # Puesto de trabajo
    fecha_contratación = models.DateField()                       # Fecha de contratación
    cumpleaños = models.DateField()                   # Fecha de nacimiento
    is_on_leave = models.BooleanField(default=False)     # Indicador de si está de baja/vacaciones
    foto = models.ImageField(upload_to='empleados/', blank=True, null=True)  # Foto del empleado

    def __str__(self):
        #Así nos mostrara en el panel de Admon con el formato : "Nombre Apellido Apellido"
        return f'{self.nombre} {self.apellido_1} {self.apellido_2}'
    

    
    
