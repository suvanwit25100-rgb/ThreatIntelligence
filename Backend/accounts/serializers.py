from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'role', 'clearance_level', 'division', 'avatar_initials', 'date_joined']
        read_only_fields = ['id', 'date_joined']


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=4)

    class Meta:
        model = User
        fields = ['username', 'password', 'email', 'first_name', 'last_name', 'role', 'division']

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
