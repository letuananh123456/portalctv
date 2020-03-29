from django.contrib import admin
from .models import Provincial,District
from .models import NguoiMuaBaoHiem


class NguoiMuaBaoHiemAdmin(admin.ModelAdmin):
    list_display = ('id', 'ho_ten', 'so_dien_thoai', 'birth_day', 'birth_month','birth_year', 'gioi_tinh', 'email', 'dia_chi_tinh_thanh_pho', 'dia_chi_quan_huyen', 'dia_chi_chi_tiet', 'so_cmnd','images_cmt_mattruoc', 'images_cmt_matsau', 'cmt_ngay_cap', 'cmt_noi_cap', 'ngay_hieu_luc', 'ngay_ket_thuc', 'ho_ten_nhan', 'email_nhan', 'so_dien_thoai_nhan', 'dia_chi_tinh_thanh_pho_nhan', 'dia_chi_quan_huyen_nhan', 'dia_chi_chi_tiet_nhan', 'status_marriage','job','weight','height','nationality','nationality_paper', 'created_at')


class ProvincialAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'code')


class DistrictAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'parent_code')


admin.site.register(NguoiMuaBaoHiem, NguoiMuaBaoHiemAdmin)
admin.site.register(Provincial,ProvincialAdmin)
admin.site.register(District,DistrictAdmin)