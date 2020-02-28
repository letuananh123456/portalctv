from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import AgentTotal, NewAgent, AgentChannel, Channel, DayContact, MonthContact, LocationContact, Province
from .models import ChannelContact, DaySuccess, MonthSuccess, ChannelSuccess, MainProduct, SupProduct
from .models import FavoriteProduct, Favorite_Product_Benefit, FavoriteBenefit
from .serianlizers import *
from rest_framework import status
from django.core.exceptions import ObjectDoesNotExist
import json
import datetime
# Create your views here.


class UpdateNumberAgencyTotal(APIView):
    permission_classes = (AllowAny,)

    def get(self, request):
        return Response('tesssst', status=status.HTTP_200_OK)

    def post(self, request):
        validate = UpdateAgencySerializer(data=request.data)

        if not validate.is_valid():
            return Response('may gui sai du lieu roi', status=status.HTTP_400_BAD_REQUEST)

        number_of_agency = validate.data['number_of_agency']
        mm = validate.data['mm']
        yyyy = validate.data['yyyy']

        AgentTotal.objects.create(number_agent=number_of_agency, created_time=datetime.datetime(yyyy, mm, 1))

        return Response('them thanh cong', status=status.HTTP_200_OK)


class UpdateNumberNewAgency(APIView):
    permission_classes = (AllowAny,)

    def get(self, request):
        return Response('tesssst', status=status.HTTP_200_OK)

    def post(self, request):
        validate = UpdateAgencySerializer(data=request.data)

        if not validate.is_valid():
            return Response('may gui sai du lieu roi', status=status.HTTP_400_BAD_REQUEST)

        number_of_agency = validate.data['number_of_agency']
        mm = validate.data['mm']
        yyyy = validate.data['yyyy']

        NewAgent.objects.create(number_agent=number_of_agency, created_time=datetime.datetime(yyyy, mm, 1))

        return Response('them thanh cong', status=status.HTTP_200_OK)


class UpdateNumberAgencyChannel(APIView):
    permission_classes = (AllowAny,)

    def get(self, request):
        return Response('tesssst', status=status.HTTP_200_OK)

    def post(self, request):
        validate = UpdateAgencyChannelSerializer(data=request.data)

        if not validate.is_valid():
            return Response('may gui sai du lieu roi', status=status.HTTP_400_BAD_REQUEST)

        number_of_agency = validate.data['number_of_agency']
        mm = validate.data['mm']
        yyyy = validate.data['yyyy']
        channel = validate.data['channel']
        try:
            dis = Channel.objects.get(id=channel)
        except ObjectDoesNotExist:
            return Response('channel not found', status=status.HTTP_404_NOT_FOUND)

        AgentChannel.objects.create(number_agent=number_of_agency, created_time=datetime.datetime(yyyy, mm, 1),
                                    distribution=dis)

        return Response('them thanh cong', status=status.HTTP_200_OK)


class UpdateNumberCustomerDay(APIView):
    permission_classes = (AllowAny,)

    def get(self, request):
        return Response('tesssst', status=status.HTTP_200_OK)

    def post(self, request):
        validate = UpdateNumberCustomerSerializer(data=request.data)

        if not validate.is_valid():
            return Response('may gui sai du lieu roi', status=status.HTTP_400_BAD_REQUEST)

        number_of_customer = validate.data['number_of_customer']
        mm = validate.data['mm']
        yyyy = validate.data['yyyy']

        DayContact.objects.create(number_customer=number_of_customer, created_time=datetime.datetime(yyyy, mm, 1))

        return Response('them thanh cong', status=status.HTTP_200_OK)


class UpdateNumberCustomerMonth(APIView):
    permission_classes = (AllowAny,)

    def get(self, request):
        return Response('tesssst', status=status.HTTP_200_OK)

    def post(self, request):
        validate = UpdateNumberCustomerSerializer(data=request.data)

        if not validate.is_valid():
            return Response('may gui sai du lieu roi', status=status.HTTP_400_BAD_REQUEST)

        number_of_customer = validate.data['number_of_customer']
        mm = validate.data['mm']
        yyyy = validate.data['yyyy']

        MonthContact.objects.create(number_customer=number_of_customer, created_time=datetime.datetime(yyyy, mm, 1))

        return Response('them thanh cong', status=status.HTTP_200_OK)


class UpdateNumberCustomerLocation(APIView):
    permission_classes = (AllowAny,)

    def get(self, request):
        return Response('tesssst', status=status.HTTP_200_OK)

    def post(self, request):
        validate = UpdateNumberCustomerLocationSerializer(data=request.data)

        if not validate.is_valid():
            return Response('may gui sai du lieu roi', status=status.HTTP_400_BAD_REQUEST)

        number_of_customer = validate.data['number_of_customer']
        mm = validate.data['mm']
        yyyy = validate.data['yyyy']
        location = validate.data['location']
        try:
            dis = Province.objects.get(id=location)
        except ObjectDoesNotExist:
            return Response('channel not found', status=status.HTTP_404_NOT_FOUND)

        LocationContact.objects.create(number_customer=number_of_customer, created_time=datetime.datetime(yyyy, mm, 1),
                                       location=dis)

        return Response('them thanh cong', status=status.HTTP_200_OK)


class UpdateNumberCustomerChannel(APIView):
    permission_classes = (AllowAny,)

    def get(self, request):
        return Response('tesssst', status=status.HTTP_200_OK)

    def post(self, request):
        validate = UpdateNumberCustomerChannelSerializer(data=request.data)

        if not validate.is_valid():
            return Response('may gui sai du lieu roi', status=status.HTTP_400_BAD_REQUEST)

        number_of_customer = validate.data['number_of_customer']
        mm = validate.data['mm']
        yyyy = validate.data['yyyy']
        channel = validate.data['channel']
        try:
            dis = Channel.objects.get(id=channel)
        except ObjectDoesNotExist:
            return Response('channel not found', status=status.HTTP_404_NOT_FOUND)

        ChannelContact.objects.create(number_customer=number_of_customer,
                                      created_time=datetime.datetime(yyyy, mm, 1), distribution=dis)

        return Response('them thanh cong', status=status.HTTP_200_OK)


class UpdateDaySuccess(APIView):
    permission_classes = (AllowAny,)

    def get(self, request):
        return Response('tesssst', status=status.HTTP_200_OK)

    def post(self, request):
        validate = UpdateSuccessRateSerializer(data=request.data)

        if not validate.is_valid():
            return Response('may gui sai du lieu roi', status=status.HTTP_400_BAD_REQUEST)

        number_of_customer = validate.data['number_of_customer']
        number_of_policy = validate.data['number_of_policy']
        mm = validate.data['mm']
        yyyy = validate.data['yyyy']

        DaySuccess.objects.create(number_customer=number_of_customer, created_time=datetime.datetime(yyyy, mm, 1),
                                  number_policy=number_of_policy)

        return Response('them thanh cong', status=status.HTTP_200_OK)


class UpdateMonthSuccess(APIView):
    permission_classes = (AllowAny,)

    def get(self, request):
        return Response('tesssst', status=status.HTTP_200_OK)

    def post(self, request):
        validate = UpdateSuccessRateSerializer(data=request.data)

        if not validate.is_valid():
            return Response('may gui sai du lieu roi', status=status.HTTP_400_BAD_REQUEST)

        number_of_customer = validate.data['number_of_customer']
        number_of_policy = validate.data['number_of_policy']
        mm = validate.data['mm']
        yyyy = validate.data['yyyy']

        MonthSuccess.objects.create(number_customer=number_of_customer,
                                    created_time=datetime.datetime(yyyy, mm, 1), number_policy=number_of_policy)

        return Response('them thanh cong', status=status.HTTP_200_OK)



class UpdateSuccessChannel(APIView):
    permission_classes = (AllowAny,)

    def get(self, request):
        return Response('tesssst', status=status.HTTP_200_OK)

    def post(self, request):
        validate = UpdateSuccessChannelSerializer(data=request.data)

        if not validate.is_valid():
            return Response('may gui sai du lieu roi', status=status.HTTP_400_BAD_REQUEST)

        number_of_customer = validate.data['number_of_customer']
        number_of_policy = validate.data['number_of_policy']
        mm = validate.data['mm']
        yyyy = validate.data['yyyy']
        channel = validate.data['channel']
        try:
            dis = Channel.objects.get(id=channel)
        except ObjectDoesNotExist:
            return Response('channel not found', status=status.HTTP_404_NOT_FOUND)

        ChannelSuccess.objects.create(number_customer=number_of_customer, number_policy=number_of_policy,
                                      created_time=datetime.datetime(yyyy, mm, 1), distribution=dis)

        return Response('them thanh cong', status=status.HTTP_200_OK)


class UpdateMainProductStatisticSuccess(APIView):
    permission_classes = (AllowAny,)

    def get(self, request):
        return Response('tesssst', status=status.HTTP_200_OK)

    def post(self, request):
        validate = UpdateProductStatisticSerializer(data=request.data)

        if not validate.is_valid():
            return Response('may gui sai du lieu roi', status=status.HTTP_400_BAD_REQUEST)

        number_of_customer = validate.data['number_of_customer']
        mm = validate.data['mm']
        yyyy = validate.data['yyyy']
        name_of_product = validate.data['name_of_product']
        id = validate.data['id']

        my_product = MainProduct.objects.get(id=id)
        my_product.number_customer = number_of_customer
        my_product.created_time = datetime.datetime(yyyy, mm, 1)
        my_product.name_product = name_of_product
        my_product.save()


        return Response('them thanh cong', status=status.HTTP_200_OK)




class UpdateSupProductStatisticSuccess(APIView):
    permission_classes = (AllowAny,)

    def get(self, request):
        return Response('tesssst', status=status.HTTP_200_OK)

    def post(self, request):
        validate = UpdateProductStatisticSerializer(data=request.data)

        if not validate.is_valid():
            return Response('may gui sai du lieu roi', status=status.HTTP_400_BAD_REQUEST)

        number_of_customer = validate.data['number_of_customer']
        mm = validate.data['mm']
        yyyy = validate.data['yyyy']
        name_of_product = validate.data['name_of_product']
        id = validate.data['id']

        my_product = SupProduct.objects.get(id=id)
        my_product.number_customer = number_of_customer
        my_product.created_time = datetime.datetime(yyyy, mm, 1)
        my_product.name_product = name_of_product
        my_product.save()

        return Response('them thanh cong', status=status.HTTP_200_OK)




class UpdateFavoriteProductSuccess(APIView):
    permission_classes = (AllowAny,)

    def get(self, request):
        return Response('tesssst', status=status.HTTP_200_OK)

    def post(self, request):
        validate = UpdateFavoriteProductSerializer(data=request.data)

        if not validate.is_valid():
            return Response('may gui sai du lieu roi', status=status.HTTP_400_BAD_REQUEST)

        name_of_product = validate.data['name_of_product']
        mm = validate.data['mm']
        yyyy = validate.data['yyyy']
        sa = validate.data['sa']
        policy_term = validate.data['policy_term']
        payment_term = validate.data['payment_term']
        ways_to_get_benefit = validate.data['ways_to_get_benefit']
        id_benefit = validate.data['id_benefit']

        new_product = FavoriteProduct.objects.create(name_product=name_of_product, sa=sa, policy_term=policy_term,
                                       payment_term=payment_term, ways_to_get_benefit=ways_to_get_benefit,
                                       created_time=datetime.datetime(yyyy, mm, 1))
        aa = json.loads(id_benefit)

        for i in aa:
            benefit = FavoriteBenefit.objects.get(id=i)

            Favorite_Product_Benefit.objects.create(benefit=benefit, product=new_product)

        return Response('them thanh cong', status=status.HTTP_200_OK)

