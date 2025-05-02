from django.urls import path
from .views import staff_profile

urlpatterns = [
    path('api/staff/', staff_profile, name='staff_profile')
]
