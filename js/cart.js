var articles = {};
var costo = 0;
var cant = 0;
var tc = 40;
var costoEnvio = 0.15;


function showCartProductsAndTotalCost(array) {

    let htmlToAppend = "";

    for (let i = 0; i < array.length; i++) {
        var art = array[i];

        htmlToAppend = `
        
            <tr id="arts${i}">
                <td><img src="` + art.src + `" class="img-thumbnail" style="width:100px"></td>
                <td><p>`+ art.name + `</p></td>
                <td><p>`+ "UYU " + exchangeRate(art) + `</p></td>
                <td><input id="quantity${i}" type="number" min="1" placeholder="` + art.count + `" style="width:50px" min="1" class="form-control text-center cant" ></td>
                <td ><strong id="subT${i}" class="sub">  ` + art.count * exchangeRate(art) + `</strong></td>
                <td><img style="height:30px" src="https://www.flaticon.com/svg/static/icons/svg/3221/3221845.svg" class="remove"></td>
            </tr>
            
        `
        document.getElementById("cart-products").innerHTML += htmlToAppend;

    }

    addEvents(array);
    removeArticle(array);
}

function exchangeRate(coin) {

    if (coin.currency == "USD") {
        costo = coin.unitCost * tc;
    } else {
        costo = coin.unitCost;
    }

    return costo;
}

function addEvents(articles) {
    let arrayCant = document.getElementsByClassName("cant");
    for (let i = 0; i < arrayCant.length; i++) {
        let canti = document.getElementById("quantity" + i);
        canti.addEventListener("change", function () {
            cant = canti.value;
            let subtotal = cant * exchangeRate(articles[i]);
            document.getElementById("subT" + i).innerHTML = subtotal;
            cartTotalCost();
        })
    }
}


function removeArticle() {
    let trash = document.getElementsByClassName("remove");
    for (let i = 0; i < trash.length; i++) {
        trash[i].addEventListener("click", function () {
            document.getElementById("arts" + i).innerHTML = "";
            cartTotalCost();
        })
    }
}

function shippingType() {
    let htmlEnvio = `
    <h3>Tipo de envío</h3>
    <br>
    <input type="radio" id="premium" name="envio" checked><label for="premium" >Premium 2 a 5 días (15%)</label><br>
    <input type="radio" id="express" name="envio"><label for="express" >Express 5 a 8 días (7%)</label><br>
    <input type="radio" id="standard" name="envio"><label for="standard">Standard 12 a 15 días (5%)</label><br>`;
    document.getElementById("shipping").innerHTML = htmlEnvio;

    updateCosts()
}


function cartTotalCost() {
    let arraySubtotales = document.getElementsByClassName("sub");
    let totalCost = 0;
    for (let i = 0; i < arraySubtotales.length; i++) {

        let subIndividual = arraySubtotales[i];
        totalCost += parseFloat(subIndividual.innerText);

    }

    let montoEnvio = costoEnvio * totalCost;
    let conEnvio = totalCost * (1 + costoEnvio);
    let htmlSub = `<strong class="text-muted">UYU` + " " + Math.round(totalCost) + `</strong>`
    let htmlEnvio = `<strong class="text-muted">UYU` + " " + Math.round(montoEnvio) + `</strong>`
    let htmlTotal = `<strong style="color: #000">UYU` + " " + Math.round(conEnvio) + `</strong>`

    document.getElementById("subtotal").innerHTML = htmlSub;
    document.getElementById("envio").innerHTML = htmlEnvio;
    document.getElementById("total").innerHTML = htmlTotal;
}


function updateCosts() {
    document.getElementById("premium").addEventListener("click", function () {
        costoEnvio = 0.15;
        cartTotalCost();
    });

    document.getElementById("express").addEventListener("click", function () {
        costoEnvio = 0.07;
        cartTotalCost();
    });

    document.getElementById("standard").addEventListener("click", function () {
        costoEnvio = 0.5;
        cartTotalCost();
    })
}

function shippingInformation() {
    document.getElementById('shippingInformation').innerHTML = `
    <h4 class="mb-3">Dirección de envío</h4><br>
            <div class="form-row">
                <legend class="text-muted">Dirección </legend>
                <div class="form-group col-sm-6">
                <label for="address">Calle</label>
                <input type="text" class="form-control" id="address" placeholder="Nombre de calle" required>
                </div>
                <div class="form-group col-sm-6">
                <label for="numAdress">Numero</label>
                <input type="num" class="form-control" id="numAdress" placeholder="Numero de puerta" required>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-sm-6">
                <label for="corner">Esquina</label>
                <input type="text" class="form-control" id="corner" placeholder="Intersección" required>
                </div>
            </div>
    `
}

/*$(function (){
    $('#btnWayToPay').on('show.bs.modal', (e) =>{
        console.log('fon')
    })
})*/

var validator = false;
card = false;
transfer = false;

function modal() {
    document.getElementById('btnWayToPay').addEventListener('click', function () {
        $('#modalWindow').modal('show')
    })

    let cardNum = document.getElementById("cardNum"),
        cvc = document.getElementById('codSeg'),
        expiration = document.getElementById('vto'),
        numAccount = document.getElementById('numAccount'),
        msg = false;


    cardNum.disabled = true;
    cvc.disabled = true;
    expiration.disabled = true;
    numAccount.disabled = true;




    document.getElementById('tarjetaRadio').addEventListener("click", function () {
        validator = true;
        card = true;
        transfer = false;
        numAccount.disabled = true;
        cardNum.disabled = false;
        expiration.disabled = false;
        cvc.disabled = false;

    })


    document.getElementById('save').addEventListener("click", function () {
        if ((cardNum.value == "" || cvc.value == "" || expiration.value == "" || numAccount != "") && (cardNum.value == "" || cvc.value == "" || expiration.value == "")) {
            document.getElementById("validateModel").innerHTML = `<div class="alert alert-warning alert-dismissable" id="alerta">
            <button type="button" class="close" data-dismiss="alert">&times;</button>
            <strong>¡Atención!</strong> Debes ingresar los datos de tu tarjeta.
            </div>`
            msg = false;
        }
        else {
            $('#modalWindow').modal('hide');
            msg = true;
        }
        if (msg) {
            document.getElementById("exito").innerHTML = `<div class="alert alert-success alert-dismissable" id="alerta">
            <button type="button" class="close" data-dismiss="alert">&times;</button>
            El ingreso de su tarjeta se ha realizado con éxito.
            </div>`
        }
    });

    document.getElementById('transRadio').addEventListener("click", function () {
    validator = true;
    transfer = true;
    card = false;
    numAccount.disabled = false;
    cardNum.disabled = true;
    cvc.disabled = true;
    expiration.disabled = true;

    document.getElementById("save").addEventListener("click", function () {
        if ((numAccount.value == "" || cardNum.value != "" || cvc.value != "" || expiration.value != "") && (numAccount.value == "" || cardNum.value == "" || cvc.value == "" || expiration.value == "")) {
            document.getElementById("validateModel").innerHTML = `<div class="alert alert-warning alert-dismissable" id="alerta">
            <button type="button" class="close" data-dismiss="alert">&times;</button>
            <strong>¡Atención!</strong> Debes ingresar tu cuenta de banco.
            </div>`
            msg= false;
        } else {
            //ocultar modal cuando estan los datos correctamente y doy guardar
            $('##modalWindow').modal('hide');
            msg= true;
        }
        if (msg) {
            document.getElementById("exito").innerHTML = `<div class="alert alert-success alert-dismissable" id="alerta">
                <button type="button" class="close" data-dismiss="alert">&times;</button>
                Sus datos de cuenta se han ingresado con éxito.
                </div>`
        }

    });


});
}

function validation(){
    let address = document.getElementById("address"),
        numAdress = document.getElementById('numAdress'),
        corner = document.getElementById('corner');

    document.getElementById('btnBuy').addEventListener("click", function (){
        if(address.value == "" || numAdress.value == "" || corner.value == ""){
            document.getElementById('validations').innerHTML= `<div class="alert alert-warning alert-dismissable" id="alerta">
            <button type="button" class="close" data-dismiss="alert">&times;</button>
            Debe llenar los <strong>datos de envío</strong>
            </div>`
        }
        else if (!validator)
        {
            document.getElementById('validations').innerHTML=`<div class="alert alert-warning alert-dismissable" id="alerta">
            <button type="button" class="close" data-dismiss="alert">&times;</button>
            Debe selecionar una <strong> forma de pago</strong>
            </div>`

        }
        else{
            document.getElementById('validations').innerHTML=`<div class="alert alert-success alert-dismissable" id="alerta">
            <button type="button" class="close" data-dismiss="alert">&times;</button>
            ¡Su compra ha sido realizada con <strong> éxito</strong>!
            </div>`
        }
    })

}






document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_INFO_URL2).then(resultObj => {
        if (resultObj.status === 'ok') {
            let array = resultObj.data;
            //console.log(array.articles);
            //showCart(array);
            showCartProductsAndTotalCost(array.articles);
            shippingInformation()
            shippingType();
            modal()
            cartTotalCost();
            validation()




        }
    });

});