from django.urls import path
from . import views

urlpatterns = [
    path('api/staff/', views.StaffCreateView.as_view(), name='staff-create'),
    path('api/staffdet/<int:pk>/', views.StaffDetailView.as_view(), name='staff-detail'),
    path('api/login/', views.login_user, name='login_user'),
    path('api/staffdet/', views.StaffListView.as_view(), name='staff-list'),
     path('api/staffdet/<int:pk>/', views.StaffDetailUpdateDeleteView.as_view(), name='staff-detail'),
]
