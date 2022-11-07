//Récuperation de l'id du produit à partir de l'URL de la page //
let urlParameter=window.location.search
let urlParams=new URLSearchParams(urlParameter)
let idValue=urlParams.get('_id')


//fetch recupere uniquement le produit dont l'id correspond à l'URL //
fetch("http://localhost:3000/api/products/"+idValue)
    .then(response=>response.json())
    .then(data=>{showResult(data)})   
    .catch(err=>console.log("Il y'a une erreur : "+err+" , il faut corriger l'erreur et réessayer."))


//fonction qui affiche les résultats dans les champs correspondants //
function showResult(data){
    document.querySelector(".item__img").insertAdjacentHTML("afterbegin",`<img src="${data.imageUrl}" alt="${data.altTxt}">`)
    document.getElementById("price").insertAdjacentHTML("afterbegin", `${data.price}`)
    document.getElementById("description").insertAdjacentHTML("afterbegin",`${data.description}`)


    //boucle qui permet d'afficher les couleurs une à une dans le menu déroulant //
    for(let color of data.colors){
        document.getElementById("colors").insertAdjacentHTML("beforeend",`<option value="${color}">${color}</option>`)
    }
}


//PANIER//

//Verifie si il y a deja qqch dans le panier//
function getBasket(){
    let basket=localStorage.getItem("basket")
    if (basket==null){
        return[]
    } 
    else{
        return JSON.parse(basket)
    }
}


//mémorise le panier dans le localstorage//
function saveBasket(basket){
    localStorage.setItem("basket",JSON.stringify(basket))
}


//recherche si le produit est deja dans le panier 
function addBasket(product){
    let basket=getBasket()
    let foundProduct=basket.find((p)=>p.id==product.id&&p.color==product.color)
    if (foundProduct==null){
        basket.push(product)
        saveBasket(basket)
    }
    else{
        foundProduct.quantity+=product.quantity
        saveBasket(basket)
    }
}

//déclare les variables à prendre en compte pour l'ajout au panier au clique de la souris sur le bouton "addToCart"//
//Vérifie que les données ont bien été entrées
addToCart.onclick=()=>{
    let product={
        id:idValue,
        color:colors.value,
        quantity:parseInt(quantity.value)
    }
    if (product.quantity<1 || product.quantity>100){
        alert('veuillez entrer une quantité comprise entre 1 et 100')
    }   
    else if(product.color==0){
        alert('veuillez choisir une couleur dans la liste')
    }
    else{
        addBasket(product)
        alert('Votre produit a bien été ajouté à votre panier')
    }          
}