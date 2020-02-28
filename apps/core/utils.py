from rest_framework.serializers import Serializer
import locale
import hashlib
import urllib
import urllib.parse
import json
from django.utils.http import urlencode



def convert_price_to_string(price):
    return f"{price:,}"


def validate_data(schema_cls: Serializer, data: dict) -> dict:
    """Validate data using Marshmallow schema
    Return validated data if success, raise ValidationError if failed
    """
    schema = schema_cls(data=data)
    schema.is_valid(raise_exception=True)
    return schema.validated_data


def h__md5(input):
    byteInput = input.encode('utf-8')
    return hashlib.sha256(byteInput).hexdigest()


def get_request_hash_data(data_dict, secret_key):
    hash_value = data_dict
    data = json.dumps(data_dict)
    hashValue = h__md5(secret_key + data)
    hash_value['secret'] = hashValue
    return hash_value


def validate_response(data_dict, secret_key):
    secure_hash = data_dict.pop('secret')
    data = json.dumps(data_dict)
    hashValue = h__md5(secret_key + data)
    return secure_hash == hashValue

