from django.db import models
from apps.users.models import User
from apps.core.models import CONG_TY_BAO_HIEM, TRANG_THAI_THANH_TOAN
from apps.convert_product.models import ConvertProduct
# Create your models here.


# bảng lưu danh sách hợp đồng
class LifeProduct(models.Model):
    ACK_STATUS = [
        (0, 'Chưa ACK'),
        (1, 'Đã ACK')
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE) #sponser
    userid_mua = models.CharField(max_length=200) #user id mua
    fullname = models.CharField(max_length=200)
    number_YCBH = models.CharField(max_length=200)
    number_policy = models.CharField(max_length=200)
    company = models.IntegerField(choices=CONG_TY_BAO_HIEM) 
    name_product = models.CharField(max_length=200)
    type_product = models.ForeignKey(ConvertProduct, default=None, null=True, on_delete=models.SET_NULL)
    sumit_date = models.DateField()
    release_date = models.DateField()
    ack_date = models.DateField()
    ack_status = models.IntegerField(default=0,choices=ACK_STATUS) # trạng thái ack
    status_policy = models.IntegerField(default=0)
    premium = models.IntegerField(default=0) # số tiền của hợp đồng
    bv_premium = models.IntegerField(default=0)
    status_payment = models.IntegerField(default=0, choices=TRANG_THAI_THANH_TOAN)
    certificate = models.FileField(upload_to='uploads/', null=True, default=None)
    is_rewarded = models.BooleanField(default=False) #  biến check xem tính thưởng chưa
    created_date = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)

    @property
    def convert_bv(self):
        if self.type_product is None:
            return 'Đang tính'
        bv_value = int((self.premium / self.type_product.conversion_rate)/23000)
        return bv_value
        


class NonLifeProduct(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    fullname = models.CharField(max_length=200)
    number_YCBH = models.CharField(max_length=200)
    number_policy = models.CharField(max_length=200)
    company = models.CharField(max_length=200)
    name_product = models.CharField(max_length=200)
    sumit_date = models.DateField()
    release_date = models.DateField()
    status_policy = models.IntegerField(default=0)
    premium = models.IntegerField(default=0)
    bv_premium = models.IntegerField(default=0)
    status_payment = models.IntegerField(default=0)
    certificate = models.FileField(upload_to='uploads/')

