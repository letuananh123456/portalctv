from django.shortcuts import render
from apps.users.models import User
from django.views import View

# Create your views here.

class BinaryTree(View):
    
    def get(self, request):  
        left = User.objects.filter(position=0)
        right = User.objects.filter(position=1)
        # reference = User.objects.filter(reference=reference)
        ten = User.object.filter(userid=User.userid)
        print('qeqeweeq=')
        # url_link = "BL2020" +ten.userid
        # print(url_link)
        context = {
            'left': left,
            'right': right,
            # 'reference': reference,     
        }
        return render(request, 'ds_chogan/caynhiphan.html', context)
        #     def post(id):
        # number_children = User.objects.filter(sponser=id).count()
        # return number_children
