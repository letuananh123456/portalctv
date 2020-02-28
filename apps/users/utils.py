from django.utils import timezone
from apps.users.models import LoginHistory, ViTien, LogChuyenTien, User
from apps.welfare_commission.models import WelfareCommissions

def create_or_update_login_history(user_id):
    current_day = timezone.now()
    if LoginHistory.objects.filter(user_id=user_id).exists():
        user_login_day = LoginHistory.objects.filter(
            user_id=user_id
        ).order_by('-end_date').first()
        diff_date = current_day.date() - user_login_day.end_date
        if diff_date.days == 1:
            user_login_day.end_date = current_day.date()
            user_login_day.num_date = user_login_day.num_date + 1
            user_login_day.save()
        elif diff_date.days != 0:
            LoginHistory.objects.create(user_id=user_id)
    else:
        LoginHistory.objects.create(user_id=user_id)

def get_rate_from_level(lv):
    CTV = 0.3
    CV = 0.35
    CVCC = 0.40
    TP = 0.45
    TPCC = 0.50
    GD = 0.55
    GDCC = 0.60
    GDKV = 0.65
    GDM = 0.70
    BTTP = 0.75

    if lv == 0:
        return CTV
    elif lv == 1:
        return CV
    elif lv == 2:
        return CVCC
    elif lv == 3:
        return TP
    elif lv == 4:
        return TPCC
    elif lv == 5:
        return GD
    elif lv == 6:
        return GDCC
    elif lv == 7:
        return GDKV
    elif lv == 8:
        return GDM
    else:
        return BTTP


def get_red_bv_from_user(user):
    vitien = ViTien.objects.filter(user=user, da_chuyen_qua_vi_xanh=False)


def tinh_thuong_hoa_hong_ban_le(user_id, contract):

    #khi tu mua nhan tho thi update diem ca nhan personal_points
    try:
        user = User.objects.get(id=user_id)
    except:
        return 0

    if contract.type_product.is_nhan_tho == True:
        check_sponser_co_duoc_tienk = contract.type_product.commission_rate -  get_rate_from_level(user.level)
        
        bv_contract = get_rate_from_level(user.level)*contract.convert_bv
        current_day = timezone.now()
        text_desc = "HH:Bán lẻ:nhân thọ:Contract:"+str(contract.id)+":" +str(current_day)
        vt = ViTien.objects.create(user=user, bv_point=bv_contract, 
        bv_status=0, description=text_desc, source=4)
        LogChuyenTien.objects.create(user=user, vitien=vt, bv_point=vt.bv_point)

        if check_sponser_co_duoc_tienk >= 0.0:
            tien_cho_sponser = contract.convert_bv*check_sponser_co_duoc_tienk
            vt = ViTien.objects.create(user=user.sponser, bv_point=bv_contract, 
            bv_status=0, description=text_desc, source=4)
            LogChuyenTien.objects.create(user=user.sponser, vitien=vt, bv_point=vt.bv_point)
            # ghi nhan cho ponser 


    else:
        # tính hoa hồng bán lẻ cho bảo hiểm phi nhân thọ
        try:
            bv_contract = contract.convert_bv
            bv_thuong = contract.type_product.commission_rate*bv_contract
            current_day = timezone.now()
            text_desc = "HH:Bán lẻ:Phi nhân thọ:Contract:"+str(contract.id)+":" +str(current_day)
            vt = ViTien.objects.create(user=user, bv_point=bv_thuong, 
            bv_status=0, description=text_desc, source=4)
            LogChuyenTien.objects.create(user=user, vitien=vt, bv_point=vt.bv_point)
            # user.bv_green = user.bv_green + bv_thuong
        except:
            return 0


def gan_cay_that(user_bi_gan, user_current):
    list_user = User.objects.filter(sponser=user_current).order_by('-datecreate')
    if list_user.count() > 0:
        ur = list_user.first()
        ur.id_1_sponser = user_bi_gan.id
    else:
        user_current.id_2_child =  user_bi_gan.id
    
    ur.save()
    user_current.save()
        

def gan_cay_ao(user_bi_gan, pos, ref_user):
    user_bi_gan.reference = ref_user.id
    user_bi_gan.position = pos
    user_bi_gan.save()


def get_parent(user):
    """
    Ham get parent truyền vào user nào sẽ trả về cha của nó 
    nếu cha của nó deactive thì trả về thằng cha nữa của nó 
    nếu thằng cha của nó bằng null hoặc 0 thì nó là nút gốc 
    """
    parent = user.sponser #f1
    if parent == None or parent == 0:
        return

    if parent.is_active == False:
         return get_parent(parent)

    return parent
        


# #get paren 
#         parent_objedt = User.objects.get(id=parent) #f1
#         if parent_objedt.is_active is True:
#             # di cong tien f1 
#         else:
#             #
def hoa_hong_tuyen_dung(user_them_moi, BV_tong_hop_dong_cho_gan):
    f1 = get_parent(user_them_moi) #luon ton tại và active 
    #f1 được 10 % commit của BV tổng hợp đồng chờ gán cây 
    bv_tuyen_dung = int(0.1*BV_tong_hop_dong_cho_gan)
    f1.recruitment_commission += bv_tuyen_dung
    LogTuyenDung.objects.create(user=f1, bv_tuyendung=bv_tuyen_dung, id_cua_nguoi_duoc_tuyen=user_them_moi.id)
    f1.save()
    #f2
    f2 = get_parent(f1)
    if f2 is None or f2 is 0:
        return 

    #tồn tại f2 
    bv_tuyen_dung = int(0.02*BV_tong_hop_dong_cho_gan)
    f2.recruitment_commission += bv_tuyen_dung
    LogTuyenDung.objects.create(user=f2, bv_tuyendung=bv_tuyen_dung, id_cua_nguoi_duoc_tuyen=user_them_moi.id)
    f2.save()
    #----
    #f3
    f3 = get_parent(f2)

    if f3 is None or f3 is 0:
        return 
    
    # tồn tại f3
    bv_tuyen_dung = int(0.01*BV_tong_hop_dong_cho_gan)
    f3.recruitment_commission += bv_tuyen_dung
    LogTuyenDung.objects.create(user=f3, bv_tuyendung=bv_tuyen_dung, id_cua_nguoi_duoc_tuyen=user_them_moi.id)
    f3.save()

    #f4
    f4 = get_parent(f3)
    if f4 is None or f4 is 0: #check f4 tồn tại
        return

    # check f4 mấy con
    if User.objects.filter(sponser=f4).count() >= 2:
        bv_tuyen_dung = int(0.01*BV_tong_hop_dong_cho_gan)
        f4.recruitment_commission += bv_tuyen_dung
        LogTuyenDung.objects.create(user=f4, bv_tuyendung=bv_tuyen_dung, id_cua_nguoi_duoc_tuyen=user_them_moi.id)
        f4.save()

    #f5
    f5 = get_parent(f4)
    if f5 is None or f5 is 0:
        return 
    
    if User.objects.filter(sponser=f5).count() >= 3:
        bv_tuyen_dung = int(0.01*BV_tong_hop_dong_cho_gan)
        f5.recruitment_commission += bv_tuyen_dung
        LogTuyenDung.objects.create(user=f5, bv_tuyendung=bv_tuyen_dung, id_cua_nguoi_duoc_tuyen=user_them_moi.id)
        f5.save()
    #f6
    f6 = get_parent(f5)
    if f6 is None or f6 is 0:
        return 
    
    if User.objects.filter(sponser=f5).count() >= 4:
        bv_tuyen_dung = int(0.04*BV_tong_hop_dong_cho_gan)
        f6.recruitment_commission += bv_tuyen_dung
        LogTuyenDung.objects.create(user=f6, bv_tuyendung=bv_tuyen_dung, id_cua_nguoi_duoc_tuyen=user_them_moi.id)
        f5.save()


def get_bv_hop_dong_cho_gan(user_bi_gan):
    return 0


def get_so_con(user_id):
    return User.objects.filter(sponser=user_id).count()

def hoa_hong_tuong_tro(user_bi_gan):
    if user_bi_gan.sponser is None or user_bi_gan.sponser is 0: #check f4 tồn tại
        return
    so_con = get_so_con(user_bi_gan.sponser)
    hoa_hong_tuyen_dung_sp = User.objects.get(user_bi_gan.sponser).recruitment_commission
    hoa_hong_tuyen_dung1 = int(hoa_hong_tuyen_dung_sp*0.05)
    
    f2 = get_parent(user_bi_gan.sponser) #luon ton tại và active 
    if f2 != None and f2 != 0:
        hoa_hong_tuyen_dung2 = f2.recruitment_commission*0.04
    else:
         hoa_hong_tuyen_dung2 = 0

    

    f3 = get_parent(f2)
    if f3 != None and f3 != 0:
        hoa_hong_tuyen_dung3 = f3.recruitment_commission*0.03 
    else:
        hoa_hong_tuyen_dung3 = 0

    

    f4 = get_parent(f3)
    if f4 != None and f4 != 0:
        hoa_hong_tuyen_dung4 = f4.recruitment_commission*0.02 
    else:
        hoa_hong_tuyen_dung4 = 0
    

    f5 = get_parent(f4)
    if f5 != None and f5 != 0:
        hoa_hong_tuyen_dung5 = f5.recruitment_commission*0.01
    else:
        hoa_hong_tuyen_dung5 = 0

    tong = hoa_hong_tuyen_dung1+hoa_hong_tuyen_dung2+hoa_hong_tuyen_dung3+hoa_hong_tuyen_dung4+hoa_hong_tuyen_dung5
    avg = int(tong/so_con)
    list_u =  User.objects.filter(sponser=user_bi_gan.sponser)
    for us in list_u:
        us.mutual_commissions += avg
        us.save()


def travel_tree_and_update_group_commission(user_bi_gan, bv_contract):

    parent = user_bi_gan.sponser #f1
    if parent == None or parent == 0:
        return
    parent.group_commissions += bv_contract
    return travel_tree_and_update_group_commission(parent, bv_contract)


def is_two_child_and_active(user_current):
    is_child1 = False
    is_child2 = False
    if user_current.id_1_sponser != None and user_current.id_1_sponser != 0 and user_current.id_1_sponser.is_active:
        is_child1 = True
    
    if user_current.id_2_child != None and user_current.id_2_child != 0 and user_current.id_2_child.is_active:
        is_child2 = True
    
    if is_child1 and is_child2:
        return True
    
    return False


def min_group_commission_from_user(user_current):
    min_commit = min(user_current.id_1_sponser.group_commissions, user_current.id_2_child.group_commissions)
    return min_commit


def phan_tram_doanh_so_ca_nhan(user_current):
    per_point = user_current.personal_points

    if per_point >= 2280:
        return 0.15
    
    if per_point >= 1216:
        return 0.13

    if per_point >= 608:
        return 0.12

    if per_point >= 380:
        return 0.1

    if per_point >= 130:
        return 0.075

    return 0

def convert_bv_from_monney(monney):
    return int(monney/23000)


def tinh_tien_nhom_from_min_commission_group2(min_commiss, phan_tram, per_point):
    bv_min_gr = int(min_commiss*phan_tram)

    if per_point >= 2280:
        return min(convert_bv_from_monney(1200000000), bv_min_gr)
    
    if per_point >= 1216:
        return min(convert_bv_from_monney(300000000), bv_min_gr)

    if per_point >= 608:
        return min(convert_bv_from_monney(150000000), bv_min_gr)

    if per_point >= 380:
        return min(convert_bv_from_monney(70000000), bv_min_gr)

    if per_point >= 130:
        return min(convert_bv_from_monney(20000000), bv_min_gr)
    
    return 0

def update_tree_group_commitson(user_current):
    sub_commission = user_current.id_1_sponser.group_commissions -  user_current.id_2_child.group_commissions
    if sub_commission >= 0:
        user_current.id_1_sponser.group_commissions = sub_commission
        user_current.id_2_child.group_commissions = 0
        user_current.save()
    
    else:
        user_current.id_2_child.group_commissions = abs(sub_commission)
        user_current.id_1_sponser.group_commissions = 0


#share task 
def tinh_hoa_hong_nhom(user_current):

    """
    cứ ngày 28 hàng tháng chạy 1 lần để tính hoa hồng nhóm
    """
    per_point = user_current.personal_points

    if is_two_child_and_active(user_current):
        min_commiss = min_group_commission_from_user(user_current)
        phan_tram = phan_tram_doanh_so_ca_nhan(user_current)
        tien_hoa_hong_nhom = tinh_tien_nhom_from_min_commission_group2(min_commiss, phan_tram, per_point)
        user_current.group_commissions2 = tien_hoa_hong_nhom
        update_tree_group_commitson(user_current)

    return


#celery
def update_tree():
    lis = User.objects.all()
    for item in lis:
        tinh_hoa_hong_nhom(item)


def travel_tree_and_update_career_commission(user_bi_gan, bv_contract):

    parent = user_bi_gan.sponser #f1
    if parent == None or parent == 0:
        return
    parent.career_commission += bv_contract
    return travel_tree_and_update_career_commission(parent, bv_contract)


def get_number_of_child(user_current):
    list_user = User.objects.filter(sponser=user_current)
    return list_user.count()

def have_one_child_great_than_xx(user_current, bv_career):
    list_user = User.objects.filter(sponser=user_current, career_commission__gte=bv_career)
    if list_user.exists():
        return list_user.first().id
    else:
        return False

def doanh_so_nhom_con_lai_BTTP(user_current, bv_career):
    temp1 = have_one_child_great_than_xx(user_current, bv_career)
    if temp1 != False:
        lis_ui = User.objects.filter(sponser=user_current).exclude(id=temp1)
        sum_ = 0
        for item in lis_ui:
            sum_ += item.career_commission
        
        if sum_ >= bv_career:
            return True
    else:
        return False


def have_three_child_great_than_xx(user_current, bv_career):
    list_user = User.objects.filter(sponser=user_current, career_commission__gte=bv_career).order_by('-career_commission')

    if list_user.count() >= 3:
        els = []
        for it in list_user[:3]:
            els.append(it.id)
        return els
    else:
        return False


def doanh_so_nhom_con_lai_GDM(user_current, bv_career):
    temp1 = have_three_child_great_than_xx(user_current, bv_career)
    if temp1 != False:
        lis_ui = User.objects.filter(sponser=user_current).exclude(id__in=temp1)
        sum_ = 0
        for item in lis_ui:
            sum_ += item.career_commission
        
        if sum_ >= bv_career:
            return True
    else:
        return False



def have_2_child_great_than_xx_GDKV(user_current, bv_career):
    list_user = User.objects.filter(sponser=user_current, career_commission__gte=bv_career).order_by('-career_commission')

    if list_user.count() >= 2:
        els = []
        for it in list_user[:2]:
            els.append(it.id)
        return els
    else:
        return False


def doanh_so_nhom_con_lai_GDKV(user_current, bv_career):
    temp1 = have_three_child_great_than_xx(user_current, bv_career)
    if temp1 != False:
        lis_ui = User.objects.filter(sponser=user_current).exclude(id__in=temp1)
        sum_ = 0
        for item in lis_ui:
            sum_ += item.career_commission
        
        if sum_ >= bv_career:
            return True
    else:
        return False
"""
    Hệ thống tree cây có note gôc bắt đầu id từ 1s
    , unique=True
    level:
    1: CTV
    2: Chuyên Viên 
    3: Chuyên viên cấp cao
    4: Trưởng phòng
    5: Trưởng phòng cấp cao
    6: Giám đốc 
    7: Giám đốc cấp cao 
    8: giám đốc khu vực
    9: Giám đốc miền
    10: Bàn tròn triệu phú
"""

def check_con_la_giam_doc_mien(user_current):
    list_user = User.objects.filter(sponser=user_current, level=9)
    if list_user.count() > 4:
        return True
    return False

def check_con_la_giam_doc_khu_vuc(user_current):
    list_user = User.objects.filter(sponser=user_current, level=8)
    if list_user.count() > 4:
        return True
    return False

def check_con_la_giam_doc_cap_cao(user_current):
    list_user = User.objects.filter(sponser=user_current, level=7)
    if list_user.count() > 3:
        return True
    return False


def check_con_la_giam_doc(user_current):
    list_user = User.objects.filter(sponser=user_current, level=6)
    if list_user.count() > 3:
        return True
    return False


def check_con_la_truong_phong_cap_cap(user_current):
    list_user = User.objects.filter(sponser=user_current, level=5)
    if list_user.count() > 3:
        return True
    return False

def check_con_la_truong_phong(user_current):
    list_user = User.objects.filter(sponser=user_current, level=4)
    if list_user.count() > 2:
        return True
    return False


def check_con_la_chuyen_vien_cap_cao(user_current):
    list_user = User.objects.filter(sponser=user_current, level=3)
    if list_user.count() > 2:
        return True
    return False

def check_con_la_chuyen_vien(user_current):
    list_user = User.objects.filter(sponser=user_current, level=2)
    if list_user.count() > 2:
        return True
    return False


#celery task
def tinh_hoa_hong_cap_bac(user_current):

    if get_number_of_child(user_current) >= 4 and check_con_la_giam_doc_mien(user_current) and have_one_child_great_than_xx(user_current, 4536862) and doanh_so_nhom_con_lai_BTTP(user_current, 4536862):
        bb = 23000000000 - 15000000000
        user_current.career_commission2 += convert_bv_from_monney(bb)
        user_current.welfare_commission += 45000
        user_current.save()
        return 
    if get_number_of_child(user_current) >= 4 and check_con_la_giam_doc_khu_vuc(user_current) and have_three_child_great_than_xx(user_current, 2835538) and doanh_so_nhom_con_lai_GDM(user_current, 2835538):
        bb = 15000000000 - 7500000000
        user_current.career_commission2 += convert_bv_from_monney(bb)
        user_current.welfare_commission += 25000
        user_current.save()
        return
    if get_number_of_child(user_current) >= 3 and check_con_la_giam_doc_cap_cao(user_current) and have_2_child_great_than_xx_GDKV(user_current, 1890359) and doanh_so_nhom_con_lai_GDKV(user_current, 1890359):
        bb = 7500000000 - 2250000000
        user_current.career_commission2 += convert_bv_from_monney(bb)
        user_current.welfare_commission += 35000
        user_current.save()
        return

    if get_number_of_child(user_current) >= 3 and check_con_la_giam_doc(user_current) and have_one_child_great_than_xx(user_current, 567108) and doanh_so_nhom_con_lai(user_current, 567108):
        bb = 2250000000 - 750000000
        user_current.career_commission2 += convert_bv_from_monney(bb)
        user_current.welfare_commission += 10000
        user_current.save()
        return

    if get_number_of_child(user_current) >= 3 and check_con_la_truong_phong_cap_cap(user_current) and have_2_child_great_than_xx_GDKV(user_current, 189036) and doanh_so_nhom_con_lai_GDKV(user_current, 189036):
        bb = 750000000 - 150000000
        user_current.career_commission2 += convert_bv_from_monney(bb)
        user_current.welfare_commission += 3500
        user_current.save()
        return

    #truong phong cap cao
    if get_number_of_child(user_current) >= 2 and check_con_la_truong_phong(user_current) and have_one_child_great_than_xx(user_current, 56710) and doanh_so_nhom_con_lai(user_current, 56710):
        bb = 150000000 - 50000000
        user_current.career_commission2 += convert_bv_from_monney(bb)
        user_current.welfare_commission += 1000
        user_current.save()
        return
    
    # truong phong
    if get_number_of_child(user_current) >= 2 and check_con_la_chuyen_vien_cap_cao(user_current) and have_one_child_great_than_xx(user_current, 18930) and doanh_so_nhom_con_lai(user_current, 18930):
        bb = 30000000
        user_current.career_commission2 += convert_bv_from_monney(bb)
        user_current.welfare_commission += 300
        user_current.save()
        return
    
    #chuyen vien cc
    if get_number_of_child(user_current) >= 2 and check_con_la_chuyen_vien(user_current) and have_one_child_great_than_xx(user_current, 7561) and doanh_so_nhom_con_lai(user_current, 7561):
        bb = 15000000
        user_current.career_commission2 += convert_bv_from_monney(bb)
        user_current.welfare_commission += 150
        user_current.save()
        return
    
    if get_number_of_child(user_current) >= 2 and have_one_child_great_than_xx(user_current, 1890) and doanh_so_nhom_con_lai(user_current, 1890):
        bb = 5000000
        user_current.career_commission2 += convert_bv_from_monney(bb)
        user_current.welfare_commission += 50
        user_current.save()
        return


#celery 1 năm 1 lần
def quy_an_sinh(user_current):
    # OPTION_TYPE_AN_SINH = [
    #     (0, "Du lịch"),
    #     (1, "Xe"),
    #     (2, "Nhà")
    # ]
    if user_current.welfare_commission >= 250000:
        WelfareCommissions.objects.create(user=user_current, type_an_sinh=2)
    
    if user_current.welfare_commission >= 21500:
        WelfareCommissions.objects.create(user=user_current, type_an_sinh=1)
    
    if user_current.welfare_commission >= 750:
        WelfareCommissions.objects.create(user=user_current, type_an_sinh=0)

    


def gan_cay(user_bi_gan, user_current, pos, ref_user):
    gan_cay_ao(user_bi_gan, pos, ref_user)
    gan_cay_that(user_bi_gan, user_current)
    BV_tong_hop_dong_cho_gan  = get_bv_hop_dong_cho_gan(user_bi_gan)
    hoa_hong_tuyen_dung(user_them_moi=user_bi_gan, BV_tong_hop_dong_cho_gan)
    hoa_hong_tuong_tro(user_bi_gan)
    travel_tree_and_update_group_commission(user_bi_gan, BV_tong_hop_dong_cho_gan)
    travel_tree_and_update_career_commission(user_bi_gan, BV_tong_hop_dong_cho_gan)





# -  Bước 1 lấy tất cả hợp đồng mà user đang login là sponser 
# (người giới thiễu) mà user mua hợp đồng chưa tồn tại trong bảng user ( cây)
# tức là chưa được gán cây

"""
# hàm này tính hoa hồng tuyển dụng cho User đang login (chính là tham số của hàm) và những tuyến trên của user đang login
Hàm này gọi khi [user đang login](tham số của hàm) có user id mua [user id ở trong contract] 
Tồn tại contract ở tình trạng đã ACK, và giá trị phí lớn hơn 380 BV 
"""
