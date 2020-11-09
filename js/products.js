const PRODUCTS_ASC = "AZ";
const PRODUCTS_DES = "ZA";
const PRODUCT_RELEVACE = "Relevancia";
var currentProductsArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;
var productRow = [];

function sortProducts(criteria, array){ 
    let result = [];
    if (criteria === PRODUCTS_ASC) 
    {
        result = array.sort(function(a, b) {   
            
            return a.cost - b.cost
        });
    }else if (criteria === PRODUCTS_DES){ 
        result = array.sort(function(a, b) { 
            return b.cost - a.cost
        });
    }else if (criteria === PRODUCT_RELEVACE){ 
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount); 
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; } 
            if ( aCount < bCount ){ return 1; }
            return 0; 
        });
    }

    return result;
}

function filterProducts(productRow){
    filterText = document.querySelector('#inputFilter').value.toUpperCase();

    for(var i = 0; i < productRow.length; i+=1){
        if(productRow[i].dataset.filterName.toUpperCase().includes(filterText) || productRow[i].dataset.filterDesc.toUpperCase().includes(filterText)){
            productRow[i].parentNode.style.display = "block";
        }
        else{
            productRow[i].parentNode.style.display = "none";
        }
    }
}



function showProductsList() {

    let htmlContentToAppend = "";
    for (let i = 0; i < currentProductsArray.length; i++) {
        let products = currentProductsArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(products.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(products.cost) <= maxCount))){


        htmlContentToAppend += `
        <div class="col-sm-4 col-lg-4">
            <div class="card mb-4 shadow-sm">
                <img src="` + products.imgSrc + `" alt="`+ products.description+`" class="img-thumbnail">
                <div class="card-body">
                    <h4 class="mb-1">`+ products.name + `</h4>
                    <p>`+ products.description  +`</p>
                            <p> A tan solo `+ products.currency+  "   " +products.cost +`</p>
                    <p class="card-text"></p>
                    <div class="card-footer text-muted">
                        ${products.soldCount} artículos vendidos.
                    </div>
                    <br>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                            <button type="button" class="btn btn-sm btn-outline-secondary" onclick="window.location.href='/product-info.html'" >Ver</button>
                        </div>
                        <small class="text-muted">9 mins</small>
                    </div>
                </div>
            </div>
        </div>
            
        `
        /* <div class="col-lg-6 col-sm-12">
            <a href="product-info.html" class="product-list-group-item list-group-item-action">
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
            </>
        </div>
        </div> */
        
        

        document.getElementById("product-list-container").innerHTML = htmlContentToAppend;
    }
}
}

function sortAndShowProducts(sortCriteria, categoriesArray){ // funcion para ordenar y mostrar categoria
    currentSortCriteria = sortCriteria;

    if(categoriesArray != undefined){  //compara si categoriesArray es diferente a undefined
        currentProductsArray = categoriesArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    //Muestro las categorías ordenadas
    showProductsList(currentProductsArray);
    filterProducts(productRow);

}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            currentProductsArray = resultObj.data;
            sortAndShowProducts(PRODUCTS_ASC, currentProductsArray);

            //sortAndShowProducts(PRODUCTS_ASC, resultObj.data);
        }
        productRow = document.getElementById('product-list-container').getElementsByClassName('row');
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(PRODUCTS_ASC);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts(PRODUCTS_DES);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowProducts(PRODUCT_RELEVACE);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        sortAndShowProductsList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showProductsList();
        filterProducts()
    });

    document.getElementById('inputFilter').addEventListener("keyup", function(){
        filterProducts(productRow);
    })
});
