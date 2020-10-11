/*GET ELEMENTS */
const productNameHTML = document.getElementById('productName');
    productDescriptionHTML = document.getElementById('productDescription');
    productCostHTML = document.getElementById('productCost');
    productCurrencyHTML = document.getElementById('productCurrency');
    productSoldCountHTML = document.getElementById('productSoldCount');
    productCategoryHTML = document.getElementById('productCategory');
    
const submitComment = document.getElementById("submitComment")

var product = {}



function showImagesGallery(array) {
    let htmlImg = "";
    let htmlCarousel = "";
    for (let i = 0; i < array.length; i++) {
        let images = array[i];
        if (i == 0) {
            
            htmlImg += `<li data-target="#carouselExampleIndicators" data-slide-to="` + i + `" class="active"></li>`
            htmlCarousel += `
                <div class="carousel-item active" data-interval="5000">
                    <img src="` + images + `" class="d-block w-100" alt="...">
                </div> `
        } else {
            
            htmlImg += `<li data-target="#carouselExampleIndicators" data-slide-to=" ` + i + `"></li> `
            htmlCarousel += `
                <div class="carousel-item" data-interval="2000">
                    <img src="`+ images + `" class="d-block w-100" alt="...">
                </div>`
        }
    }
    document.getElementById("carouselHtml").innerHTML = htmlImg; 
    document.getElementById("productImages").innerHTML = htmlCarousel; 


    /*let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `
    }
    document.getElementById("productsImagesWrapper").innerHTML = htmlContentToAppend;*/
}


function addStars(ths, sno) {
    for (var i = 1; i <= 5; i++) {
        var cur = document.getElementById("star" + i)
        cur.className = "fa fa-star"
    }

    for (var i = 1; i <= sno; i++) {
        var cur = document.getElementById("star" + i)
        if (cur.className == "fa fa-star") {
            cur.className = "fa fa-star checked"
        }

    }

    rating = sno;
    return rating;

}


//funcion para mostrar estrellas en un nuevo comentario
const showRating = (rating) => {
    let htmlScore = "";
    let stars = "";

    for (let i = 1; i <= 5; i++) {
        if (i <= rating) { 
            stars += `<i class="fa fa-star checked"></i>`;
        } else {
            stars += `<i class="fa fa-star"></i>`;
        }
    }
    htmlScore = `<span> ${stars} </span>`
    return htmlScore;
}


//funcion para mostrar estrellas precargadas en el json
const showStars = (productInfo) => {
    for (let i = 0; i < productInfo.length; i++) {

        const product = productInfo[i];
        document.getElementsByClassName("starsContainer")[i].innerHTML += `<span class="fa fa-star checked"></span>`.repeat(product.score);
        document.getElementsByClassName("starsContainer")[i].innerHTML += `<span class="fa fa-star"></span>`.repeat(5 - product.score);
    }
}


const showReviews = (productInfo) => {
    let reviwsToAppend = [];
    for (let i = 0; i < productInfo.length; i++) {
        let product = productInfo[i];
        //console.log(product);
        reviwsToAppend += ` 
        <div class="p-4 my-2">
        <div class="d-flex justify-content-between">
            <h5 class="font-weight-bold"><i class="fas fa-user mr-1"></i> ${product.user}</h5>
            <div class="starsContainer">
            </div>
            </div>
            <p class="pt-2">${product.description}</p>
            <p class="text-right">${product.dateTime}</p>
            <hr>
        </div>
        </div>
        `
    }
    document.getElementById("reviewContainer").innerHTML = reviwsToAppend;
    showStars(productInfo);

}



const postComments = () => {
    let txtAreaComments = document.getElementById("txtAreaComments").value;
        document.getElementById("txtAreaComments").value = " ";
    let today = new Date();
    let mes = parseInt(today.getMonth() + 1);
    if (mes < 10) {
        mes = "0" + mes
    }

    today = today.getFullYear() + '-' + mes + '-' + today.getDate() + '  ' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    console.log(today);
    if (txtAreaComments) {
        let htmlCommentToAppend = `
    <div class="p-4 my-2">
        <div class="d-flex justify-content-between">
        <h5 class="font-weight-bold"><i class="fas fa-user mr-1"></i> ${localStorage.getItem('user')}</h5>
        <div class="starsContainer">
            ${showRating(rating)}
        </div>
        </div>
        <p class="pt-2">${txtAreaComments}</p>
        <p class="text-right">${today}</p>
        <hr>
    </div>
    </div>
    `
        document.getElementById("reviewContainer").innerHTML += htmlCommentToAppend;
    }
}




const showRelatedProducts = (relatedProductsArray) => {
    getJSONData(PRODUCTS_URL)
    .then(resultObj => {
        let productHtmlToAppend = "";

        if (resultObj.status === "ok") {
            let allProducts = resultObj.data;
            for (let i = 0; i < relatedProductsArray.length; i++) {
                let relatedProductPosition = relatedProductsArray[i];
                let related = allProducts[relatedProductPosition];

                productHtmlToAppend += `
                <div class= "col-lg-3 col-md-4 col-6 border">
                    <div id="relatedVideogameImg" class= "row">
                        <img class="img-fluid p-2" src="${related.imgSrc}">                                              
                    </div>                   
                    <div "relatedVideogameInfo" class= "row p-2">
                    <p>${related.name} </p> 
                    <p>${related.description}</p>
                    </div>
                    <div class= "row p-2">
                    <a href="products-info.html">Ver</a>
                    </div>                     
                </div>`
            }
    
        }
        document.getElementById("relatedProductContainer").innerHTML = productHtmlToAppend;

    });
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === 'ok') {
            product = resultObj.data;
        
            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productCostHTML.innerHTML = product.cost;
            productCurrencyHTML.innerHTML = product.currency;
            productSoldCountHTML.innerHTML = product.soldCount;
            productCategoryHTML.innerHTML = product.category;

            showImagesGallery(product.images);

            showRelatedProducts(product.relatedProducts);
            
        }

    });
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(resultObj => {
        let productComments = resultObj.data;
        //console.log(productComments);
        showReviews(productComments);
    });

    document.getElementById("submitComment").addEventListener("click", function(){

        postComments();
    });

    //submitComment.addEventListener("click", postComments);

});


