from django.contrib import admin
from .models import GovFile

@admin.register(GovFile)
class GovFileAdmin(admin.ModelAdmin):
    list_display = ['title', 'classification', 'category', 'department', 'created_by', 'created_at']
    list_filter = ['classification', 'category']
    search_fields = ['title', 'department']
