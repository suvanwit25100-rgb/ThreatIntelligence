from django.contrib import admin
from .models import Thread, Message, CheckIn, DeadDrop, ExtractionRequest

@admin.register(Thread)
class ThreadAdmin(admin.ModelAdmin):
    list_display = ['id', 'subject', 'priority', 'encryption_type', 'created_at']
    list_filter = ['priority']

@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ['thread', 'sender', 'is_encrypted', 'timestamp']
    list_filter = ['is_encrypted']

@admin.register(CheckIn)
class CheckInAdmin(admin.ModelAdmin):
    list_display = ['agent_codename', 'status', 'last_checkin', 'next_expected']
    list_filter = ['status']

@admin.register(DeadDrop)
class DeadDropAdmin(admin.ModelAdmin):
    list_display = ['location_codename', 'city', 'status', 'assigned_agent']
    list_filter = ['status']

@admin.register(ExtractionRequest)
class ExtractionRequestAdmin(admin.ModelAdmin):
    list_display = ['agent_codename', 'location', 'threat_level', 'status', 'requested_at']
    list_filter = ['status']
