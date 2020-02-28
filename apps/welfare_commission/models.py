from django.db import models
from apps.users.models import User
# Create your models here.


class WelfareCommissions(models.Model):
    OPTION_TYPE_AN_SINH = [
        (0, "Du lịch"),
        (1, "Xe"),
        (2, "Nhà")
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    type_an_sinh = models.IntegerField(choices=OPTION_TYPE_AN_SINH, default=-1)
    is_done = models.BooleanField(default=False)
    created_date = models.DateTimeField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True)


    