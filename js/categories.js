const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
var currentCategoriesArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;

function sortCategories(criteria, array){ // funcion para ordenar
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME) //compara si el criterio es igual a 'AZ'
    {
        result = array.sort(function(a, b) {   //hace un sort de forma ascendente
            if ( a.name < b.name ){ return -1; } //compara si a es menor que b
            if ( a.name > b.name ){ return 1; } //compara si a es mayor que b
            return 0; // a y b son iguales
        });
    }else if (criteria === ORDER_DESC_BY_NAME){ // compara si criterio es igual a 'ZA'
        result = array.sort(function(a, b) { //hace un sort de forma decendente
            if ( a.name > b.name ){ return -1; } //compara si a es mayor que b
            if ( a.name < b.name ){ return 1; } //compara si a es menor que b
            return 0; //a y b son iguales
        });
    }else if (criteria === ORDER_BY_PROD_COUNT){ //compara si el criterio es igual a 'Cant.'
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.productCount); //pasa el Strin a numero y los guarda en un avariable
            let bCount = parseInt(b.productCount);

            if ( aCount > bCount ){ return -1; } // compara si a es mayor que b
            if ( aCount < bCount ){ return 1; }// compara si a es menor que b
            return 0; // a y b son iguales
        });
    }

    return result;
}

function showCategoriesList(){  // funcion para mostrar la lista de categorias

    let htmlContentToAppend = "";    //crea una variable vacia
    for(let i = 0; i < currentCategoriesArray.length; i++){  // recore el array 
        let category = currentCategoriesArray[i];  // guarda el array en una

        /*compara si minCount es igual a undefined o minCount es diferente a undefined y parseInt(category.productCount) es mayor igual a minCount
        y si maxCount es igual a undefine o maxCount es diferente a undefined y parseInt(category.productCount) es menor igual a maxCount  */ 
        if (((minCount == undefined) || (minCount != undefined && parseInt(category.productCount) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(category.productCount) <= maxCount))){

                //creacion de contenido a agregar al HTML
            htmlContentToAppend += `
            <a href="category-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + category.imgSrc + `" alt="` + category.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ category.name +`</h4>
                            <small class="text-muted">` + category.productCount + ` artículos</small>
                        </div>
                        <p class="mb-1">` + category.description + `</p>
                    </div>
                </div>
            </a>
            `
        }

        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }
}

function sortAndShowCategories(sortCriteria, categoriesArray){ // funcion para ordenar y mostrar categoria
    currentSortCriteria = sortCriteria;

    if(categoriesArray != undefined){  //compara si categoriesArray es diferente a undefined
        currentCategoriesArray = categoriesArray;
    }

    currentCategoriesArray = sortCategories(currentSortCriteria, currentCategoriesArray);

    //Muestro las categorías ordenadas
    showCategoriesList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CATEGORIES_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndShowCategories(ORDER_ASC_BY_NAME, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_ASC_BY_NAME);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_DESC_BY_NAME);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowCategories(ORDER_BY_PROD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showCategoriesList();
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

        showCategoriesList();
    });
});