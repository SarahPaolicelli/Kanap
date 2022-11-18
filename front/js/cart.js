//Récuperation de tout les produits de l'API //
fetch("http://localhost:3000/api/products")
  .then(response => response.json())
  .then(data => { showResult(data) })
  .catch(err => console.log("Il y'a une erreur: " + err))


//Verifie si il y a deja qqch dans le panier//
function getBasket() {
  let basket = localStorage.getItem("basket")
  if (basket == null) {
    return []
  }
  else {
    return JSON.parse(basket)
  }
}

//affiche les caracteristiques qui correspondent aux articles dans le panier
function showResult(data) {
  let productInfos
  let basket = getBasket()
  if (basket.length >= 1) {
    let cart__items = document.getElementById("cart__items")
    let basket = getBasket()
    for (let product of basket) {
      productInfos = data.find(obj => { return obj._id === product.id })
      cart__items.insertAdjacentHTML("afterbegin",
        `<article class="cart__item" data-id="${product.id}" data-color="${product.color}">
      <div class="cart__item__img">
        <img src="${productInfos.imageUrl}" alt="${productInfos.alt}">
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__description">
          <h2>${productInfos.name}</h2>
          <p>${product.color}</p>
          <p>${productInfos.price}€</p>
        </div>
        <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
            <p>Qté : </p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" id="quantity" value="${product.quantity}">
          </div>
          <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
          </div>
        </div>
      </div>
    </article>`)
    }
  }
  else {
    cart__items.insertAdjacentHTML("afterbegin", "<h2>Votre panier est vide.</h2>")
  }
}

//Fonction qui modifie la quantité
let basket=JSON.parse(localStorage.getItem("basket"))
let quantity=document.querySelectorAll(".itemQuantity")
for (let newQuantity of quantity){
  newQuantity.addEventListener("change", changeQuantity)
  function changeQuantity() {
    for (product of basket){
        if (newQuantity<1 || newQuantity>100){
          alert("Vous devez entrer un nombre compris entre 1 et 100")
        }
        else{
          product.quantity = parseInt(newQuantity)
          localStorage.basket = JSON.stringify(basket)
        }
    }
  }
}

//fonction qui supprime l'objet au clique sur le bouton supprimer
let deletePointer = document.querySelectorAll(".deleteItem")
console.log(deletePointer)
for (let deleteObject of deletePointer)
deleteObject.addEventListener('click', deleteFonction)
function deleteFonction(){

}



