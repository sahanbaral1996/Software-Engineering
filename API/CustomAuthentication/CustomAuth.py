from django.contrib.auth.backends import ModelBackend
from django.contrib.auth.hashers import check_password

from resource.models import User


class CustomAuth(ModelBackend):

    def authenticate(self, request, user_name=None,password=None):
        user = None

        try:
            user_id = User.objects.get(user_name = user_name)
            if password == user_id.password:
                user = user_id
        except Exception:
            return None
        return user

    def get_user(self, user_id):
        pass