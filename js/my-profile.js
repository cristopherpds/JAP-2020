//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
const name = document.getElementById("nameEdited"),
    lastName = document.getElementById('lastNameEdited'),
    age = document.getElementById('ageEdited'),
    email = document.getElementById('emailEdited'),
    phone = document.getElementById('phoneEdited');


var msg = false;
const msg2 = false

const getProfiles = JSON.parse(localStorage.getItem('profile')) || {};
userName = localStorage.getItem("user");
getPhotoProfile = JSON.parse(localStorage.getItem('profilePhoto')) || {};

const setProfile = {
    "name": name.value,
    "lastName": lastName.value,
    "age": age.value,
    "email": email.value,
    "phone": phone.value,

}

const showProfileCard = () => {
    let profileHtmlToAppend = `
    <div class="d-flex flex-column align-items-center text-center" id="setPhotoProfil">
        <img src=${getPhotoProfile.url} alt="Foto de Perfil" class="rounded-circle"
                    width="150">
        <div class="mt-3" >
            <h4>${getProfiles.name}</h4>
            <p class="text-secondary mb-1">E-mail: ${getProfiles.email}</p>
            <p class="text-muted font-size-sm">Telefono de contacto: ${getProfiles.phone}</p>
            <button class="btn btn-primary" id="editProfile">Editar Perfil</button>
            <button class="btn btn-outline-primary" id="editPhotoProfile">Cambiar foto de perfil</button>
        </div>
    </div>
    
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

    document.getElementById('saveProfile').addEventListener("click", function () {
        if (name.value == "" || lastName.value == "" || age.value == "" || email.value == "" || phone.value == "") {
            document.getElementById('validateModelPerfil').innerHTML = `
            <div class="alert alert-warning alert-dismissable" id="alerta">
            <button type="button" class="close" data-dismiss="alert">&times;</button>
            <strong>¡Atención!</strong> Debes ingresar los datos.
            </div>
            `
            msg = false;

        }
        else {
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

const showModalPhotoProfile = () => {
    document.getElementById('editPhotoProfile').addEventListener("click", function () {
        $('#modalWindowEditPhotoProfile').modal('show')
    })

    document.getElementById('savePhoto').addEventListener("click", function () {
        const url = document.getElementById('sendPhoto').value;
        if (url == "") {
            document.getElementById('validateModelPhotoPerfil').innerHTML = `
            <div class="alert alert-warning alert-dismissable" id="alerta">
            <button type="button" class="close" data-dismiss="alert">&times;</button>
            <strong>¡Atención!</strong> Debes ingresar los datos. Ejemplo de URL correcta:\n https://example.com/example.png
            </div>
            `
            msg = false;

        }
        else {
            $('#modalWindowEditPhotoProfile').modal('hide');
            msg = true;
            let imgPhoto = {
                "url": url
            }
            localStorage.setItem('profilePhoto', JSON.stringify(imgPhoto));
        }
        if (msg) {
            document.getElementById("exitoPhotoProfile").innerHTML = `
            <div class="alert alert-success alert-dismissable" id="alerta">
            <button type="button" class="close" data-dismiss="alert">&times;</button>
            Foto  guardada con éxito. Debe actualizar la pagina para notar los cambios!!!
            </div>
            `
        }
    })

}

const getProfile = () => {

    document.getElementById('setFullName').innerHTML = `${getProfiles.name}\n${getProfiles.lastName}`;
    document.getElementById('setAge').innerHTML = getProfiles.age;
    document.getElementById('setEmail').innerHTML = getProfiles.email;
    document.getElementById('setPhone').innerHTML = getProfiles.phone;
    document.getElementById('setUserName').innerHTML = userName;
}

const photoProfile = () => {

    document.getElementById('savePhoto').addEventListener("click", function () {
        const getUrl = document.getElementById('sendPhoto').value;
        if (getUrl != "") {
            let imgPhoto = {
                "url": getUrl
            }
            localStorage.setItem('profilePhoto', JSON.stringify(imgPhoto));
        }

    })

}



document.addEventListener("DOMContentLoaded", function (e) {
    showProfileCard();
    showProfileInfo();
    showModal();
    getProfile();
    photoProfile();
    showModalPhotoProfile();
    //console.log(url.value);
});