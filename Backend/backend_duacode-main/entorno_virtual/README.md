Como actualizar el Backend
  Se sustituye la carpeta entorno_virtual por la que habeis descargado y descomprimido.
  Posteriormente eliminar la base de datos esta en entorno_virtual\proyecto_duacode\db.sqlite3
  Eliminar tambien los ficheros en en entorno_virtual\proyecto_duacode\media\generar_empleados
  Ahora desde entorno_virtual\proyecto_duacode ejecutamos:
    python manage.py makemigrations       -> Esto prepara la BBDD
    python manage.py migrate              -> Con esto la creamos
    python manage.py createsuperuser      -> Crear admin de BBDD  ( poder tocar la bbdd desde localhost:8000/admin )
    python manage.py generar_empleados    -> Ejecuta el script que carga datos en la BBDD, fotos,datos de empleados, etc....
    python manage.py runserver            -> Lanza el servidor backend

    !ENJOY!!!!!!!!!!!!!!!!



Como lanzar el servidor backend-django:

   C:\Users\Propietario\Desktop\Duacode\Proyecto Duacode\Backend\entorno_virtual\proyecto_duacode> python manage.py runserver

 Creación de datos en la BBDD ejecutar:
   Ejecuta el script generar_empleados.py entorno_virtual/proyecto_duacode
    "python manage.py generar_empleados"


Notas Panel de administración Django
 acceso : 127.0.0.1:8000/admin
 user y password : propietario/duacode


  
    