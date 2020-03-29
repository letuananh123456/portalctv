# Generated by Django 2.2.2 on 2020-03-29 10:59

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('core', '0002_delete_user'),
    ]

    operations = [
        migrations.CreateModel(
            name='District',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('parent_code', models.IntegerField(default=0)),
            ],
            options={
                'verbose_name': 'Quận huyện ',
                'verbose_name_plural': 'Quận huyện',
            },
        ),
        migrations.CreateModel(
            name='Provincial',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('code', models.IntegerField(default=0)),
            ],
            options={
                'verbose_name': 'Tỉnh thành phố ',
                'verbose_name_plural': 'Tỉnh thành phố',
            },
        ),
        migrations.CreateModel(
            name='NguoiMuaBaoHiem',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ho_ten', models.CharField(max_length=255, null=True)),
                ('so_dien_thoai', models.CharField(max_length=255, null=True)),
                ('birth_day', models.IntegerField(default=0)),
                ('birth_month', models.IntegerField(default=0)),
                ('birth_year', models.IntegerField(default=0)),
                ('gioi_tinh', models.IntegerField(default=0)),
                ('email', models.CharField(max_length=255, null=True)),
                ('dia_chi_tinh_thanh_pho', models.CharField(max_length=255, null=True)),
                ('dia_chi_quan_huyen', models.CharField(max_length=255, null=True)),
                ('dia_chi_chi_tiet', models.CharField(max_length=255, null=True)),
                ('so_cmnd', models.CharField(max_length=255, null=True)),
                ('images_cmt_mattruoc', models.ImageField(default=None, null=True, upload_to='images_cmt_mattruoc')),
                ('images_cmt_matsau', models.ImageField(default=None, null=True, upload_to='images_cmt_matsau')),
                ('cmt_ngay_cap', models.DateField(null=True)),
                ('cmt_noi_cap', models.CharField(max_length=255, null=True)),
                ('ngay_hieu_luc', models.DateField(null=True)),
                ('ngay_ket_thuc', models.DateField(null=True)),
                ('ho_ten_nhan', models.CharField(max_length=255, null=True)),
                ('email_nhan', models.CharField(max_length=255, null=True)),
                ('so_dien_thoai_nhan', models.CharField(max_length=255, null=True)),
                ('dia_chi_tinh_thanh_pho_nhan', models.CharField(max_length=255, null=True)),
                ('dia_chi_quan_huyen_nhan', models.CharField(max_length=255, null=True)),
                ('dia_chi_chi_tiet_nhan', models.CharField(max_length=255, null=True)),
                ('status_marriage', models.IntegerField(default=0)),
                ('job', models.IntegerField(default=0)),
                ('weight', models.IntegerField(default=0)),
                ('height', models.IntegerField(default=0)),
                ('nationality', models.IntegerField(default=0)),
                ('nationality_paper', models.IntegerField(default=0)),
                ('register_ctv', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now_add=True, null=True)),
                ('code_invite', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Người mua bảo hiểm',
                'verbose_name_plural': 'Người mua bảo hiểm',
            },
        ),
    ]
