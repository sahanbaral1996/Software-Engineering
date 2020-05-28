from django.shortcuts import render,redirect
from django.http import HttpResponse, Http404
from django.template import loader
from CustomAuthentication.CustomAuth import CustomAuth
from django.contrib import messages
from resource.models import Models
from .models import ModelsData,User
from django.contrib.auth import logout
from ReadCSVFile import ReadCSV
from FormValidator import formValidator
from EmailSender import SendEmail
from Models.LinearRegression import LinearRegression
import random
import os


def index(req):
    try:
        temp = loader.get_template('resource/index.html')
    except Exception:
        raise Http404('resource does not exist')
    return HttpResponse(temp.render({'title':'Home'}, req))


def login(req):
    return render(req, 'resource/login.html', {'title':'Login'})


def logout_view(req):
    logout(req)
    return redirect('/resource/')


def signup(req):
    form = formValidator.UserForm(None)
    return render(req,'resource/signup.html',{'title':'Create new Account','form':form})


def create_user(req):
    if req.method == 'POST':
        details = formValidator.UserForm(req.POST)
        if details.is_valid():
            data = details.save()
            if data:
                return redirect('/resource/login')
        else:
            return render(req, 'resource/signup.html', {'title': 'Create new Account', 'form': details})


def authenticate_code(req):
    if int(req.POST['vf_code']) == req.session['auth_code']:
        user = User.objects.get(user_name = req.session['user_name'])
        if user:
            user.active = True
            user.save()

            req.session['logged_in'] = True
            req.session.set_expiry(0)
            return redirect('/resource/models')
        else:
            return redirect('/resource/login')
    else:
        messages.add_message(req, messages.INFO,
                                 'Wrong verification code. Please try again')
        return render(req, 'resource/Auth_Code_Activation.html', {'title': 'Verification code'})


def authenticate(req):
    user_name = req.POST['user_name']
    password = req.POST['password']
    user = CustomAuth.authenticate(CustomAuth, req, user_name = user_name,password=password)
    if user and user.active:
        req.session['logged_in'] = True
        req.session['user_name'] = user_name
        req.session.set_expiry(0)
        return redirect('/resource/models')
    elif user and not user.active:
        vf_code = random.randint(1000,9999)
        print(user.email)
        SendEmail.SendEmail.send_email(user.email,vf_code,user_name)
        req.session['logged_in'] = "partial"
        req.session['user_name'] = user_name
        req.session['auth_code'] = vf_code
        req.session.set_expiry(0)
        messages.add_message(req, messages.INFO, 'A verification code has been sent to your email please enter the code below to activate your account')
        return render(req, 'resource/Auth_Code_Activation.html', {'title':'Verification code'})
    else:
        messages.add_message(req,messages.INFO,'invalid credentials')
        return redirect('/resource/login')


def models(req):
    if 'logged_in' not in req.session:
        return redirect('/resource/login')
    else:
        models = Models.objects.all()
        return render(req,'resource/Models.html',{'title':'Models| Machine learning','models':models})


def run_model(req):
    user = User.objects.get(user_name=req.session['user_name'])
    file = req.FILES['file']
    form = ModelsData(file = file,user= user)
    ext = form.file.name.endswith('.csv') or form.file.name.endswith('.xlsx')
    if file and form and ext:
        form.save()
        return HttpResponse("200 ok")
    elif not ext:
        return HttpResponse("Please upload a file with .csv extension!")


def runMLModel(req, model_name):
    user = User.objects.get(user_name=req.session['user_name'])
    form = ModelsData.objects.get(user=user)
    try:
        train, test = ReadCSV.ReadCSV.return_numpy(req.session['user_name'], model_name)
        lr = LinearRegression(train[:,:train.shape[1]-1],train[:,-1],0.01)
        lr.fit(100)
        prediction = lr.predict(test[:,:test.shape[1]-1])

        with open("Data/prediction.txt","w+") as out:
            for preds in prediction:
                out.write("%s\n"%preds)
    except:
        os.remove(str(form.file))
        form.delete()
        return HttpResponse("400 bad request")

    os.remove(str(form.file))
    form.delete()

    return HttpResponse("200 ok")


def return_prediction(req):
    with open("Data/prediction.txt","r") as f:
        file_data = f.read()
    response = HttpResponse(file_data, content_type='application/json')
    response['Content-Disposition'] = 'attachment; filename=prediction.txt"'

    return response
