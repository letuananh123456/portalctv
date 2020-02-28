from django.contrib import admin
from .models import User

# Re-register UserAdmin
class UserAAdmin(admin.ModelAdmin):
    list_display = ('id', 'username')


admin.site.register(User,  UserAAdmin)

# from .models import Token, LoginHistory, Notification, UserNotification


# class TokenAdmin(admin.ModelAdmin):
#     list_display = ('key', 'user', 'created')


# class RatingAdmin(admin.ModelAdmin):
#     list_display = ('id', 'user', 'num_stars', 'comment', 'created_at')


# class LoginHistoryAdmin(admin.ModelAdmin):
#     list_display = ('id', 'user', 'start_date', 'end_date', 'num_date')


# class NotificationAdmin(admin.ModelAdmin):
#     list_display = ('id', 'title', 'body', 'created_at')


# class UserNotificationAdmin(admin.ModelAdmin):
#     list_display = ('id', 'user', 'notification', 'is_read', 'created_at')


# admin.site.register(Token, TokenAdmin)
# admin.site.register(LoginHistory, LoginHistoryAdmin)
# admin.site.register(Notification, NotificationAdmin)
# admin.site.register(UserNotification, UserNotificationAdmin)
