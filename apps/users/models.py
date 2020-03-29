from django.db import models

from django.contrib.auth.models import AbstractUser
import binascii
import os
from django.db import models
from django.utils.translation import gettext_lazy as _
# Create your models here.

TOKEN_LENGTH = 64
RESET_TOKEN_LENGTH = 10
CONFIRM_EMAIL_TOKEN_LENGTH = 128


# this function generate access token  
def generate_access_token(user_id):
    num_bytes = TOKEN_LENGTH // 2
    token = binascii.hexlify(os.urandom(num_bytes)).decode()
    access_token = '{user_id}:{token}'.format(
        user_id=user_id,
        token=token,
    )
    return access_token


# Create your models here.

class User(AbstractUser):
    """
    Hệ thống tree cây có note gôc bắt đầu id từ 1s
    , unique=True
    level:
    1: CTV
    2: Chuyên Viên 
    3: Chuyên viên cấp cao
    4: Trưởng phòng
    5: Trưởng phòng cấp cao
    6: Giám đốc 
    7: Giám đốc cấp cao 
    8: giám đốc khu vực
    9: Giám đốc miền
    10: Bàn tròn triệu phú
    """

    fullname = models.CharField(max_length=200, default=None, null=True)
    birth_day = models.IntegerField(default=0)
    birth_month = models.IntegerField(default=0)
    birth_year = models.IntegerField(default=0)
    gioi_tinh = models.IntegerField(default=0)
    email = models.CharField(max_length=200, default=None, null=True)
    dia_chi_tinh_thanh_pho = models.CharField(max_length=200, default=None, null=True)
    dia_chi_quan_huyen = models.CharField(max_length=200, default=None, null=True)
    dia_chi_chi_tiet = models.CharField(max_length=200, default=None, null=True)
    so_cmnd = models.CharField(max_length=200, default=None, null=True)
    cmt_ngay_cap = models.DateField(null=True)
    cmt_noi_cap = models.CharField(max_length=200, default=None, null=True)
    tax_number = models.CharField(max_length=200, blank=True)
    tax_address = models.CharField(max_length=200, null=True)
    level = models.IntegerField(default=0) #level là cộng tác viên, trưởng phòng, ...
    personal_points = models.IntegerField(default=0)
    position = models.IntegerField(default=0) # default 0 la trai , 1 la phai
    reference = models.IntegerField(default=None, null=True) # code Nguoi do dau
    sponser = models.IntegerField(default=None, null=True) # code Nguoi gioi thieu
    status_id = models.IntegerField(default=0)
    retail_commission = models.BigIntegerField(default=0)
    recruitment_commission = models.BigIntegerField(default=0)
    mutual_commissions = models.BigIntegerField(default=0)
    group_commissions = models.BigIntegerField(default=0)
    group_commissions2 = models.BigIntegerField(default=0)
    career_commission = models.BigIntegerField(default=0)
    career_commission2 = models.BigIntegerField(default=0)
    welfare_commission = models.BigIntegerField(default=0)
    policy_commission = models.BigIntegerField(default=0)
    bv_green = models.BigIntegerField(default=0)
    id_1_sponser = models.IntegerField(default=0, null=True)# nhanh nguoi gioi thieu
    id_2_child = models.IntegerField(default=0, null=True)# nhanh tu tuyen ra
    images_cmt_mattruoc = models.ImageField(upload_to = 'images_cmt_mattruoc', null=True, default=None)
    images_cmt_matsau = models.ImageField(upload_to = 'images_cmt_matsau', null=True, default=None)
    images_cmt_selfie_cong_cmnd = models.ImageField(upload_to = 'images_cmt_selfie_cong_cmnd', null=True, default=None)
    images_cmt_the_ca_nhan = models.ImageField(upload_to = 'images_cmt_the_ca_nhan', null=True, default=None)
    images_hopdongctv = models.ImageField(upload_to = 'images_hopdongctv', null=True, default=None)
    is_hopdong_congtacvien = models.BooleanField(default=False) # Da ky hop dong cong tac vien hay chua
    resend_hopdongCTV = models.BooleanField(default=False)
    is_KYC = models.BooleanField(default=False) # da xac minh tai khoan chua 
    resend_KYC = models.BooleanField(default=False) # yeu cau gui lai anh xac minh lai
    is_actif = models.BooleanField(default=False) # co con hoat dong nua khong, co vi pham chinh sach cua cong ty khong, xanh là actif, vàng là actif nhưng chưa gửi hợp đồng CTV chữ ký tay, đỏ là chưa actif vi phạm chính sách công ty hoặc chưa KYC
    link_info = models.CharField(default=None, max_length=255, null=True) # link tuyen dung cua chinh user
    code_info = models.CharField(default=None, max_length=255, null=True) # ma code tuyen dung cua user
    created_at = models.DateTimeField(auto_now_add=True, null=True)


    def __str__(self):
        return self.username


class LoginHistory(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    start_date = models.DateField(auto_now_add=True)
    end_date = models.DateField(auto_now=True)
    num_date = models.IntegerField(default=1)

    class Meta:
        db_table = 'login_history'


class Token(models.Model):
    """
    The default authorization token model.
    """
    key = models.CharField(_("Key"), max_length=128, primary_key=True)
    user = models.ForeignKey(
        User, related_name='tokens',
        on_delete=models.CASCADE, verbose_name=_("User")
    )
    created = models.DateTimeField(_("Created"), auto_now_add=True)

    class Meta:
        db_table = 'token'

    def __str__(self):
        return 'Token (user {}): {}'.format(self.user_id, self.key)


class ViTien(models.Model):
    BV_STATUS = [
        (0, 'Đỏ'),
        (1, 'Xanh')
    ]

    NGUON_TIEN = [
        (0, 'Không rõ'),
        (1, 'Từ hợp đồng bảo hiểm nhân thọ'),
        (2, 'Từ hợp đồng bảo hiểm phi nhân thọ'),
        (3, 'Từ thưởng hoa hồng đội nhóm'),
        (4, 'Từ hoa hồng bán lẻ PNT'),
        (5, 'Từ hoa hồng bán lẻ Nhan Tho'),
        (6, 'Từ  hoa hồng maketing'),
        (7, 'Từ hoa hồng tuyển dụng'),
        (8, 'Từ hoa hồng cấp bậc')
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    bv_point = models.IntegerField(default=0)
    bv_status = models.IntegerField(default=0, choices=BV_STATUS)
    description = models.CharField(max_length=200, null=True)
    source = models.IntegerField(default=0, choices=NGUON_TIEN)
    time_active = models.IntegerField(default=10)
    da_chuyen_qua_vi_xanh = models.BooleanField(default=False)
    created_date = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)


class LogChuyenTien(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    vitien = models.ForeignKey(ViTien, on_delete=models.CASCADE)
    bv_point = models.IntegerField(default=0)
    created_date = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)


class LogTuyenDung(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    bv_tuyendung = models.IntegerField(default=0)
    id_cua_nguoi_duoc_tuyen = models.IntegerField(default=0)
    created_date = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True) 