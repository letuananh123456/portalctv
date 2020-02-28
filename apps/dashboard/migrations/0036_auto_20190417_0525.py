# Generated by Django 2.1.7 on 2019-04-17 05:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0035_auto_20190417_0521'),
    ]

    operations = [
        migrations.CreateModel(
            name='Favorite_Product_Benefit',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
        migrations.CreateModel(
            name='FavoriteBenefit',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('name_benefit', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='FavoriteProduct',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('name_product', models.CharField(max_length=200)),
                ('sa', models.IntegerField(default=0)),
                ('policy_term', models.IntegerField(default=0)),
                ('payment_term', models.IntegerField(default=0)),
                ('ways_to_get_benefit', models.CharField(max_length=200)),
                ('created_time', models.DateTimeField(null=True)),
            ],
        ),
        migrations.AddField(
            model_name='favorite_product_benefit',
            name='benefit',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='dashboard.FavoriteBenefit'),
        ),
        migrations.AddField(
            model_name='favorite_product_benefit',
            name='product',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='dashboard.FavoriteProduct'),
        ),
    ]
