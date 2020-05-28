from django.urls import path
from . import views

app_name = "resource"
urlpatterns = [
    path("resource/", views.index, name="index"),
    path("resource/login", views.login, name="login"),
    path("resource/login/authenticate_user", views.authenticate, name="authenticate"),
    path("resource/logout", views.logout_view, name="logout_view"),
    path("resource/authenticate_vf_code", views.authenticate_code, name="authenticate_code"),
    path("resource/models", views.models, name="models"),
    path("resource/getFiles", views.run_model, name="run_model"),
    path("resource/trainModel/<str:model_name>", views.runMLModel, name="runMLModel"),
    path("resource/returnPredictionFile", views.return_prediction, name="return_prediction"),
    path("resource/signup", views.signup, name="signup"),
    path("resource/create_user", views.create_user, name="create_user"),
    path("resource/authenticate_code", views.authenticate_code, name="authenticate_code"),
]