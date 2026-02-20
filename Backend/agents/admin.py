from django.contrib import admin
from .models import Candidate, Agent, TrainingRecord, AgentID, ClearanceRequest

@admin.register(Candidate)
class CandidateAdmin(admin.ModelAdmin):
    list_display = ['app_id', 'name', 'stage', 'specialization', 'physical_score', 'iq_score', 'priority']
    list_filter = ['stage', 'specialization', 'service', 'priority']
    search_fields = ['name', 'app_id']

@admin.register(Agent)
class AgentAdmin(admin.ModelAdmin):
    list_display = ['codename', 'real_name', 'status', 'clearance', 'division', 'deployed_country']
    list_filter = ['status', 'clearance', 'division']
    search_fields = ['codename', 'real_name']

@admin.register(TrainingRecord)
class TrainingRecordAdmin(admin.ModelAdmin):
    list_display = ['agent', 'module_name', 'score', 'passed']
    list_filter = ['passed', 'module_name']

@admin.register(AgentID)
class AgentIDAdmin(admin.ModelAdmin):
    list_display = ['id_number', 'agent', 'agency', 'clearance', 'status', 'issued', 'expiry']
    list_filter = ['status', 'agency']

@admin.register(ClearanceRequest)
class ClearanceRequestAdmin(admin.ModelAdmin):
    list_display = ['agent', 'current_level', 'requested_level', 'status', 'requested_date']
    list_filter = ['status']
