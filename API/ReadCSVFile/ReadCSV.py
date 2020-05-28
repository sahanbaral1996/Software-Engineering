import pandas as pd
import numpy as np
from resource.models import ModelsData,User


class ReadCSV:
    def __init__(self):
        pass

    @classmethod
    def return_numpy(cls,user, model):
        user_model = User.objects.get(user_name=user)
        model_name = ModelsData.objects.get(user=user_model)
        csv_data = pd.read_csv(str(model_name.file))
        conv_data = csv_data.to_numpy()
        test = conv_data[np.isnan(conv_data[:, -1])]
        train = conv_data[np.logical_not(np.isnan(conv_data[:, -1]))]
        return (train, test)