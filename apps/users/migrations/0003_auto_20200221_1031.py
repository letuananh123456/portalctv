# Generated by Django 2.2.2 on 2020-02-21 10:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_auto_20200220_0758'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='id_1_sponser',
            field=models.IntegerField(default=0, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='id_2_child',
            field=models.IntegerField(default=0, null=True),
        ),
    ]