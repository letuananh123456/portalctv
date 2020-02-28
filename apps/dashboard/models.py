from django.db import models
from django.contrib.auth.models import User


class MonthContact(models.Model):
    number_customer = models.IntegerField(default=0)
    created_time = models.DateTimeField(null=True)

    def __str__(self):
        return str(self.number_customer)

    @property
    def get_year(self):
        return self.created_time.year


class Channel(models.Model):
    id = models.IntegerField(primary_key=True)
    name_chanel = models.CharField(max_length=200)
    color = models.TextField(default='rgb(66, 134, 244)')

    def __str__(self):
        return str(self.name_chanel)


class ChannelContact(models.Model):
    distribution = models.ForeignKey(Channel, on_delete=models.CASCADE)
    number_customer = models.IntegerField(default=0)
    created_time = models.DateTimeField(null=True)

    def __str__(self):
        return str(self.number_customer)


class AgentTotal(models.Model):
    number_agent = models.IntegerField(default=0)
    created_time = models.DateTimeField(null=True)

    def __str__(self):
        return str(self.number_agent)


class NewAgent(models.Model):
    number_agent = models.IntegerField(default=0)
    created_time = models.DateTimeField(null=True)

    def __str__(self):
        return str(self.number_agent)


class AgentChannel(models.Model):
    distribution = models.ForeignKey(Channel, on_delete=models.CASCADE)
    number_agent = models.IntegerField(default=0)
    created_time = models.DateTimeField(null=True)


class ChannelSuccess(models.Model):
    distribution = models.ForeignKey(Channel, on_delete=models.CASCADE)
    number_customer = models.IntegerField(default=0)
    number_policy = models.IntegerField(default=0)
    created_time = models.DateTimeField(null=True)


class DaySuccess(models.Model):
    number_customer = models.IntegerField(default=0)
    number_policy = models.IntegerField(default=0)
    created_time = models.DateTimeField(null=True)


class MonthSuccess(models.Model):
    number_customer = models.IntegerField(default=0)
    number_policy = models.IntegerField(default=0)
    created_time = models.DateTimeField(null=True)


class DayContact(models.Model):
    number_customer = models.IntegerField(default=0)
    created_time = models.DateTimeField(null=True)

    @property
    def get_dd_mm_yyyy(self):
        str_date = '%s - %s - %s'%(self.created_time.day, self.created_time.month, self.created_time.year)
        return str_date

    @property
    def get_hour_minute(self):
        str_hour = '%sh - %sm '%(self.created_time.hour, self.created_time.minute)
        return str_hour


class Province(models.Model):
    id = models.IntegerField(primary_key=True)
    name_province = models.CharField(max_length=200)

    def __str__(self):
        return str(self.name_province)


class LocationContact(models.Model):
    location = models.ForeignKey(Province, on_delete=models.CASCADE)
    number_customer = models.IntegerField(default=0)
    created_time = models.DateTimeField(null=True)


class MainBenefit(models.Model):
    id = models.IntegerField(primary_key=True)
    name_benefit = models.CharField(max_length=200)

    def __str__(self):
        return str(self.name_benefit)


class MainProduct(models.Model):
    id = models.IntegerField(primary_key=True)
    number_customer = models.IntegerField(default=0)
    name_product = models.CharField(max_length=200)
    created_time = models.DateTimeField(null=True)

    def __str__(self):
        return str(self.name_product)


class Main_Product_Benefit(models.Model):
    benefit = models.ForeignKey(MainBenefit, on_delete=models.CASCADE)
    product = models.ForeignKey(MainProduct, on_delete=models.CASCADE)


class SupBenefit(models.Model):
    id = models.IntegerField(primary_key=True)
    name_benefit = models.CharField(max_length=200)

    def __str__(self):
        return str(self.name_benefit)


class SupProduct(models.Model):
    id = models.IntegerField(primary_key=True)
    number_customer = models.IntegerField(default=0)
    name_product = models.CharField(max_length=200)
    created_time = models.DateTimeField(null=True)

    def __str__(self):
        return str(self.name_product)


class Sup_Product_Benefit(models.Model):
    benefit = models.ForeignKey(SupBenefit, on_delete=models.CASCADE)
    product = models.ForeignKey(SupProduct, on_delete=models.CASCADE)


class FavoriteBenefit(models.Model):
    id = models.IntegerField(primary_key=True)
    name_benefit = models.CharField(max_length=200)


    def __str__(self):
        return str(self.name_benefit)


class FavoriteProduct(models.Model):
    id = models.AutoField(primary_key=True)
    name_product = models.CharField(max_length=200)
    sa = models.IntegerField(default=0)
    policy_term = models.IntegerField(default=0)
    payment_term = models.IntegerField(default=0)
    ways_to_get_benefit = models.CharField(max_length=200)
    created_time = models.DateTimeField(null=True)

    def __str__(self):
        return str(self.name_product)


class Favorite_Product_Benefit(models.Model):
    benefit = models.ForeignKey(FavoriteBenefit, on_delete=models.CASCADE)
    product = models.ForeignKey(FavoriteProduct, on_delete=models.CASCADE)
