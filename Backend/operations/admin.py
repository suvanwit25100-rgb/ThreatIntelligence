from django.contrib import admin
from .models import Mission, Deployment

@admin.register(Mission)
class MissionAdmin(admin.ModelAdmin):
    list_display = ['mission_id', 'codename', 'type', 'status', 'classification', 'risk_level', 'assigned_agent']
    list_filter = ['status', 'type', 'classification']
    search_fields = ['mission_id', 'codename']

@admin.register(Deployment)
class DeploymentAdmin(admin.ModelAdmin):
    list_display = ['agent', 'mission', 'status', 'deployed_date', 'days_deployed']
    list_filter = ['status']
