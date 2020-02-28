from django.db import models
from apps.users.models import User

# Create your models here.

class History(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    bank_name = models.CharField(max_length=200)
    user_name = models.CharField(max_length=200)
    user_number = models.IntegerField(default=0)
    branch = models.CharField(max_length=200)
    date_create = models.DateField(auto_now=True)
    date_payment = models.DateField(auto_now=True)
    status = models.IntegerField(default=0)

class WithdrawalRequest(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    red_wallet = models.IntegerField(default=0)
    green_wallet = models.IntegerField(default=0)
    bank_account = models.TextField(blank = True)
    amount_withdraw = models.IntegerField(default=0)

