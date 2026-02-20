from rest_framework import serializers
from .models import Mission, Deployment


class MissionSerializer(serializers.ModelSerializer):
    assigned_agent_codename = serializers.CharField(source='assigned_agent.codename', read_only=True, default=None)

    class Meta:
        model = Mission
        fields = '__all__'
        read_only_fields = ['created_at']


class DeploymentSerializer(serializers.ModelSerializer):
    agent_codename = serializers.CharField(source='agent.codename', read_only=True)
    mission_codename = serializers.CharField(source='mission.codename', read_only=True)

    class Meta:
        model = Deployment
        fields = '__all__'
