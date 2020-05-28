from django.db import models

# Create your models here.


class User(models.Model):
    user_name = models.CharField('name',max_length=100)
    password = models.CharField('password',max_length=100)
    email = models.CharField('email',max_length=100,null=True)
    id = models.AutoField(primary_key=True)
    active = models.BooleanField(default=False)

    def __str__(self):
        return self.user_name;


class UserAddress(models.Model):
    city = models.CharField(max_length=100)
    house_number = models.CharField(max_length=100)
    zip_code = models.CharField(max_length=100)
    user = models.OneToOneField(User, on_delete=models.CASCADE)


class MLModels(models.Model):
    count = models.IntegerField(default=0)
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    user = models.ManyToManyField(User)


class OutputData(models.Model):
    json = models.CharField(max_length=5000)
    model = models.ForeignKey(MLModels, on_delete=models.CASCADE)


class ModelsData(models.Model):
    file = models.FileField(upload_to='Data')
    user = models.ForeignKey(User, on_delete=models.CASCADE)


class Models(models.Model):
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=100)

