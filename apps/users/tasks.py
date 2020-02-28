from __future__ import absolute_import, unicode_literals

from datetime import timedelta
import requests
from celery import shared_task
from celery.utils.log import get_task_logger
from django.conf import settings
import time
from insecom.celery import app

_logger = get_task_logger(__name__)


@app.task
def test_func():
    print('resssssssss=')
    time.sleep(10)
    print("10 giay sau")
    r = requests.get('http://dummy.restapiexample.com/api/v1/employees')
    print(r.status_code)
        
