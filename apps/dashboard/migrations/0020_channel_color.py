# Generated by Django 2.1.7 on 2019-04-02 11:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0019_channelsuccess_created_time'),
    ]

    operations = [
        migrations.AddField(
            model_name='channel',
            name='color',
            field=models.TextField(default='rgb(66, 134, 244)'),
        ),
    ]
