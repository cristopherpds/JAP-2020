//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

    function validation(){

        var userName = document.getElementById('userName').value;
        var userPassword = document.getElementById('userPassword').value;

        if(userName== " " && userPassword == " "){
            alert('Porfavor rellene los campos')
        }
        else{

        }

        return true

    }
    
});
