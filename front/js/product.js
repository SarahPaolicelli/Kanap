/**
 * Récuperation de l'id du produit à partir de l'URL de la page
 */
let urlParameter=window.location.search
let urlParams=new URLSearchParams(urlParameter)
let idValue=urlParams.get('_id')


/**
 * Fetch récupère uniquement le produit dont l'ID correspond à l'URL
 */
fetch("http://localhost:3000/api/products/"+idValue)
    .then(response=>response.json())
    .then(data=>{showResult(data)})   
    .catch(err=>console.log("Il y'a une erreur : "+err+" , il faut corriger l'erreur et réessayer."))


/**
 * Affiche les résultats dans les champs correspondants
 * data : contient les infos récupéré de l'API sur l'item
 * return : affiche les infos en HTML dynamique
 */
function showResult(data){
    document.querySelector(".item__img").insertAdjacentHTML("afterbegin",`<img src="${data.imageUrl}" alt="${data.altTxt}">`)
    document.getElementById("price").insertAdjacentHTML("afterbegin", `${data.price}`)
    document.getElementById("description").insertAdjacentHTML("afterbegin",`${data.description}`)


    /**
     * Affiche chaque couleur dans une option
     */
    for(let color of data.colors){
        document.getElementById("colors").insertAdjacentHTML("beforeend",`<option value="${color}">${color}</option>`)
    }
}


//PANIER//

/**
 * Vérifie si il y'a un item dans le panier du localStorage
 * 
 * return : rien si le panier est vide ou une valeur javascript
 */
function getBasket(){
    let basket=localStorage.getItem("basket")
    if (basket==null){
        return[]
    } 
    else{
        return JSON.parse(basket)
    }
}


/**
 * envoie les items dans le localStorage
 * basket : item à envoyer
 * return : rien
 */
function saveBasket(basket){
    localStorage.setItem("basket",JSON.stringify(basket))
}


/**
 * verifie si les items sont déjà dans le basket (compare id et color), si non: les ajoutes
 * product : item à vérifier et/ou ajouter au panier
 * return : rien
 */
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

/**
* Au clique, vérifie si les entrées sont correct
* Définit product
*/
addToCart.onclick=()=>{
    let product={
        id:idValue,
        color:colors.value,
        quantity:parseInt(quantity.value)
    }
    if (product.quantity<1 || product.quantity>100){
        alert(`Veuillez choisir une quantité comprise entre 1 et 100`)
    }   
    else if(product.color==0){
        alert('Veuillez choisir une couleur dans la liste déroulante')
    }
    else{
        addBasket(product)
        alert('Votre produit a bien été ajouté à votre panier')
    }          
}