from rest_framework import serializers


class UpdateAgencySerializer(serializers.Serializer):
    number_of_agency = serializers.IntegerField(required=True)
    mm = serializers.IntegerField(required=True)
    yyyy = serializers.IntegerField(required=True)


class UpdateAgencyChannelSerializer(serializers.Serializer):
    number_of_agency = serializers.IntegerField(required=True)
    mm = serializers.IntegerField(required=True)
    yyyy = serializers.IntegerField(required=True)
    channel = serializers.IntegerField(required=True)


class UpdateNumberCustomerSerializer(serializers.Serializer):
    number_of_customer = serializers.IntegerField(required=True)
    mm = serializers.IntegerField(required=True)
    yyyy = serializers.IntegerField(required=True)

class UpdateNumberCustomerLocationSerializer(serializers.Serializer):
    number_of_customer = serializers.IntegerField(required=True)
    mm = serializers.IntegerField(required=True)
    yyyy = serializers.IntegerField(required=True)
    location = serializers.IntegerField(required=True)

class UpdateNumberCustomerChannelSerializer(serializers.Serializer):
    number_of_customer = serializers.IntegerField(required=True)
    mm = serializers.IntegerField(required=True)
    yyyy = serializers.IntegerField(required=True)
    channel = serializers.IntegerField(required=True)

class UpdateSuccessRateSerializer(serializers.Serializer):
    number_of_customer = serializers.IntegerField(required=True)
    number_of_policy = serializers.IntegerField(required=True)
    mm = serializers.IntegerField(required=True)
    yyyy = serializers.IntegerField(required=True)


class UpdateSuccessChannelSerializer(serializers.Serializer):
    number_of_customer = serializers.IntegerField(required=True)
    number_of_policy = serializers.IntegerField(required=True)
    mm = serializers.IntegerField(required=True)
    yyyy = serializers.IntegerField(required=True)
    channel = serializers.IntegerField(required=True)


class UpdateProductStatisticSerializer(serializers.Serializer):
    number_of_customer = serializers.IntegerField(required=True)
    mm = serializers.IntegerField(required=True)
    yyyy = serializers.IntegerField(required=True)
    name_of_product = serializers.IntegerField(required=True)
    id = serializers.IntegerField(required=True)


class UpdateFavoriteProductSerializer(serializers.Serializer):
    mm = serializers.IntegerField(required=True)
    yyyy = serializers.IntegerField(required=True)
    name_of_product = serializers.IntegerField(required=True)
    sa = serializers.IntegerField(required=True)
    policy_term = serializers.IntegerField(required=True)
    payment_term = serializers.IntegerField(required=True)
    ways_to_get_benefit = serializers.CharField(max_length=200)
    id_benefit = serializers.CharField(max_length=200)
