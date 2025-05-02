from django.shortcuts import render
from .serializers import *
from .models import *
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
# Create your views here.
# views.py
class StaffCreateView(generics.CreateAPIView):
    queryset = Staff_Profile.objects.all()
    serializer_class = Staff_Profile_szr
class StaffListView(generics.ListAPIView):
    queryset = Staff_Profile.objects.all()
    serializer_class = Staff_Profile_szr
class StaffDetailUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Staff_Profile.objects.all()
    serializer_class = Staff_Profile_szr
class StaffDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Staff_Profile.objects.all()
    serializer_class = Staff_Profile_szr
    def patch(self, request, *args, **kwargs):
        print("PATCH DATA:", request.data)
        return super().patch(request, *args, **kwargs)

    
@api_view(['POST'])
def login_user(request):
    username = request.data.get('username')
    password = request.data.get('password')
    role = request.data.get('role')

    try:
        user = Staff_Profile.objects.get(username=username, role=role)
        if user.password == password:
            return Response({
                "message": "Login successful",
                "name": user.name,
                "role": user.role
            }, status=status.HTTP_200_OK)
        else:
            return Response({"message": "Invalid password"}, status=status.HTTP_401_UNAUTHORIZED)
    except Staff_Profile.DoesNotExist:
        return Response({"message": "User not found or role mismatch"}, status=status.HTTP_404_NOT_FOUND)