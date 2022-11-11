//Récuperation de tout les produits de l'API //
fetch("http://localhost:3000/api/products")
  .then(response=>response.json())
  .then(data=>{showResult(data)})
  .catch(err=>console.log("Il y'a une erreur: "+err))


function showResult(data){
  let basket=getBasket()
    let foundProduct=basket.find((p)=>p.id==data.id)
    console.log(foundProduct)
}




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


//Création de cart__item pour chaque produit//
if(localStorage.getItem("basket")!=null){
  let cart__items=document.getElementById("cart__items")
  let basket=getBasket()
  for (let product of basket){
   cart__items.insertAdjacentHTML("afterbegin",
    `<article class="cart__item" data-id="${product.id}" data-color="${product.color}">
      <div class="cart__item__img">
        <img src="" alt="Photographie d'un canapé">
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__description">
          <h2></h2>
          <p>${product.color}</p>
          <p>€</p>
        </div>
        <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
            <p>Qté : </p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
          </div>
          <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
          </div>
        </div>
      </div>
    </article>`)    
    }
  }
else{
  alert('Votre panier est vide')
  }
