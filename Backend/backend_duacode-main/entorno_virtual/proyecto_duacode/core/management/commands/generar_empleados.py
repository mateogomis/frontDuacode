import os
import requests
import random
from django.core.management.base import BaseCommand
from faker import Faker
from core.models import Empleado, RolModel  # Importar RolModel
from proyectos.models import Proyecto
from sedes.models import Sede, SalaReuniones, ReservaSala
from django.utils import timezone
from datetime import timedelta

class Command(BaseCommand):
    help = 'Genera datos ficticios para empleados, proyectos, sedes, salas y reuniones'

    def handle(self, *args, **kwargs):
        fake = Faker()
        empleados = []
        proyectos = []
        sedes_objs = []
        salas_objs = []

        # Definir roles y verificar si ya existen
        rol_nombres = [
            'CEO', 'CTO', 'CFO', 'Líder de Equipo de Desarrollo',
            'Ingeniero de Frontend', 'Ingeniero de Backend', 'Líder de QA',
            'Ingeniero de QA', 'Gerente de Proyecto', 'Coordinador de Proyecto',
            'Gerente de Producto', 'Propietario de Producto', 'Gerente de Marketing',
            'Especialista en Marketing Digital', 'Gerente de Ventas', 
            'Representante de Ventas', 'Gerente de Soporte', 
            'Especialista en Soporte al Cliente'
        ]

        roles = []
        for nombre in rol_nombres:
            rol, created = RolModel.objects.get_or_create(nombre=nombre)
            roles.append(rol)

        self.stdout.write(self.style.SUCCESS(f'Se han generado {len(roles)} roles.'))

        # Generar sedes
        sedes = ['Sede Principal', 'Sede Secundaria', 'Sede Internacional']

        for nombre_sede in sedes:
            sede = Sede.objects.create(
                nombre=nombre_sede,
                direccion=f'Calle {random.randint(1, 100)}',
                ciudad='Ciudad ' + nombre_sede,
                pais='País ' + nombre_sede
            )
            sedes_objs.append(sede)

        self.stdout.write(self.style.SUCCESS(f'Se han generado {len(sedes_objs)} sedes.'))

        # Generar empleados
        for _ in range(30):  # Cambia este número para generar más o menos empleados
            response = requests.get('https://randomuser.me/api/')
            data = response.json()

            # Obtener el género y la URL de la foto
            gender = data['results'][0]['gender']
            if gender == 'male':
                nombre = fake.first_name_male()
            else:
                nombre = fake.first_name_female()

            photo_url = data['results'][0]['picture']['medium']
            photo_response = requests.get(photo_url)

            # Generar los nombres para el archivo de imagen
            apellido_1 = fake.last_name()
            apellido_2 = fake.last_name()

            # Guardar imagen localmente con el formato nombre_apellido1_apellido_2.jpg
            photo_filename = f'{nombre}_{apellido_1}_{apellido_2}.jpg'
            photo_path = os.path.join('media', 'empleados', photo_filename)

            with open(photo_path, 'wb') as f:
                f.write(photo_response.content)

            # Asignar un rol aleatorio y una sede aleatoria a cada empleado
            rol_aleatorio = random.choice(roles)
            sede_aleatoria = random.choice(sedes_objs)  # Asignar una sede aleatoria

            empleado = Empleado(
                nombre=nombre,
                apellido_1=apellido_1,
                apellido_2=apellido_2,
                email=fake.unique.email(),
                telefono=fake.phone_number(),
                fecha_contratacion=fake.date_between(start_date='-5y', end_date='today'),
                cumpleaños=fake.date_of_birth(minimum_age=18, maximum_age=65),
                is_on_leave=fake.boolean(chance_of_getting_true=20),  # 20% de probabilidad de estar de baja
                foto=f'empleados/{photo_filename}',  # Guardar el path relativo
                rol=rol_aleatorio,  # Asignar el rol aleatorio
                sede=sede_aleatoria  # Asignar la sede aleatoria
            )

            # Guardar el empleado en la base de datos
            empleado.save()

        self.stdout.write(self.style.SUCCESS(f'Se han generado {Empleado.objects.count()} empleados.'))

        # Generar proyectos
        for _ in range(10):  # Cambia este número para generar más o menos proyectos
            proyecto = Proyecto(
                nombre=fake.company(),
                descripcion=fake.paragraph(),
                fecha_inicio=fake.date_between(start_date='-2y', end_date='today'),
                fecha_fin=fake.date_between(start_date='today', end_date='+1y') if random.choice([True, False]) else None
            )
            proyectos.append(proyecto)

        # Guardar todos los proyectos en la base de datos
        Proyecto.objects.bulk_create(proyectos)
        self.stdout.write(self.style.SUCCESS(f'Se han generado {len(proyectos)} proyectos.'))

        # Asignar empleados a proyectos (ManyToMany)
        for proyecto in proyectos:
            num_empleados = random.randint(1, 10)  # Elegir un número aleatorio de empleados
            proyecto.empleados.set(random.sample(list(Empleado.objects.all()), num_empleados))  # Asignar empleados al proyecto

        self.stdout.write(self.style.SUCCESS('Se han asignado empleados a los proyectos.'))

        # Generar salas de reuniones en cada sede
        nombres_salas = ['Sala 1', 'Sala 2', 'Sala 3']

        for sede in sedes_objs:
            for nombre_sala in nombres_salas:
                sala = SalaReuniones.objects.create(
                    nombre=nombre_sala,
                    capacidad=random.randint(5, 20),
                    sede=sede
                )
                salas_objs.append(sala)

        self.stdout.write(self.style.SUCCESS(f'Se han generado {len(salas_objs)} salas de reuniones.'))

        # Generar reservas de salas vinculadas a empleados
        for _ in range(10):  # Generar 10 reuniones aleatorias
            sala_aleatoria = random.choice(salas_objs)
            fecha_inicio = timezone.now() + timedelta(days=random.randint(1, 30), hours=random.randint(8, 18))
            fecha_fin = fecha_inicio + timedelta(hours=2)

            # Seleccionar empleados aleatorios para asistir a la reunión
            asistentes = random.sample(list(Empleado.objects.all()), random.randint(2, 5))

            # Seleccionar un empleado aleatorio para hacer la reserva
            empleado_reservador = random.choice(Empleado.objects.all())

            # Crear la reserva
            reserva = ReservaSala.objects.create(
                sala=sala_aleatoria,
                fecha_inicio=fecha_inicio,
                fecha_fin=fecha_fin,
                reservado_por=empleado_reservador  # Guardar el empleado que hace la reserva
            )

            # Relacionar empleados con la reunión
            reserva.empleados_asistentes.set(asistentes)  # Relación ManyToMany
            reserva.save()

        self.stdout.write(self.style.SUCCESS('Se han generado las reservas de las salas de reuniones correctamente.'))

