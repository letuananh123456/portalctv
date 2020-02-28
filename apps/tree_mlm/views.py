from django.shortcuts import render
from apps.users.models import User
from django.views import View
# Create your views here.

class AssignTree(View):
    def assign_children(self, request):
        id_1_moi = request.session.get('id1moi')
        id_2_moi = request.session.get('id2moi')
        sponser = User.sponser.objects.all()
        time = User.datecreate.objects.all().last()
        id_1 =User.id_1_sponser.objects.filter(datecreate=time)
        id_2 =User.id_2_child.objects.filter(datecreate=time)
        if sponser == 0:
            id_2 = id_1_moi
        if sponser > 0:
            id_1 = id_2_moi
        return render(request)