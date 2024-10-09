import os
import requests
from django.core.management.base import BaseCommand
from faker import Faker
from core.models import Empleado  # Asegúrate de importar el modelo correctamente
class Command(BaseCommand):
    help = 'Genera datos ficticios para empleados'

    def handle(self, *args, **kwargs):
        fake = Faker()
        empleados = []

        for _ in range(100):  # Cambia este número para generar más o menos empleados
            response = requests.get('https://randomuser.me/api/')
            data = response.json()
                        # Obtener el género y la URL de la foto
            gender = data['results'][0]['gender']
            if gender == 'male':
                photo_url = data['results'][0]['picture']['medium']  # Foto de hombre
                nombre = fake.first_name_male()
            else:
                photo_url = data['results'][0]['picture']['medium']
                nombre = fake.first_name_female()# Foto de mujer
            photo_response = requests.get(photo_url)

            # Generar los nombres para el archivo de imagen
            
            apellido_1 = fake.last_name()
            apellido_2 = fake.last_name()

            # Guardar imagen localmente con el formato nombre_apellido1_apellido_2.jpg
            photo_filename = f'{nombre}_{apellido_1}_{apellido_2}.jpg'
            photo_path = os.path.join('media', 'empleados', photo_filename)

            with open(photo_path, 'wb') as f:
                f.write(photo_response.content)

            empleado = Empleado(
                nombre=nombre,
                apellido_1=apellido_1,
                apellido_2=apellido_2,
                email=fake.unique.email(),
                telefono=fake.phone_number(),
                puesto=fake.job(),
                fecha_contratación=fake.date_between(start_date='-5y', end_date='today'),
                cumpleaños=fake.date_of_birth(minimum_age=18, maximum_age=65),
                is_on_leave=fake.boolean(chance_of_getting_true=20),  # 20% de probabilidad de estar de baja
                foto=f'empleados/{photo_filename}'  # Guardar el path relativo
            )
            empleados.append(empleado)

        # Guardar todos los empleados en la base de datos
        Empleado.objects.bulk_create(empleados)
        self.stdout.write(self.style.SUCCESS(f'Se han generado {len(empleados)} empleados.'))
