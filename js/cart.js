//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.


const showCart = (array) => { // esta funcion muestra los productos del carrito
    let htmlToAppend = "";
    for (let i = 0; i < array.articles.length; i++) {
        let product = array.articles[i];
        //let productUnitCost = product.unitCost;
        //let productCurrency = product.currency;
        //console.log(product.unitCost * product.count )
        console.log(product.name);
        htmlToAppend += `
        <tr>
            <td><img style= width:100px; src="${product.src}" alt=""</td>
            <td>${product.name}</td>
            <td>${product.currency} ${array.articles[i].unitCost}</td>
            <td>
                <input class="form-control" style= width:90px; type="number" id="productCount"  value=${product.count} min="1"/>
            </td>
            <td><span id"productSubtotal">${productSubTotal(product)}</span></td>
        </tr>

        `

        document.getElementById("cart-products").innerHTML = htmlToAppend;
        
        updateSubtotal(array)

        document.getElementById("productCount").addEventListener("change", () => {
            updateSubtotal(array);
            productSubTotal(product);
        });
    }


    //document.getElementById("metodoEnvio").innerHTML = showShippingType();
}

function updateSubtotal(array) {
    for (let i = 0; i < array.articles.length; i++) {
        let product = array.articles[i]
        let productUnitCost = product.unitCost;
        let productCurrency = product.currency;

        let count = document.getElementById("productCount").value;
            subtotal = count * productUnitCost;
        document.getElementById("subtotal").innerHTML = `${productCurrency}&nbsp &nbsp${subtotal}`;
        document.getElementById("total").innerHTML = `${productCurrency}&nbsp &nbsp${subtotal}`;
        
        

    }

}


function productSubTotal(product) {
    return product.unitCost * product.count;
}





/*const showShippingType = () =>{
    let htmlEnvioToAppend ="";
    htmlEnvioToAppend +=`<div class="col">
        <h4 class="mb-3">Método de envío</h4><br>
        <form action="">
            <div class="form-row">
                <legend class="text-muted">Dirección </legend>
                <div class="form-group col-sm-6">
                <label for="address">Calle</label>
                <input type="text" class="form-control" id="addres" placeholder="Nombre de calle" required>
                </div>
                <div class="form-group col-sm-6">
                <label for="numAdress">Numero</label>
                <input type="text" class="form-control" id="numAdress" placeholder="Numero de puerta" required>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-sm-6">
                <label for="corner">Esquina</label>
                <input type="text" class="form-control" id="corner" placeholder="Intersección" required>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-sm-6">
                    <label for="pais">Pais</label>
                    <select name="pais" class="form-control" required>
                        <option value="" selected hidden>Seleccione su pais</option>
                        <option value="1">Argentina</option>
                        <option value="2">España</option>
                        <option value="3">Mexico</option>
                        <option value="4">Brasil</option>
                    </select>
                </div>
                <div class="form-group col-sm-6">
                    <label for="ciudad">Ciudad</label>
                    <select name="ciudad" class="form-control" required>
                        <option value="" selected hidden>Seleccione su Ciudad</option>
                        <option value="1">Buenos Aires</option>
                        <option value="2">Barcelona</option>
                        <option value="3">Mexico DF</option>
                        <option value="4">San Pablo</option>
                    </select>
                </div>
            </div>
        </form><br>
        <legend class="text-muted">Tipo de envío:</legend><br>
        <div class="custom-control custom-radio">
                <input type="radio" id="customRadio1" name="customRadio" class="custom-control-input">
                <label class="custom-control-label" for="customRadio1">Premium (2-5 dias) - Costo del 15% sobre el subtotal.
                </label>
            </div> <br>
            <div class="custom-control custom-radio">
                <input type="radio" id="customRadio2" name="customRadio" class="custom-control-input">
                <label class="custom-control-label" for="customRadio2">Express (5-8) - Costo del 7% sobre el subtotal.</label>
            </div><br>
            <div class="custom-control custom-radio">
                    <input type="radio" id="customRadio3" name="customRadio" class="custom-control-input">
                    <label class="custom-control-label" for="customRadio3">Standard (12 a 15 dias) - Costo del 5% sobre el
                    subtotal.</label>
            </div>
        </div>`

        return htmlEnvioToAppend;
}*/


document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_INFO_URL2).then(resultObj => {
        if (resultObj.status === 'ok') {
            let array = resultObj.data;
            //console.log(array.articles);
            showCart(array);
            
            


        }
    });

});