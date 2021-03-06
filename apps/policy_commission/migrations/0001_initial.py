# Generated by Django 2.2.2 on 2020-02-29 07:39

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('convert_product', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Policy_Commissions',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('total_policy', models.IntegerField(default=0)),
                ('name_product', models.CharField(max_length=200)),
                ('premium_payment', models.IntegerField(default=0)),
                ('start_payment', models.DateField()),
                ('end_payment', models.DateField()),
                ('convert_product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='convert_product.ConvertProduct')),
            ],
        ),
    ]
