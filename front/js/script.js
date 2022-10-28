//Récuperation de tout les produits de l'API //
fetch("http://localhost:3000/api/products")
  .then(response=>response.json())
  .then(data=>{products(data)})
  .catch(err=>console.log("Il y'a une erreur:"+err))


//Fonction d'affichage des produits dans la page index //
function products(data){
  let sectionProducts=document.getElementById("items")
  for(let product of data){
    sectionProducts.insertAdjacentHTML("afterbegin", 
    `<a href="./product.html?_id=${product._id}">
    <article>
      <img src="${product.imageUrl}" alt="${product.altTxt}">
      <h3 class="productName">${product.name}</h3>
      <p class="productDescription">${product.description}</p>
    </article>
    </a>`)
  }
}