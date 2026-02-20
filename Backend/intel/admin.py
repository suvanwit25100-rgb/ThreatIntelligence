from django.contrib import admin
from .models import Alert, UserPreference, SearchHistory, ThreatHistory

@admin.register(Alert)
class AlertAdmin(admin.ModelAdmin):
    list_display = ['country', 'priority', 'category', 'read', 'timestamp']
    list_filter = ['priority', 'category', 'read']
    search_fields = ['country', 'event']

@admin.register(UserPreference)
class UserPreferenceAdmin(admin.ModelAdmin):
    list_display = ['user', 'theme']

@admin.register(SearchHistory)
class SearchHistoryAdmin(admin.ModelAdmin):
    list_display = ['user', 'query', 'timestamp']

@admin.register(ThreatHistory)
class ThreatHistoryAdmin(admin.ModelAdmin):
    list_display = ['country', 'threat_level', 'threat_score', 'timestamp']
    list_filter = ['threat_level']
