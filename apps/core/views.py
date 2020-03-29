from django.shortcuts import render, redirect
from django.views import View
from .models import District
from rest_framework.views import exception_handler as drf_exception_handler
from . import serializers as core_serializers
import json
import json
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework import status
from . import models as core_models
# from apps.core.utils import validate_data
from rest_framework.renderers import TemplateHTMLRenderer, JSONRenderer
# Create your views here.


# Create your views here.
def exception_handler(exc, context):
    response = drf_exception_handler(exc, context)
    return response


class GetListItemProvincial(APIView):   
    permission_classes = (permissions.AllowAny,)
    def post(self, request): 
        valid_data = validate_data(core_serializers.ListItemProvincial, request.data)
        thanhpho = valid_data.get('thanhpho')
        
        x = District.objects.filter(parent_code=thanhpho)
        list_item=[]
        for item in x:
            sub_item = {}
            sub_item['name'] = item.name
            sub_item['code'] = item.parent_code
            list_item.append(sub_item)
    
        data = {
            'district' : list_item
        }
        # print("fdsaf",x)
        return Response(data, status=status.HTTP_200_OK)  


class ThanhPhoAPIView(APIView):
    permission_classes = (permissions.AllowAny, )
    renderer_classes = (JSONRenderer, TemplateHTMLRenderer, )
    def post(self, request, format=None):
        valid_data = validate_data(core_serializers.APIthanhpho, request.data)

        name = valid_data.get('name')
        code = valid_data.get('code')
        
        
        gsp = core_models.Provincial.objects.get_or_create(name=name,code=code)
        return Response(1, status=status.HTTP_200_OK)  

class HuyenAPIView(APIView):
    permission_classes = (permissions.AllowAny, )
    renderer_classes = (JSONRenderer, TemplateHTMLRenderer, )
    def post(self, request, format=None):
        valid_data = validate_data(core_serializers.APIhuyen, request.data)

        name = valid_data.get('name')
        parent_code = valid_data.get('parent_code')
        
        gsp = core_models.District.objects.get_or_create(name=name,parent_code=parent_code)
        return Response(1, status=status.HTTP_200_OK)        
