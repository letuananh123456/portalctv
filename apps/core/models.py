from django.db import models
from apps.users.models import User

# Create your models here.

class NguoiMuaBaoHiem(models.Model):
    code_invite = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    ho_ten = models.CharField(max_length=255, null=True)
    so_dien_thoai = models.CharField(max_length=255, null=True)
    birth_day = models.IntegerField(default=0)
    birth_month = models.IntegerField(default=0)
    birth_year = models.IntegerField(default=0)
    gioi_tinh = models.IntegerField(default=0)
    email = models.CharField(max_length=255, null=True)
    dia_chi_tinh_thanh_pho = models.CharField(max_length=255, null=True)
    dia_chi_quan_huyen = models.CharField(max_length=255, null=True)
    dia_chi_chi_tiet = models.CharField(max_length=255, null=True)
    so_cmnd = models.CharField(max_length=255, null=True)
    images_cmt_mattruoc = models.ImageField(upload_to = 'images_cmt_mattruoc', null=True, default=None)
    images_cmt_matsau = models.ImageField(upload_to = 'images_cmt_matsau', null=True, default=None)
    cmt_ngay_cap = models.DateField(null=True)
    cmt_noi_cap = models.CharField(max_length=255, null=True)
    ngay_hieu_luc = models.DateField(null=True)
    ngay_ket_thuc = models.DateField(null=True)
    ho_ten_nhan = models.CharField(max_length=255, null=True)
    email_nhan = models.CharField(max_length=255, null=True)
    so_dien_thoai_nhan = models.CharField(max_length=255, null=True)
    dia_chi_tinh_thanh_pho_nhan = models.CharField(max_length=255, null=True)
    dia_chi_quan_huyen_nhan = models.CharField(max_length=255, null=True)
    dia_chi_chi_tiet_nhan = models.CharField(max_length=255, null=True)
    status_marriage = models.IntegerField(default=0)
    job = models.IntegerField(default=0)
    weight = models.IntegerField(default=0)
    height = models.IntegerField(default=0)
    nationality = models.IntegerField(default=0)
    nationality_paper = models.IntegerField(default=0)
    register_ctv = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True, null=True)

    def __str__(self):
        return str(self.ho_ten)

    class Meta:
        verbose_name = 'Người mua bảo hiểm'
        verbose_name_plural = 'Người mua bảo hiểm'


class Provincial(models.Model):

    name = models.CharField(max_length=255)
    code = models.IntegerField(default=0)

    def __str__(self):
        return str(self.name)

    class Meta:
        verbose_name = 'Tỉnh thành phố '
        verbose_name_plural = 'Tỉnh thành phố'


class District(models.Model):
    name = models.CharField(max_length=255)
    parent_code = models.IntegerField(default=0)  


    def __str__(self):
        return str(self.name)

    class Meta:
        verbose_name = 'Quận huyện '
        verbose_name_plural = 'Quận huyện'

