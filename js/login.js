//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

    const name = document.getElementById('userName');
    const paswword = document.getElementById('userPassword');
    const acept = document.getElementById('acept');
    const form = document.getElementById('login-form');
    const warning = document.getElementById('warning');


    form.addEventListener('submit', e =>{
        e.preventDefault();
        let warnings
        if(name.value === "user" && paswword.value === "user" && acept.checked){
            window.location.href = 'home.html';
        }
        else{
            alert('Usuario: user \n \n Contraseña: user');
        }
    })

    
});
