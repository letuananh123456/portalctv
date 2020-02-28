from django.shortcuts import render, redirect
from django.views import View
from .models import MonthContact, ChannelSuccess, DaySuccess, MonthSuccess
from .models import ChannelContact, FavoriteBenefit, FavoriteProduct, Favorite_Product_Benefit
from .models import AgentTotal,DayContact, SupBenefit, SupProduct, Sup_Product_Benefit
from .models import Channel
from .models import NewAgent, LocationContact, MainBenefit, MainProduct, Main_Product_Benefit
from apps.policy_insurance.models import LifeProduct
from apps.users.models import User
import numpy as np
import json
from .ultils import *

from django.contrib.auth.mixins import LoginRequiredMixin
from datetime import datetime, timedelta


class DashboardView(View):
    def get(self, request):
        return render(request, 'dashboard/index.html')


class DaycontactView(View):
    def get(self, request):
        return render(request, 'dashboard/customer_contact/day_contact.html')


class MonthcontactView(View):
    def get(self, request):
        list_contact = MonthContact.objects.all()
        count_list_contact = list_contact.count()
        list_contact = list_contact[count_list_contact - 24:]
        last_year = list_contact[:12]
        list_current_year = list_contact[12:]
        list_data = zip(last_year, list_current_year)

        context = {
            'list_data': list_data,
            'year': list_current_year[0].get_year

        }
        return render(request, 'dashboard/customer_contact/month_contact.html', context)


class ChannelcontactView(View):
    def get(self, request):
        return render(request, 'dashboard/customer_contact/channel_contact.html')


class LocationcontactView(View):
    def get(self, request):
        list_customer = LocationContact.objects.all()
        count_list_contact = list_customer.count()
        list_customer = list_customer[count_list_contact - 63:]
        name_province = list_customer.values_list('location__name_province', flat=True)
        lis1 = list_customer.values_list('number_customer', flat=True)
        a = np.array(lis1)
        total_array = np.full(lis1.count(), sum(lis1))
        weight = np.round(((lis1 / total_array) * 100), 2)
        list_data = zip(list(name_province), a, weight)

        context = {
            'list_data': list_data

        }
        return render(request, 'dashboard/customer_contact/location_contact.html', context)


class DaysuccessView(View):
    def get(self, request):
        
        return render(request, 'dashboard/success_rate/day_success.html')



class MonthsuccessView(View):
    def get(self, request):
        
        return render(request, 'dashboard/success_rate/month_success.html')


class thongtin(View):
    def get(self, request):
        
        return render(request, 'dashboard/hoso/thongtin.html')


class taikhoan(View):
    def get(self, request):
        
        return render(request, 'dashboard/hoso/taikhoan.html')


class hopdong(View):
    def get(self, request):
        
        return render(request, 'dashboard/hoso/hopdong.html')

        
class caidat(View):
    def get(self, request):
        
        return render(request, 'dashboard/hoso/caidat.html')


class matkhau(View):
    def get(self, request):
        
        return render(request, 'dashboard/hoso/doimk.html')


class ChannelsuccessView(View):
    def get(self, request):
        
        return render(request, 'dashboard/success_rate/channel_success.html')


class danhsachhocvien(View):
    def get(self, request):
        
        return render(request, 'dashboard/success_rate/dshv.html')


class AddMember(View):
    def get(self, request):
        return render(request, 'dashboard/ds_tuyenduoi/add_thanhvien.html')


class AllMember(View):
    def get(self, request):
        return render(request, 'dashboard/ds_tuyenduoi/tatca.html')


class LeftGroup(View):
    def get(self, request):
        return render(request, 'dashboard/ds_tuyenduoi/nhomtrai.html')


class RightGroup(View):
    def get(self, request):
        return render(request, 'dashboard/ds_tuyenduoi/nhomphai.html')


class GanNhomKinhDoanh(View):
    def get(self, request):
        """
        Tất cả các tính toán BV chỉ áp dụng khi Hợp đồng đã ACK DONE
        1. Nếu nó tự mua cho nó thì tính hoa hồng bán lẻ
        (Tức user đang đăng nhập<request user> == user giới thiệu của sản phẩm)
        2. Sản phẩm phải là sản phẩm nhân thọ
        3. Nếu sản phẩm mua là sản phẩm phi nhân thọ thì tính thưởng cho user đang login

        ack_status=1 is đã ack

        """
        last_month = datetime.now() - timedelta(days=30)
        list_contract = LifeProduct.objects.filter(
            user=request.user, 
            ack_status=1, type_product__is_nhan_tho=True,
            created_date__gt=last_month, is_rewarded=False
        )


        # Danh sách user id mua  unique 
        list_dist = list_contract.distinct('userid_mua')

        list_user_id = [x.userid_mua for x in list_dist]

        #check user mua đã tồn tại trong 
        list_user = User.objects.filter(userid__in=list_user_id)


        context = {
            'list_cho_gan_nhom': list_user
        }

        # tong_so_bv = 0
        # for item in list_contract:
        #     tong_so_bv += item.convert_bv
        
        # if tong_so_bv >= 380:
        #     return 


        return render(request, 'dashboard/ds_chogan/gan_kd.html', context)


class CayGanNhomKinhDoanh(View):
    def get(self, request):
        
        return render(request, 'dashboard/gan-nhom-kd/cay-gan-nhom.html')


class NhanTho(LoginRequiredMixin, View):
    login_url = '/dang-nhap/'
    def get(self, request):
        list_hopdong = LifeProduct.objects.filter(user=request.user)
        
        context = {
            'list_hop_dong': list_hopdong
        }
        return render(request, 'dashboard/hopdongbaohiem/nhantho.html', context)
    

class PhiNhanTho(View):
    def get(self, request):
        return render(request, 'dashboard/hopdongbaohiem/phinhantho.html')


class ChinhSach(View):
    def get(self, request):
        return render(request, 'dashboard/customer_contact/location_contact.html')


class BinaryTree(View):
    def get(self, request):
        return render(request, 'dashboard/ds_chogan/caynhiphan.html')


class TaiLieu(View):
    def get(self, request):
        return render(request, 'dashboard/thu_vien/tailieu.html')


class ThongTinQuanLy(View):
    def get(self, request):
        return render(request, 'dashboard/ho_tro/quanly.html')


class DirectTree(View):
    def get(self, request):
        return render(request, 'dashboard/ds_chogan/caytruche.html')

    
class TongQuan(View):
    def get(self, request):
        return render(request, 'dashboard/thunhap/tongquan.html')


class HoaHongBanLe(View):
    def get(self, request):
        return render(request, 'dashboard/thunhap/banle.html')
        

class HoaHongTuyenDung(View):
    def get(self, request):
        return render(request, 'dashboard/thunhap/tuyendung.html')


class HoaHongTuongTro(View):
    def get(self, request):
        return render(request, 'dashboard/thunhap/tuongtro.html')


class HoaHongNhom(View):
    def get(self, request):
        return render(request, 'dashboard/thunhap/nhom.html')


class Promotion(View):
    def get(self, request):
        return render(request, 'dashboard/thunhap/promotion.html')


class HoaHongCapBac(View):
    def get(self, request):
        return render(request, 'dashboard/thunhap/capbac.html')


class HoaHongAnSinh(View):
    def get(self, request):
        return render(request, 'dashboard/thunhap/ansinh.html')


class thongbao(View):
    def get(self, request):
        return render(request, 'dashboard/customer_contact/month_contact.html')


class LichSuRutTien(View):
    def get(self, request):
        return render(request, 'dashboard/vitien/ls.html')


class DatLenh(View):
    def get(self, request):
        return render(request, 'dashboard/vitien/datlenh.html')


class CalendarView(View):
    def get(self, request):
        return render(request, 'dashboard/calendar/calendar.html')



class ReadView(View):
    def get(self, request):
        return render(request, 'dashboard/mailbox/read.html')


class UseragentView(View):
    def get(self, request):
        return render(request, 'dashboard/user_agent/user.html')


class SearchagentView(View):
    def get(self, request):
        return render(request, 'dashboard/search_agent/search.html')