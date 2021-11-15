// déclaration de l'appel API
// function returnPromise(){
//   return new Promise((resolve) => {

//     if(true){
//       resolve('ok');
//     }
//   });
// }
// création de la fonction de récupération du localstorage
function getBasket() {
  if(!localStorage.getItem("basket")) {
    h1.textContent = "Votre panier est vide"
    return false;
  }
  getApi();
  console.log('ok')
}

// lancement de la recupération dans la variable basket
getBasket();

function qtyColorAdd (kanap) {
  kanap.qty = basket[i].kanapQuantity;
  kanap.colorSelected = basket[i].kanapColor;
}

// appel des produits dans l'api qui sont dans le panier
async function getApi() {
  // const attenteAsync = await returnPromise();
  let basket = JSON.parse(localStorage.getItem("basket"));
  let products = [];
  for (let i in basket) {
    let response = await fetch('http://localhost:3000/api/products/' + basket[i].kanapID);
    let kanaps = await response.json();
    let kanap = kanaps[i];
    qtyColorAdd(kanap)
    products.push(kanap);
    console.log(kanap);
  }
}
// getApi();
