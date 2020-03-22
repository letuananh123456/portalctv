from rest_framework.response import Response
from django.shortcuts import render, redirect, get_object_or_404
from rest_framework.views import APIView
from rest_framework import permissions
from apps.core.utils import validate_data
from django.contrib.auth import authenticate
from apps.core.exceptions import HTTP401AuthenticationError, HTTP404NotFoundError, HTTP409ConflictError
from . import models as user_models
from . import utils as user_utils
from . import serializers as user_sers
from rest_framework import status
from .models import LoginHistory, User
from django.views import View
from .forms import LoginForm
from django.contrib.auth import logout, login
from django.core.cache import cache
from apps.core.utils import get_request_hash_data, validate_response
from django.conf import settings
import string



class LoginAPIView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        valid_data = validate_data(user_sers.LoginEmailValidator, request.data)

        username = valid_data.get('username')
        password = valid_data.get('password')
        user = authenticate(username=username, password=password)
        if not user:
            raise HTTP401AuthenticationError('Incorrect email or password')

        access_token = user_models.generate_access_token(user.id)
        token = user_models.Token.objects.create(user=user, key=access_token)
        data = {
            'access_token': token.key,
            'user': user
        }

        user_utils.create_or_update_login_history(user.id)
        serializer = user_sers.TokenSerializer(data)
        return Response(serializer.data, status=status.HTTP_200_OK)


class GetUserInfoAPIView(APIView):
    permission_classes = (permissions.IsAuthenticated, )

    def get(self, request):
        his = LoginHistory.objects.all()
        ser = user_sers.LoginHistorySerializer(his, many=True)
        return Response(ser.data, status=status.HTTP_200_OK)


class LoginView(View):

    def get(self, request):
        message = ''
        fm = LoginForm()
        context = {'f': fm, 'message': message}
        return render(request, 'login.html', context)

    def post(self, request):
        login_valid = LoginForm(request.POST)
        fm = LoginForm()
        message = "login thất bại"
        context = {'f': fm, 'message': message}

        redirect_to = request.GET.get('next', '') 

        if login_valid.is_valid():
            username = login_valid.cleaned_data['username']
            password = login_valid.cleaned_data['password']
            user = authenticate(username=username, password=password)
            if not user:
                return render(request, 'login.html', context)
            login(request, user)
            if redirect_to == '':
                return redirect('dashboard:dashboard')
            return redirect(redirect_to)
        else:
            return render(request, 'login.html', context)


class LogoutView(View):
    def get(self, request):
        logout(request)
        return redirect('login_url')


class RegisterView(View):
    def get(self, request):
        return redirect('http://bihama.com/')


class UpdateInforUser(APIView):
    """
    API này để lưu cập nhật thông tin user khi có sự thay đổi từ sàn thương mại điện tử
    Cập nhật thành công: 200
    """
    def post(self, request, format=None):
        valid_data = validate_data(user_sers.UpdateUserSerializer, request.data)

        username = valid_data.get('username')
        password = valid_data.get('password')
        secret = valid_data.get('secret')

        data_dict['username'] = username
        data_dict['password'] = password
        data_dict['secret'] = secret
        
        if validate_response(data_dict, settings.VNROBOT_API_KEY):
            if not User.objects.filter(username=username).exists():
                User.objects.create(username=username, password=password)
            else:
                User.objects.filter(username=username).update(username=username, password=password)
                return Response('', status.HTTP_204_NO_CONTENT)
            return Response('', status.HTTP_200_OK)
        else:
            return Response('', status.HTTP_401_UNAUTHORIZED)
        

class GetBVPointInfo(APIView):
    permission_classes = (permissions.AllowAny,)
    """
    API này để lấy thông tin điểm BV
    """

    def get(self, request, username):
        data = {'red_bv': 100, 'green_bv': 200 }
        return Response(data, status.HTTP_200_OK)


class UpdateThongTinHopDongNhanTho(APIView):
    """
    API này để update thông tin hợp đồng nhân thọ 
    """
    def post(self, request):
        pass


class thongtin(View):

    def get(self, request):
       
        return render(request, 'dashboard/hoso/thongtin.html')

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


def random_string_generator(size=12, chars=string.ascii_lowercase + string.digits):
    return ''.join(random.choice(chars) for _ in range(size))


def unique_order_id_generator(instance):
    order_new_id= random_string_generator()

    Klass= instance.__class__

    qs_exists= DonDatHang.objects.filter(code_info=order_new_id).exists()
    if qs_exists:
        return unique_order_id_generator(instance)
    return order_new_id