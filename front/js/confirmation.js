//Récupération du numéro de commande via l'URL//
let orderId=new URL(window.location).searchParams.get("orderId")

//affichage du numéro de commande//
function showOrderId(numbersId) {
    document.getElementById("orderId").innerText=`${numbersId}`
}
showOrderId(orderId)