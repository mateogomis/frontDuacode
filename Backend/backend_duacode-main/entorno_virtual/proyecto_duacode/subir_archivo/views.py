from django.shortcuts import render, redirect
from .forms import FileUploadForm
from .models import SubirArchivo

def upload_file(request):
    if request.method == 'POST':
        form = FileUploadForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()  # Esto guardará tanto el archivo como la descripción
            return redirect('upload_file')  # Redirige a la misma página después de subir
    else:
        form = FileUploadForm()

    files = SubirArchivo.objects.all()  # Obtener todos los archivos subidos
    return render(request, 'file_upload/upload.html', {'form': form, 'files': files})
