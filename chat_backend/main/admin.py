from django.contrib import admin
from .models import User, Message


class UserAdmin(admin.ModelAdmin):
    search_fields = ('name',)


class MessageAdmin(admin.ModelAdmin):
    list_filter = ('sender', 'receiver')


admin.site.register(User, UserAdmin)
admin.site.register(Message, MessageAdmin)