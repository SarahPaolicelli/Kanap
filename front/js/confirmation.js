/**
 * Récupere le numéro de commande dans l'URL
 */
let orderId=new URL(window.location).searchParams.get("orderId")

/**
 * Affiche le numéro de commande dans la page
 * numbersId : le numéro de commande
 */
function showOrderId(numbersId) {
    document.getElementById("orderId").innerText=`${numbersId}`
}

/**
 * Appel à la fonction
 */
showOrderId(orderId)