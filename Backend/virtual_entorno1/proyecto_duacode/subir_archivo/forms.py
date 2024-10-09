from django import forms
from .models import SubirArchivo

class FileUploadForm(forms.ModelForm):
    class Meta:
        model = SubirArchivo
        fields = ['file']