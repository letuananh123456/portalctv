from django.shortcuts import render
from apps.users.models import User
from .models import RecruitmentCommission
from django.views import View
# Create your views here.

class Recruitment(View):
    def gecount_childrent(id):
        number_children = User.objects.filter(sponser=id).count()
        return number_children
