from rest_framework import serializers
from .models import Candidate, Agent, TrainingRecord, AgentID, ClearanceRequest


class CandidateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Candidate
        fields = '__all__'
        read_only_fields = ['app_id', 'created_at']


class TrainingRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrainingRecord
        fields = '__all__'


class AgentSerializer(serializers.ModelSerializer):
    training_records = TrainingRecordSerializer(many=True, read_only=True)

    class Meta:
        model = Agent
        fields = '__all__'


class AgentListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Agent
        fields = ['id', 'codename', 'real_name', 'batch', 'specialization', 'clearance', 'status', 'division', 'skills', 'deployed_country']


class AgentIDSerializer(serializers.ModelSerializer):
    agent_codename = serializers.CharField(source='agent.codename', read_only=True)

    class Meta:
        model = AgentID
        fields = '__all__'
        read_only_fields = ['issued']


class ClearanceRequestSerializer(serializers.ModelSerializer):
    agent_codename = serializers.CharField(source='agent.codename', read_only=True)

    class Meta:
        model = ClearanceRequest
        fields = '__all__'
        read_only_fields = ['requested_date']
