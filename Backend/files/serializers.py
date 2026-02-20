from rest_framework import serializers
from .models import GovFile


class GovFileSerializer(serializers.ModelSerializer):
    created_by_username = serializers.CharField(source='created_by.username', read_only=True, default=None)

    class Meta:
        model = GovFile
        fields = '__all__'
        read_only_fields = ['created_at']
