from django.db import models
from apps.users.models import User
# Create your models here.

class TreeBinary(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    sponser = models.IntegerField(default=0)
    reference = models.IntegerField(default=0)
    position = models.IntegerField(default=0)
    datecreate = models.DateField(default=0)