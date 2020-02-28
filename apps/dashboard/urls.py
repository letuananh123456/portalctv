from django.urls import path
from . import views as dash_view
from . import  api as api_view
from apps.tree_binary.views import BinaryTree
app_name = 'dashboard'

urlpatterns = [
    path('', dash_view.DashboardView.as_view(), name='dashboard'),
    path('tin-tuc/', dash_view.DaycontactView.as_view(), name='daycontact'),
    path('month-contact/', dash_view.MonthcontactView.as_view(), name='monthcontact'),
    path('san-pham/', dash_view.ChannelcontactView.as_view(), name='channelcontact'),
    path('location-contact/', dash_view.LocationcontactView.as_view(), name='locationcontact'),
    path('day-success/', dash_view.DaysuccessView.as_view(), name='daysuccess'),
    path('month-success/', dash_view.MonthsuccessView.as_view(), name='monthsuccess'),
    path('channel-success/', dash_view.ChannelsuccessView.as_view(), name='channelsuccess'),
    path('dshv/', dash_view.danhsachhocvien.as_view(), name='dshv'),
    path('thongbao/', dash_view.thongbao.as_view(), name='thongbao'),
    path('thongtin/', dash_view.thongtin.as_view(), name='thongtin'),
    path('taikhoan/', dash_view.taikhoan.as_view(), name='taikhoan'),
    path('hopdong/', dash_view.hopdong.as_view(), name='hopdong'),
    path('caidat/', dash_view.caidat.as_view(), name='caidat'),
    path('matkhau/', dash_view.matkhau.as_view(), name='matkhau'),
    path('calendar/', dash_view.CalendarView.as_view(), name='calendar'),
    path('read/', dash_view.ReadView.as_view(), name='read'),
    path('user-agent/', dash_view.UseragentView.as_view(), name='useragent'),
    path('search-agent/', dash_view.SearchagentView.as_view(), name='searchagent'),
    path('add-member/', dash_view.AddMember.as_view(), name='add-member'),
    path('all-member/', dash_view.AllMember.as_view(), name='all-member'),
    path('left-group/', dash_view.LeftGroup.as_view(), name='left-group'),
    path('right-group/', dash_view.RightGroup.as_view(), name='right-group'),
    path('binary-tree/', dash_view.BinaryTree.as_view(), name='binary-tree'),
    path('direct-tree/', dash_view.DirectTree.as_view(), name='direct-tree'),
    path('gan-nhom-kinh-doanh/', dash_view.GanNhomKinhDoanh.as_view(), name='gan-nhom-kinh-doanh'),
    path('cay-gan-nhom-kinh-doanh/', dash_view.CayGanNhomKinhDoanh.as_view(), name='cay-gan-nhom-kinh-doanh'),
    path('nhan-tho/', dash_view.NhanTho.as_view(), name='nhan-tho'),
    path('phi-nhan-tho/', dash_view.PhiNhanTho.as_view(), name='phi-nhan-tho'),
    path('chinh-sach/', dash_view.ChinhSach.as_view(), name='chinh-sach'),
    path('tong-quan/', dash_view.TongQuan.as_view(), name='tong-quan'),
    path('hoa-hong-ban-le/', dash_view.HoaHongBanLe.as_view(), name='hoa-hong-ban-le'),
    path('hoa-hong-tuyen-dung/', dash_view.HoaHongTuyenDung.as_view(), name='hoa-hong-tuyen-dung'),
    path('hoa-hong-tuong-tro/', dash_view.HoaHongTuongTro.as_view(), name='hoa-hong-tuong-tro'),
    path('hoa-hong-nhom/', dash_view.HoaHongNhom.as_view(), name='hoa-hong-nhom'),
    path('hoa-hong-cap-bac/', dash_view.HoaHongCapBac.as_view(), name='hoa-hong-cap-bac'),
    path('hoa-hong-an-sinh/', dash_view.HoaHongAnSinh.as_view(), name='hoa-hong-an-sinh'),
    path('promotion/', dash_view.Promotion.as_view(), name='promotion'),
    path('lich-su-rut/', dash_view.LichSuRutTien.as_view(), name='lich-su-rut'),
    path('dat-lenh/', dash_view.DatLenh.as_view(), name='dat-lenh'),
    path('tai-lieu/', dash_view.TaiLieu.as_view(), name='tai-lieu'),
    path('thong-tin-quan-ly/', dash_view.ThongTinQuanLy.as_view(), name='thong-tin-quan-ly'),
    #api url

    path('api/update-agency-total/', api_view.UpdateNumberAgencyTotal.as_view()),
    path('api/update-agency-new/', api_view.UpdateNumberNewAgency.as_view()),
    path('api/update-agency-channel/', api_view.UpdateNumberAgencyChannel.as_view()),
    path('api/update-number-customer-day/', api_view.UpdateNumberCustomerDay.as_view()),
    path('api/update-number-customer-month/', api_view.UpdateNumberCustomerMonth.as_view()),
    path('api/update-number-customer-location/', api_view.UpdateNumberCustomerLocation.as_view()),
    path('api/update-number-customer-channel/', api_view.UpdateNumberCustomerChannel.as_view()),
    path('api/update-day-success/', api_view.UpdateDaySuccess.as_view()),
    path('api/update-month-success/', api_view.UpdateMonthSuccess.as_view()),
    path('api/update-channel-success/', api_view.UpdateSuccessChannel.as_view()),
    path('api/update-main-product/', api_view.UpdateMainProductStatisticSuccess.as_view()),
    path('api/update-sup-product/', api_view.UpdateSupProductStatisticSuccess.as_view()),
    path('api/update-favorite-product/', api_view.UpdateFavoriteProductSuccess.as_view()),



]