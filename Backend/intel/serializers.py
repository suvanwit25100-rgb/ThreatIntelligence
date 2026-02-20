from rest_framework import serializers
from .models import Alert, UserPreference, SearchHistory, ThreatHistory


class AlertSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alert
        fields = '__all__'


class UserPreferenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPreference
        fields = ['favorites', 'watchlist', 'alert_settings', 'theme', 'dashboard_layout']


class SearchHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SearchHistory
        fields = ['id', 'query', 'filters', 'timestamp']
        read_only_fields = ['id', 'timestamp']


class ThreatHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ThreatHistory
        fields = '__all__'
