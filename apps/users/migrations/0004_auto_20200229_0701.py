# Generated by Django 2.2.2 on 2020-02-29 07:01

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_auto_20200221_1031'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='id_1_sponser',
        ),
        migrations.RemoveField(
            model_name='user',
            name='id_2_child',
        ),
        migrations.RemoveField(
            model_name='user',
            name='reference',
        ),
        migrations.RemoveField(
            model_name='user',
            name='sponser',
        ),
        migrations.AddField(
            model_name='user',
            name='bv_green',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='user',
            name='career_commission2',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='user',
            name='group_commissions2',
            field=models.IntegerField(default=0),
        ),
        migrations.CreateModel(
            name='ViTien',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('bv_point', models.IntegerField(default=0)),
                ('bv_status', models.IntegerField(choices=[(0, 'Đỏ'), (1, 'Xanh')], default=0)),
                ('description', models.CharField(max_length=200, null=True)),
                ('source', models.IntegerField(choices=[(0, 'Không rõ'), (1, 'Từ hợp đồng bảo hiểm nhân thọ'), (2, 'Từ hợp đồng bảo hiểm phi nhân thọ'), (3, 'Từ thưởng hoa hồng đội nhóm'), (4, 'Từ hoa hồng bán lẻ PNT'), (5, 'Từ hoa hồng bán lẻ Nhan Tho'), (6, 'Từ  hoa hồng maketing'), (7, 'Từ hoa hồng tuyển dụng'), (8, 'Từ hoa hồng cấp bậc')], default=0)),
                ('time_active', models.IntegerField(default=10)),
                ('da_chuyen_qua_vi_xanh', models.BooleanField(default=False)),
                ('created_date', models.DateTimeField(auto_now_add=True)),
                ('last_modified', models.DateTimeField(auto_now=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='LogTuyenDung',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('bv_tuyendung', models.IntegerField(default=0)),
                ('id_cua_nguoi_duoc_tuyen', models.IntegerField(default=0)),
                ('created_date', models.DateTimeField(auto_now_add=True)),
                ('last_modified', models.DateTimeField(auto_now=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='LogChuyenTien',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('bv_point', models.IntegerField(default=0)),
                ('created_date', models.DateTimeField(auto_now_add=True)),
                ('last_modified', models.DateTimeField(auto_now=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('vitien', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.ViTien')),
            ],
        ),
    ]
