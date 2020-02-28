from django.db import models

# Create your models here.
class ConvertProduct(models.Model):
    """
    Thông  tin cấu hình loại sản phẩm phải đồng bộ theo bên sàn 
    xem ở README.MD ở code sàn thương mại
    """
    TU_KY = 1
    SUC_KHOE = 2
    DU_LICH = 3
    O_TO = 4
    DAU_TU = 5
    LOAI_PRODUCT = [
        (TU_KY, 'Tử kỳ'),
        (SUC_KHOE, 'Sức khoẻ'),
        (DU_LICH, 'Du lịch'),
        (O_TO, 'Ô tô'),
        (DAU_TU, 'Đầu tư')
    ]

    # product_id = models.IntegerField(default=0)
    type_product = models.IntegerField(default=0, choices=LOAI_PRODUCT)
    company = models.IntegerField(default=0)
    conversion_rate = models.FloatField(default=0.0)
    commission_rate = models.FloatField(default=0.0)
    is_nhan_tho = models.BooleanField(default=True)
