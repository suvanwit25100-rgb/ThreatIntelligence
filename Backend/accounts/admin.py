from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ['username', 'email', 'role', 'clearance_level', 'division', 'is_active']
    list_filter = ['role', 'clearance_level', 'division', 'is_active']
    fieldsets = BaseUserAdmin.fieldsets + (
        ('Intelligence Profile', {'fields': ('role', 'clearance_level', 'division', 'avatar_initials')}),
    )
