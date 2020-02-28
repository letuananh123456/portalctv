from django.shortcuts import render
from rest_framework.response import Response
from django.shortcuts import render, redirect, get_object_or_404
from rest_framework.views import APIView
from rest_framework import permissions
from apps.core.utils import validate_data
from django.contrib.auth import authenticate
from apps.core.exceptions import HTTP401AuthenticationError, HTTP404NotFoundError, HTTP409ConflictError

# Create your views here.

class UpdateOrderContract(APIView):
    permission_classes = (permissions.AllowAny,)
    
    def post(self, request):
        return Response('update oke', status=status.HTTP_200_OK)