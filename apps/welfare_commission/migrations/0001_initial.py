# Generated by Django 2.2.2 on 2020-02-20 04:27

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='WelfareCommissions',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status_tourist', models.IntegerField(default=0)),
                ('status_car', models.IntegerField(default=0)),
                ('status_home', models.IntegerField(default=0)),
                ('start_payment', models.DateField()),
                ('end_payment', models.DateField()),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
