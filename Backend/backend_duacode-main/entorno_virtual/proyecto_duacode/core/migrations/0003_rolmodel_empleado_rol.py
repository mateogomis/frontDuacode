# Generated by Django 5.1.1 on 2024-10-04 07:32

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_rename_photo_empleado_foto'),
    ]

    operations = [
        migrations.CreateModel(
            name='RolModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(choices=[('CEO', 'CEO'), ('CTO', 'CTO'), ('CFO', 'CFO'), ('LÍDER_DESARROLLO', 'Líder de Equipo de Desarrollo'), ('INGENIERO_FRONTEND', 'Ingeniero de Frontend'), ('INGENIERO_BACKEND', 'Ingeniero de Backend'), ('LÍDER_QA', 'Líder de QA'), ('INGENIERO_QA', 'Ingeniero de QA'), ('GERENTE_PROYECTO', 'Gerente de Proyecto'), ('COORDINADOR_PROYECTO', 'Coordinador de Proyecto'), ('GERENTE_PRODUCTO', 'Gerente de Producto'), ('PROPIETARIO_PRODUCTO', 'Propietario de Producto'), ('GERENTE_MARKETING', 'Gerente de Marketing'), ('ESPECIALISTA_MARKETING', 'Especialista en Marketing Digital'), ('GERENTE_VENTAS', 'Gerente de Ventas'), ('REPRESENTANTE_VENTAS', 'Representante de Ventas'), ('GERENTE_SOPORTE', 'Gerente de Soporte'), ('ESPECIALISTA_SOPORTE', 'Especialista en Soporte al Cliente')], max_length=50)),
            ],
        ),
        migrations.AddField(
            model_name='empleado',
            name='rol',
            field=models.ForeignKey(default=5, on_delete=django.db.models.deletion.CASCADE, to='core.rolmodel'),
        ),
    ]
