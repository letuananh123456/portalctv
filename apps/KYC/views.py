from django.shortcuts import render
from django.views import View
from apps.users.models import User
# Create your views here.


class hopdong(View):
    def get(self, request):
        return render(request, 'dashboard/hoso/hopdong.html')
        
    def post(self, request):
        email = request.POST.get("email")
        hoten = request.POST.get("hoten")
        ngaysinh = request.POST.get("ngaysinh")
        cmnd = request.POST.get("cmnd")
        ngaycap = request.POST.get("ngaycap")
        noicap = request.POST.get("noicap")
        diachi = request.POST.get("diachi")
        thuecanhan = request.POST.get("thuecanhan")
        noicapthue = request.POST.get("noicapthue")
        city = request.POST.get("city")
        sex = request.POST.get("gioitinh")
        User.object.create(
            fullname = hoten,
            email=email,
            dob=ngaysinh,
            sex = sex,
            address = diachi,
            cmnd_number = cmnd,
            cmnd_date = ngaycap,
            cmnd_address = noicap,
            city = city,
            tax_number = thuecanhan,
            tax_address = noicapthue,
        )
        context = {
            'mession': "Dữ liệu của bạn đã được cập nhập thành công ",
        }
        return render(request, 'dashboard/hoso/thongtin.html',context)

