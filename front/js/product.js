//Récuperation de l'id du produit à partir de l'URL de la page //
let idValueFull=window.location.search
let urlParams=new URLSearchParams(idValueFull)
let idValue=urlParams.get('_id')


//fetch recupere uniquement le produit dont l'id correspond à l'URL //
fetch("http://localhost:3000/api/products/"+idValue)
    .then(response=>response.json())
    .then(data=>{showResults(data)})   
    .catch(err=>console.log("Il y'a une erreur : "+err+" , il faut corriger l'erreur et réessayer."))


//fonction qui affiche les résultats dans les champs correspondants //
function showResults(data){
    document.querySelector(".item__img").insertAdjacentHTML("afterbegin",`<img src="${data.imageUrl}" alt="${data.altTxt}">`)
    document.getElementById("price").insertAdjacentHTML("afterbegin", `${data.price}`)
    document.getElementById("description").insertAdjacentHTML("afterbegin",`${data.description}`)


    //boucle qui permet d'afficher les couleurs une à une dans le menu déroulant //
    for(let color of data.colors){
        document.getElementById("colors").insertAdjacentHTML("beforeend",`<option value="${color}">${color}</option>`)
    }
}

