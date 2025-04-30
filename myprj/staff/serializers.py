from rest_framework import serializers
from .models import *

class Staff_Profile_szr(serializers.ModelSerializer):
    class Meta:
        model = Staff_Profile
        fields = '__all__'
        read_only_fields = ['username']