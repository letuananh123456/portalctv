# Generated by Django 2.1.7 on 2019-03-29 10:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0008_auto_20190329_1013'),
    ]

    operations = [
        migrations.CreateModel(
            name='Channel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('distribution_channel', models.IntegerField(default=0)),
                ('name_chanel', models.CharField(max_length=200)),
            ],
        ),
    ]