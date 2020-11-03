//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
const name = document.getElementById("nameEdited"),
    lastName = document.getElementById('lastNameEdited'),
    age = document.getElementById('ageEdited'),
    email = document.getElementById('emailEdited'),
    phone = document.getElementById('phoneEdited'),
    url = document.getElementById('pothoProfile');
    msg = false;

const getProfiles = JSON.parse(localStorage.getItem('profile')),
        userName = localStorage.getItem("user"); 
const setProfile = {
    "name": name.value,
    "lastName": lastName.value,
    "age": age.value,
    "email": email.value,
    "phone": phone.value,
    "photoProfile": {
        "url": null
    }
}

const showProfileCard = () => {
    let profileHtmlToAppend = `
    <h4>${getProfiles.name}</h4>
    <p class="text-secondary mb-1">E-mail: ${getProfiles.email}</p>
    <p class="text-muted font-size-sm">Telefono de contacto: ${getProfiles.phone}</p>
    <button class="btn btn-primary" id="editProfile">Editar Perfil</button>
    <button class="btn btn-outline-primary">Cambiar foto de perfil</button>
    `
    document.getElementById("setProfileCard").innerHTML = profileHtmlToAppend

}

const showProfileInfo = () => {
    profileInfoHtmlToAppend = `
            <div>
                <div class="row">
                    <div class="col-sm-3">
                        <h6 class="mb-0">Nombre se usuario: </h6>
                    </div>
                        <div class="col-sm-9 text-secondary" id="setUserName">
                        </div>
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-sm-3">
                        <h6 class="mb-0">Nombre completo: </h6>
                    </div>
                        <div class="col-sm-9 text-secondary" id="setFullName">
                        </div>
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-sm-3">
                        <h6 class="mb-0">Edad: </h6>
                    </div>
                    <div class="col-sm-9 text-secondary" id="setAge">
                        
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-sm-3">
                        <h6 class="mb-0">Email: </h6>
                    </div>
                    <div class="col-sm-9 text-secondary" id=setEmail>
                        
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-sm-3">
                        <h6 class="mb-0">Teléfono de contacto: </h6>
                    </div>
                    <div class="col-sm-9 text-secondary" id="setPhone">
                        
                    </div>
                </div>
            </div>
            
    `

    document.getElementById('setProfileInfo').innerHTML = profileInfoHtmlToAppend;
}

const showModal = () => {
    document.getElementById('editProfile').addEventListener("click", function () {
        $('#modalWindowEditProfile').modal('show')
    })

    /*console.log(name.value);
    console.log(lastName.value);
    console.log(age.value);
    console.log(email.value);
    console.log(phone.value);*/

    document.getElementById('saveProfile').addEventListener("click", function (){
        if(name.value == "" || lastName.value == "" || age.value == "" || email.value == "" || phone.value == ""){
            document.getElementById('validateModelPerfil').innerHTML =`
            <div class="alert alert-warning alert-dismissable" id="alerta">
            <button type="button" class="close" data-dismiss="alert">&times;</button>
            <strong>¡Atención!</strong> Debes ingresar los datos.
            </div>
            `
            msg = false;

        }
        else{
            $('#modalWindowEditProfile').modal('hide');
            msg = true;
            localStorage.setItem('profile', JSON.stringify(setProfile));

        }
        if (msg) {
            document.getElementById("exitoProfile").innerHTML = `
            <div class="alert alert-success alert-dismissable" id="alerta">
            <button type="button" class="close" data-dismiss="alert">&times;</button>
            El datos guardados con éxito.
            </div>
            `
        }
    })

}
window.onbeforeunload = function() {
    return "Bye now!";
};
const getProfile= () =>{
    
    document.getElementById('setFullName').innerHTML = `${getProfiles.name}\n${getProfiles.lastName}`;
    document.getElementById('setAge').innerHTML = getProfiles.age;
    document.getElementById('setEmail').innerHTML = getProfiles.email;
    document.getElementById('setPhone').innerHTML = getProfiles.phone;
    document.getElementById('setUserName').innerHTML = userName;
}


document.addEventListener("DOMContentLoaded", function (e) {
    showProfileCard();
    showProfileInfo();
    showModal();
    getProfile()
    console.log(setProfile);
});