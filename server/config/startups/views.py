from django.views.decorators.csrf import csrf_exempt
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken
from rest_framework import generics
from .serializers import MetaUserSerializer
from datetime import date, datetime
from dateutil.relativedelta import relativedelta


# Create your views here.
age_limit = date.today() - relativedelta(years=18)

class RegisterView(generics.GenericAPIView):
    serializer_class = MetaUserSerializer

    def post(self, request, *args, **kwargs):
        data = request.data.copy()
            
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        
        date = datetime.strptime(data['date_of_birth'], '%Y-%m-%d').date()
        
        if(date > age_limit):
            raise AuthenticationFailed("Minimum date is 18")

        user = serializer.save()

        return Response({
            "access_token": str(AccessToken.for_user(user)),
            "refresh_token": str(RefreshToken.for_user(user))
        })

@csrf_exempt
def login(req):
    pass