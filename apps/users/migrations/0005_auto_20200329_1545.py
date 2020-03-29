# Generated by Django 2.2.2 on 2020-03-29 15:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0004_auto_20200329_1059'),
    ]

    operations = [
        migrations.RenameField(
            model_name='user',
            old_name='sex',
            new_name='birth_day',
        ),
        migrations.RenameField(
            model_name='user',
            old_name='cmnd_date',
            new_name='cmt_ngay_cap',
        ),
        migrations.RenameField(
            model_name='user',
            old_name='cmnd_number',
            new_name='cmt_noi_cap',
        ),
        migrations.RemoveField(
            model_name='user',
            name='address',
        ),
        migrations.RemoveField(
            model_name='user',
            name='city',
        ),
        migrations.RemoveField(
            model_name='user',
            name='cmnd_address',
        ),
        migrations.RemoveField(
            model_name='user',
            name='datecreate',
        ),
        migrations.RemoveField(
            model_name='user',
            name='dob',
        ),
        migrations.AddField(
            model_name='user',
            name='birth_month',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='user',
            name='birth_year',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='user',
            name='dia_chi_chi_tiet',
            field=models.CharField(default=None, max_length=200, null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='dia_chi_quan_huyen',
            field=models.CharField(default=None, max_length=200, null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='dia_chi_tinh_thanh_pho',
            field=models.CharField(default=None, max_length=200, null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='gioi_tinh',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='user',
            name='so_cmnd',
            field=models.CharField(default=None, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='bv_green',
            field=models.BigIntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='user',
            name='career_commission',
            field=models.BigIntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='user',
            name='career_commission2',
            field=models.BigIntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='user',
            name='email',
            field=models.CharField(default=None, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='fullname',
            field=models.CharField(default=None, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='group_commissions',
            field=models.BigIntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='user',
            name='group_commissions2',
            field=models.BigIntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='user',
            name='mutual_commissions',
            field=models.BigIntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='user',
            name='policy_commission',
            field=models.BigIntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='user',
            name='recruitment_commission',
            field=models.BigIntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='user',
            name='retail_commission',
            field=models.BigIntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='user',
            name='welfare_commission',
            field=models.BigIntegerField(default=0),
        ),
    ]