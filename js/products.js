var productsArray = [];

function showCategoriesList(array) {

    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let products = array[i];

        htmlContentToAppend += `
        <div class="product-list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + products.imgSrc + `" alt="`+ products.description+`" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ products.name + `</h4>
                        <small class="text-muted"> ` + products.soldCount + ` artículos vendidos.</small>
                    </div>
                    <div>
                    <p>`+ products.description  +`</p>
                    <p> A tan solo `+ products.currency+  "   " +products.cost +`</p>
                    </div>
                    

                </div>
            </div>
        </div>
        `

        document.getElementById("product-list-container").innerHTML = htmlContentToAppend;
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resObj) {
        if (resObj.status === "ok") {
            productsArray = resObj.data;
            showCategoriesList(productsArray);
        }
    });
});