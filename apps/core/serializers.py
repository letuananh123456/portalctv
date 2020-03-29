from rest_framework import serializers

class ListItemProvincial(serializers.Serializer):
    thanhpho = serializers.IntegerField()


class ListItemDistrict(serializers.Serializer):
    name = serializers.CharField()
    slug = serializers.CharField()
    type_ciy = serializers.CharField()
    name_with_type = serializers.CharField()
    path = serializers.CharField()
    path_with_type = serializers.CharField()
    code = serializers.CharField()
    parent_code = serializers.IntegerField()

class APIthanhpho(serializers.Serializer):
    name = serializers.CharField()
    code = serializers.IntegerField()

class APIhuyen(serializers.Serializer):
    name = serializers.CharField()
    parent_code = serializers.IntegerField()    