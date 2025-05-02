
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from staff.serializers import Staff_Profile_szr

@api_view(['POST'])
def staff_profile(request):
    serializer = Staff_Profile_szr(data=request.data)
    if serializer.is_valid():
        staff = serializer.save()
        return Response({
            "message": "Staff created successfully",
            "username": staff.username
        }, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
 
