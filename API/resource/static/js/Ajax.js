function getCSV(id){
    document.getElementById("error_file_upload").innerHTML = "";

    var element = document.getElementById('file_'+id);
    if (element.files[0] == null){
        document.getElementById("error_file_upload").innerHTML ="please select a file";
    }else{
        var modal = document.getElementById("modal_button");
        modal.click();
        document.getElementsByClassName("modal-body")[0].innerHTML = 'Uploading File';
        var formData = new FormData();
        formData.append('file', element.files[0]);
        var csrftoken = Cookies.get('csrftoken');
        $.ajax({
            url : 'getFiles',
            type : 'POST',
            data : formData,
            headers: {
                'X-CSRFToken': csrftoken
            },
            processData: false,  // tell jQuery not to process the data
            contentType: false,  // tell jQuery not to set contentType
            success : function(response) {
                console.log(response);
                if(response == '200 ok'){
                    document.getElementsByClassName("modal-body")[0].innerHTML = 'Running model';
                    runMlModel(id);

                }else{
                    document.getElementById('file_'+id).value = "";
                    var newmodal = document.getElementById("modal_button");
                    newmodal.click();
                    document.getElementById("error_file_upload").innerHTML = response;
                }
            },
            error: function (err) {
                document.getElementById('file_'+id).value = "";
                console.log(err);
            }
        });
    }
}

function runMlModel(model){
    console.log("ASdasdasdasdhapy")
    var csrftoken = Cookies.get('csrftoken');
    $.ajax({
       url : 'trainModel/'+model,
       type : 'GET',
       headers: {
        'X-CSRFToken': csrftoken
     },
       success : function(response) {
           console.log(response)

           if(response == '200 ok'){
                document.getElementById("download_link").style.display = "block"
                document.getElementById('file_'+model).value = "";
                var modal = document.getElementById("modal_button");
                setTimeout(() => { modal.click(); }, 2000);
                //returnPrediction();



           }else{
                document.getElementById('file_'+model).value = "";
                document.getElementsByClassName("modal-body")[0].innerHTML = 'File is corrrupted or is not proper csv file';
                var modal = document.getElementById("modal_button");
                setTimeout(() => { modal.click(); }, 2000);
           }
       },
        error: function (err) {
            document.getElementById('file_'+model).value = "";
            console.log(err);
        }
    });
}
