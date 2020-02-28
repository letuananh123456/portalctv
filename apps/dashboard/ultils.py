from django.utils.timezone import now
from .models import AgentChannel, ChannelSuccess, Channel
import numpy as np


def get_year():
    return now().year


def sum_agency_to_m(mm, yyyy):
    agenlist = AgentChannel.objects.filter(
        created_time__year=yyyy, created_time__month=mm)
    number_agenlist = agenlist.values_list('number_agent', flat=True)
    name_chanel = agenlist.values_list('distribution__name_chanel', flat=True)
    num_agenlist = np.array(number_agenlist)
    total_array = np.full(number_agenlist.count(), sum(number_agenlist))
    weight = np.round(((num_agenlist/total_array)*100), 2)
    return zip(list(name_chanel), total_array, weight)


def number_customer_to_m(mm, yyyy):
    numberlist = ChannelSuccess.objects.filter(
        created_time__year=yyyy, created_time__month=mm)
    number_customerlist = numberlist.values_list('number_customer', flat=True)
    number_policylist = numberlist.values_list('number_policy', flat=True)
    name_chanel = numberlist.values_list('distribution__name_chanel', flat=True)
    li1 = [i for i in number_customerlist]
    li2 = [i for i in number_policylist]
    a = np.array(li1)
    b = np.array(li2)
    ratio = np.round((b / a)*100,2)
    return zip(list(name_chanel), number_customerlist, number_policylist, ratio)


def diagram(id,yyyy):
    channellist = ChannelSuccess.objects.filter(
        created_time__year=yyyy, distribution_id=id)
    success_array = np.full(12, 0)
    for item in channellist:
        succes_rate = (item.number_policy/item.number_customer)*100
        mm = item.created_time.month
        success_array[mm] = succes_rate

    success_array = np.around(success_array, 2)
    return list(success_array)


def get_line_chart_print_value():
    yyyy = get_year()
    chanel_list = Channel.objects.all()

    final_data = []
    for chanel in chanel_list:
        sub_data = {}
        sub_data['chanel_name'] = chanel.name_chanel
        sub_data['list_data'] = diagram(chanel.id, yyyy)
        sub_data['color'] = chanel.color
        final_data.append(sub_data)
    return final_data