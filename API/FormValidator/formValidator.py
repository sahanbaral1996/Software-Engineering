from django.forms import ModelForm
from django import forms
from django.core.exceptions import ValidationError
from resource.models import *


class UserForm(ModelForm):
    class Meta:

        model = User

        fields = ['user_name', 'password','email']

    def clean(self):
        super(UserForm, self).clean()
        print(self.cleaned_data)
        user_name = self.cleaned_data.get('user_name')
        email = self.cleaned_data.get('email')
        password = self.cleaned_data.get('password')

        if len(password) < 6 :
            self._errors['password'] = self.error_class(['Password must be minimum 6 character'])

        if len(user_name) < 6:
            self._errors['username'] = self.error_class(['username must be minimum of 6 characters'])

        return self.cleaned_data
