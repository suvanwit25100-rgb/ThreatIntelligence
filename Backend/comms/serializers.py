from rest_framework import serializers
from .models import Thread, Message, CheckIn, DeadDrop, ExtractionRequest


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'
        read_only_fields = ['timestamp']


class ThreadSerializer(serializers.ModelSerializer):
    last_message = serializers.SerializerMethodField()
    message_count = serializers.SerializerMethodField()

    class Meta:
        model = Thread
        fields = '__all__'

    def get_last_message(self, obj):
        msg = obj.messages.order_by('-timestamp').first()
        return MessageSerializer(msg).data if msg else None

    def get_message_count(self, obj):
        return obj.messages.count()


class CheckInSerializer(serializers.ModelSerializer):
    class Meta:
        model = CheckIn
        fields = '__all__'


class DeadDropSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeadDrop
        fields = '__all__'


class ExtractionRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExtractionRequest
        fields = '__all__'
        read_only_fields = ['requested_at']
