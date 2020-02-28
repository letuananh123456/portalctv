from rest_framework import serializers

class UpdateUserSerializer(serializers.Serializer):
    username = serializers.CharField(required=True, allow_blank=False)
    password = serializers.CharField(required=True, allow_blank=False)
    secret = serializers.CharField(required=True, allow_blank=False)