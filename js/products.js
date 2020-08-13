var productsArray = [];
function showProductsList(array){
    let htmlContentToAppend = " ";
    for(let i = 0; i < array.length; i++){
        let products = array[i];
    

        htmlContentToAppend += ``

        document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
    }
}







//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function(resObj){
        if(resObj === 'ok'){
            productsArray = resObj.data;
            showProductsList(productsArray);
        }
    });
});