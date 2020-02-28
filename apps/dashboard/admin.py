from django.contrib import admin
from .models import MonthContact
from .models import Channel
from .models import ChannelContact
from .models import AgentTotal
from .models import NewAgent, FavoriteBenefit, FavoriteProduct, Favorite_Product_Benefit
from .models import AgentChannel, Province, LocationContact, MainBenefit, MainProduct, Main_Product_Benefit
from .models import ChannelSuccess, DaySuccess, MonthSuccess, DayContact, SupBenefit, SupProduct, Sup_Product_Benefit

class ChannelContactAdmin(admin.ModelAdmin):
    list_display = ('id', 'distribution', 'number_customer', 'created_time')


class ChannelAdmin(admin.ModelAdmin):
    list_display = ('id', 'name_chanel')


class AgentTotalAdmin(admin.ModelAdmin):
    list_display = ('id', 'number_agent', 'created_time')


class NewAgentAdmin(admin.ModelAdmin):
    list_display = ('id', 'number_agent', 'created_time')


class AgentChannelAdmin(admin.ModelAdmin):
    list_display = ('id', 'distribution', 'number_agent', 'created_time')

class ChannelSuccessAdmin(admin.ModelAdmin):
    list_display = ('id', 'distribution', 'created_time', 'number_customer', 'number_policy')

class DaySuccessAdmin(admin.ModelAdmin):
    list_display = ('id', 'created_time', 'number_customer', 'number_policy')

class MonthSuccessAdmin(admin.ModelAdmin):
    list_display = ('id', 'created_time', 'number_customer', 'number_policy')

class DayContactAdmin(admin.ModelAdmin):
    list_display = ('id', 'number_customer', 'created_time')

class ProvinceAdmin(admin.ModelAdmin):
    list_display = ('id', 'name_province')

class LocationContactAdmin(admin.ModelAdmin):
    list_display = ('id', 'location', 'number_customer', 'created_time')

class MainBenefitAdmin(admin.ModelAdmin):
    list_display = ('id', 'name_benefit')

class MainProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'name_product', 'number_customer', 'created_time')

class Main_Product_BenefitAdmin(admin.ModelAdmin):
    list_display = ('id', 'benefit', 'product')

class SupBenefitAdmin(admin.ModelAdmin):
    list_display = ('id', 'name_benefit')

class SupProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'name_product', 'number_customer', 'created_time')

class Sup_Product_BenefitAdmin(admin.ModelAdmin):
    list_display = ('id', 'benefit', 'product')

class FavoriteBenefitAdmin(admin.ModelAdmin):
    list_display = ('id', 'name_benefit')

class FavoriteProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'name_product', 'sa', 'policy_term', 'payment_term', 'ways_to_get_benefit', 'created_time')

class Favorite_Product_BenefitAdmin(admin.ModelAdmin):
    list_display = ('id', 'benefit', 'product')

class MonthContactAdmin(admin.ModelAdmin):
    list_display = ('id', 'number_customer', 'created_time')






# Register your models here.
admin.site.register(MonthContact,MonthContactAdmin)
admin.site.register(Channel, ChannelAdmin)
admin.site.register(ChannelContact, ChannelContactAdmin)
admin.site.register(AgentTotal, AgentTotalAdmin)
admin.site.register(NewAgent, NewAgentAdmin)
admin.site.register(AgentChannel, AgentChannelAdmin)
admin.site.register(ChannelSuccess, ChannelSuccessAdmin)
admin.site.register(DaySuccess, DaySuccessAdmin)
admin.site.register(MonthSuccess, MonthSuccessAdmin)
admin.site.register(DayContact, DayContactAdmin)
admin.site.register(Province, ProvinceAdmin)
admin.site.register(LocationContact, LocationContactAdmin)
admin.site.register(MainBenefit, MainBenefitAdmin)
admin.site.register(MainProduct, MainProductAdmin)
admin.site.register(Main_Product_Benefit, Main_Product_BenefitAdmin)
admin.site.register(SupBenefit, SupBenefitAdmin)
admin.site.register(SupProduct, SupProductAdmin)
admin.site.register(Sup_Product_Benefit, Sup_Product_BenefitAdmin)
admin.site.register(FavoriteBenefit, FavoriteBenefitAdmin)
admin.site.register(FavoriteProduct, FavoriteProductAdmin)
admin.site.register(Favorite_Product_Benefit, Favorite_Product_BenefitAdmin)