from django.db import models
# Create your models here.

LOAI_PRODUCT = [
    (1, 'Tử kỳ'),
    (2, 'Sức khoẻ'),
    (3, 'Du lịch'),
    (4, 'Ô tô'),
    (5, 'Đầu tư')
]


CONG_TY_BAO_HIEM = [
    (1, 'Bảo Việt'),
    (2, 'Cathay')
]  


TRANG_THAI_THANH_TOAN = [
    (0, 'Chưa thanh toán'),
    (1, 'Đã Thanh Toán'),
    (2, 'Thanh Toán Thất Bại')
]