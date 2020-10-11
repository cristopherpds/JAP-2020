//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

    

});

    const name = document.getElementById('userName');
    const paswword = document.getElementById('userPassword');
    const form = document.getElementById('login-form');

    form.addEventListener('submit', e =>{
        e.preventDefault();
        if(name.value !== '' && paswword.value !== ''){
            window.location.href = 'home.html';
        }
        else if(name.value === '' && paswword.value === '') {
            alert('Por favor rellene todos los campos');
        }
    });

    function saveUser(userName){
        localStorage.clear();
        localStorage.setItem('user',  userName);
        
    }

    //Para posible implementacion conla BD
    //Script de Google 
    /*function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); 
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); 
    var id_token = googleUser.getAuthResponse().id_token;*/
    //window.location.href = 'home.htm'
