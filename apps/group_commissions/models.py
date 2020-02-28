from django.db import models
from apps.users.models import User
from apps.convert_product.models import ConvertProduct
# Create your models here.

class GroupCommissions(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    convert_product = models.ForeignKey(ConvertProduct, on_delete=models.CASCADE)
    rate = models.IntegerField(default=0)
    total_group = models.IntegerField(default=0)
    personal_points = models.IntegerField(default=0)
    name_product = models.CharField(max_length=200)
    premium_payment = models.IntegerField(default=0)
    start_payment =  models.DateField()
    end_payment =  models.DateField()