from django.db import models
from apps.core.models import NguoiMuaBaoHiem

# from apps.core.utils import convert_price_to_string
# Create your models here.

"""
loai_hinh_bao_hiem
1 - Sản phẩm tử kỳ
2 - Sản phẩm đầu tư
3 - Sản phẩm tích luỹ
4 - Sản phẩm giáo dục
5 - Sản phẩm hưu trí
6 - BH sức khoẻ cá nhân
7 - BH sức khoẻ doanh nghiệp
8 - BH tai nạn cá nhân
9 - BH trợ cấp y tế, nằm viện
10 - BH bệnh hiểm nghèo
11 - BH bệnh ung thư
12 - BH vật chất xe
13 - BH TNDS bắt buộc
14 - BH TNDS tự nguyện 
15 - BH TNDS xe máy 
16 - BH du lịch Việt Nam
17 - BH du lịch quốc tế
18 - BH trễ chuyến bay 
19 - BH nhà tư nhân
20 - BH màn hình điện thoại 
cong_ty
1 - BH VBI
2 - BH Fubon
goi_san_pham
Điều kiện: BH sức khoẻ cá nhân/BH VBI:
1 - Gói đồng
2 - Gói bạc 
3 - Gói titan
4 - Gói vàng 
5 - Gói bạch kim
6 - Gói kim cương
goi_san_pham_phu
Điều kiện: BH sức khoẻ cá nhân/BH VBI:
1 - Điều trị ngoại trú
2 - Nha khoa
3 - Thai sản 
4 - Trợ cấp nằm viện do tai nạn
loai_thanh_toan
1 - CoD
2- Vnpay
tinh_trang_thanh_toan_cong_thanh_toan
0 - chưa thanh toán
1 - đã thanh toán
2 - thanh toán thất bại
Gioi tinh
nu = 0
    nam = 1
    gioi_tinh_choices = {
        (nu, 'Nữ'),
        (nam, 'Nam'),

    }
Quan he voi ben mua bao hiem
s = 0
    ban = 1
    vo_chong = 2
    con_trai = 3
    con_gai = 4
    anh_chi_em_ruot = 5
    cha = 6
    me = 7
    chavo_chachong = 8
    mevo_mechong = 9
    ong = 10
    ba = 11
    quan_he_ben_mua_BH_choices = {
        (s, 'Chọn quan hệ bên mua bảo hiểm cho ai?'),
        (ban, 'Mua cho bạn'),
        (vo_chong, 'Mua cho Vợ/Chồng'),
        (con_trai, 'Mua cho con trai'),
        (con_gai, 'Mua cho con gái'),
        (anh_chi_em_ruot, 'Mua cho anh/chị em ruột'),
        (cha, 'Mua cho cha'),
        (me, 'Mua cho mẹ'),
        (chavo_chachong, 'Mua cho Cha vợ/Cha chồng'),
        (mevo_mechong, 'Mua cho Mẹ vợ/Mẹ chồng'),
        (ong, 'Mua cho ông'),
        (ba, 'Mua cho bà'),
    }
    Thong tin san pham bo sung
        c = 0
    dieu_tri_ngoai_tru = 1
    nha_khoa = 2
    thai_san = 3
    tro_cap_nam_vien_do_tai_nan = 4
    san_pham_bo_sung_choices = {
        (c, 'Chọn gói sản phẩm'),
        (dieu_tri_ngoai_tru, 'Điều trị ngoại trú'),
        (nha_khoa, 'Nha khoa'),
        (thai_san, 'Thai sản'),
        (tro_cap_nam_vien_do_tai_nan, 'Trợ cấp nằm viện do tai nạn'),
    }


"""


class DonDatHang(models.Model):
    loai_hinh_bao_hiem = models.IntegerField(default=0)
    cong_ty = models.IntegerField(default=0)
    goi_san_pham = models.IntegerField(default=0)
    goi_san_pham_phu = models.TextField(default=None, null=True)
    so_phi_chinh = models.BigIntegerField(default=0)
    so_phi_phu = models.BigIntegerField(default=0)
    so_phi_VAT = models.BigIntegerField(default=0)
    tong_phi_thanh_toan = models.BigIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    loai_thanh_toan = models.IntegerField(default=0)
    ma_don_hang_bihama = models.CharField(max_length=255, unique=True)
    ma_hop_dong = models.CharField(default=None, max_length=255, null=True)
    link_giay_chung_nhan = models.CharField(default=None, max_length=255, null=True)
    tinh_trang_don_dat_hang = models.IntegerField(default=0) # dùng để binding ra mà hình quản lý đơn hàng
    nguoimuabaohiem = models.ForeignKey(NguoiMuaBaoHiem, on_delete=models.CASCADE)
    


    def __str__(self):
        return str(self.id)

    class Meta:
        verbose_name = 'Đơn đặt hàng '
        verbose_name_plural = 'Đơn đặt hàng'