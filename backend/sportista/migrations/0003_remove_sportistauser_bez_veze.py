# Generated by Django 4.2.1 on 2023-06-17 19:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('sportista', '0002_sportistauser_bez_veze'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='sportistauser',
            name='bez_veze',
        ),
    ]