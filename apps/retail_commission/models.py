from django.db import models
from apps.users.models import User
from apps.convert_product.models import ConvertProduct
# Create your models here.

class RetailCommission(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    convert_product = models.ForeignKey(ConvertProduct, on_delete=models.CASCADE)
    level = models.IntegerField(default=0)
    rate = models.IntegerField(default=0)
    name_product = models.CharField(max_length=200)
    premium_payment = models.IntegerField(default=0)
    date_payment =  models.DateField()