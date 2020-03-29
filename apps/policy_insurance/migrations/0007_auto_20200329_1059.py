# Generated by Django 2.2.2 on 2020-03-29 10:59

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('policy_insurance', '0006_auto_20200222_0918'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='lifeproduct',
            name='company',
        ),
        migrations.RemoveField(
            model_name='lifeproduct',
            name='status_payment',
        ),
        migrations.AddField(
            model_name='lifeproduct',
            name='userid_mua',
            field=models.CharField(default=django.utils.timezone.now, max_length=200),
            preserve_default=False,
        ),
    ]