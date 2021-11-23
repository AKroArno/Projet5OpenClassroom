let basket = JSON.parse(localStorage.getItem("basket"));

let h1 = document.querySelector('h1')
// console.log(localStorage.getItem("basket"));
// création de la fonction de récupération du localstorage
function getBasket() {
  let stockProduct = JSON.parse(localStorage.getItem("basket"));
  if(stockProduct === null || stockProduct == 0) {
    h1.textContent = "Votre panier est vide"
    return false;
  }
  displayProduct(stockProduct);
} 
getBasket();


// lancement de la recupération dans la variable basket
function displayProduct(basket) {
  for (let i in basket) {
      fetch('http://localhost:3000/api/products/' + basket[i].kanapId).then((res) => res.json()).then((kanap) => {
        kanap.qty = basket[i].kanapQuantity;
        kanap.colorSelected = basket[i].kanapColor;
        creatBasket(kanap)
        calcul(kanap);
    });
  }
};


// declaration de la fontion de calcul du panier
function calcul(kanap) {
  let quantitySelected = document.querySelectorAll('input[type="number"]');
  let totPrice = 0;
  let totQuantity = 0;
  quantitySelected.forEach(e => {
    totPrice += parseInt(kanap.price) * parseInt(e.value);
    totQuantity += parseInt(e.value);
    calculTot(totPrice, totQuantity)
  });
};

function calculChange(price) {
  let quantitySelected = document.querySelectorAll('input[type="number"]');
  let newTotPrice = 0;
  let newTotQuantity = 0;
  quantitySelected.forEach(e => {
    newTotPrice += parseInt(price) * parseInt(e.value);
    newTotQuantity += parseInt(e.value);

    calculTot(newTotPrice, newTotQuantity)
  });
};

// calcul des totaux
function calculTot(price, quantity){
  let totalPrice = document.getElementById("totalPrice")
  totalPrice.textContent = price;
  let totalQuantity = document.getElementById("totalQuantity");
  totalQuantity.textContent = quantity;
};

// declaration de la fonction supprimer l'article
function supprimerArticle(event) {
  let deleteItem = event.target;
  let idToDelete = {
    id: deleteItem.idProduct,
    color: deleteItem.colorSelected
  };
  // let basket = JSON.parse(localStorage.getItem("basket"));
  basket = basket.filter( el => el.kanapId !== idToDelete.color && el.kanapColor !== idToDelete.color);
  localStorage.setItem("basket", JSON.stringify(basket));
  alert("Ce produit a été supprimé du panier");
  deleteItem.closest(".cart__item").remove();
}


function modifBasket(event) {
  let inputNum = event.target;
  if (inputNum.value < 1) {
    alert("Quantité de produit non conforme");
    inputNum.value = inputNum.actualQuantity;
    return false;
  } 
  // let basket = JSON.parse(localStorage.getItem("basket"));
  basket.forEach((elem) => {
    if (elem.kanapId == inputNum.idProduct && elem.kanapColor == inputNum.colorSelected) {
      inputNum.actualQuantity = inputNum.value;
      elem.kanapQuantity = parseInt(inputNum.value); 
      calculChange(inputNum.unitPrice);
      return basket;
    }
  });
  localStorage.setItem("basket", JSON.stringify(basket));

  console.log(basket);
} 

// fonction de la creation de page panier d'après le contenu du localstorage
function creatBasket(api) {
  let article = document.createElement('article');
  article.setAttribute('class', 'cart__item');
  article.setAttribute('data-id', api._id);

  let cartItemImg = document.createElement('div');
  cartItemImg.setAttribute('class', 'cart__item__img');

  let img = document.createElement('img');
  img.setAttribute('src', api.imageUrl);
  img.setAttribute('alt', api.altTxt);

  let cartItemContent = document.createElement('div');
  cartItemContent.setAttribute('class', 'cart__item__content');

  let cartItemContentTitlePrice = document.createElement('div');
  cartItemContentTitlePrice.setAttribute('class', 'cart__item__content__title');

  let h2 = document.createElement('h2');
  h2.textContent = api.name + ` (${api.colorSelected})`;

  let pPrice = document.createElement('p');
  pPrice.textContent = api.price + " €";

  let cartItemContentSettings = document.createElement('div');
  cartItemContentSettings.setAttribute('div', 'cart__item__content__settings');

  let cartItemContentSettingsQuantity = document.createElement('div');
  cartItemContentSettingsQuantity.setAttribute('class', 'cart__item__content__settings__quantity');

  let pQte = document.createElement('p');
  pQte.textContent = "Qté : "

  let numberInput = document.createElement('input');
  numberInput.setAttribute('type', 'number');
  numberInput.setAttribute('class', 'itemQuantity');
  numberInput.setAttribute('name', 'itemQantity');
  numberInput.setAttribute('min', '1');
  numberInput.setAttribute('max', '100');
  numberInput.setAttribute('value', api.qty);
  numberInput.unitPrice = api.price;
  numberInput.actualQuantity = api.qty;
  numberInput.colorSelected = api.colorSelected;
  numberInput.idProduct = api._id;
  numberInput.addEventListener('change', (e) => {
    modifBasket(e);
    calculChange(numberInput.unitPrice);
  });

  let cartItemContentSettingsDelete = document.createElement('div');
  cartItemContentSettingsDelete.setAttribute('class', 'cart__item__content__settings__delete');

  let pDelete = document.createElement('p');
  pDelete.setAttribute('class', 'deleteItem');
  pDelete.textContent = 'Supprimer';
  pDelete.idProduct = api._id;
  pDelete.colorSelected = api.colorSelected;
  pDelete.addEventListener('click', (e) => {
    supprimerArticle(e);
    calculChange(numberInput.unitPrice);
  })

  let cartItem = document.getElementById('cart__items');

  cartItem.appendChild(article);
  article.appendChild(cartItemImg);
  cartItemImg.appendChild(img);
  article.appendChild(cartItemContent);
  cartItemContent.appendChild(cartItemContentTitlePrice);
  cartItemContentTitlePrice.appendChild(h2);
  cartItemContentTitlePrice.appendChild(pPrice);
  cartItemContent.appendChild(cartItemContentSettings);
  cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);
  cartItemContentSettingsQuantity.appendChild(pQte);
  cartItemContentSettingsQuantity.appendChild(numberInput);
  cartItemContentSettings.appendChild(cartItemContentSettingsDelete);
  cartItemContentSettingsDelete.appendChild(pDelete);
};

// let form = document.querySelector('form');
// let inputs = document.querySelectorAll('input[type="text"], input[type="email"]');
// // console.log(basket);
// inputs.forEach((input) => {
//   input.addEventListener('input', (e) =>{
//     switch (e.target.id) {
//       case 'firstName':
//         nameChecker(e.target.value, "prenom", "firstName");
//         // firstName = e.target.value;
//         break;
//       case 'lastName':
//         nameChecker(e.target.value, "nom", "lastName");
//         // lastName = e.target.value;
//         break;
//       case 'address':
//         adressChecker(e.target.value);
//         // address = e.target.value;
//         break;
//       case 'city':
//         nameChecker(e.target.value, "ville", "city")
//         // city = e.target.value;
//         break;
//       case 'email':
//         emailChecker(e.target.value)
//         // email = e.target.value
//         break;
//       // default
//     };
//   });
// });


// Selection du bouton envoyer le formulaire
let order = document.querySelector("#order");
let first = document.querySelector("#firstName");
let last = document.querySelector("#lastName");
let town = document.querySelector("#city");
let street = document.querySelector("#address");
let lien = document.querySelector("#email");
// console.log(first);
// console.log(last);
// console.log(town);
// console.log(street);
// console.log(lien);

// console.log(basket);

order.addEventListener("click", (e) => {
  e.preventDefault();
  // récupération des valeurs du formulaire
  let contact = {
  firstName: document.querySelector("#firstName").value,
  lastName: document.querySelector("#lastName").value,
  address: document.querySelector("#address").value,
  city: document.querySelector("#city").value,
  email: document.querySelector("#email").value,
  };
  console.log(contact);
  // if(nameChecker(), adressChecker(), emailChecker()) {
    // console.log(  nameChecker(e.target.value, "prénom", "firstNameErroeMsg"), nameChecker(e.target.value, "nom", "lastNameErroeMsg"),  nameChecker(e.target.value, 'ville', 'cityErrorMsg'), adressChecker(), emailChecker());
  //     // mettre data dans localStorage
  // localStorage.setItem("contact", JSON.stringify(contact));
  let arrayProducts = [];
  basket.forEach((product) => {
    arrayProducts.push(product.kanapId)
  });
  // console.log(arrayProducts);

  // faire un objet avec les donnés du panier et les data
  let toSend = {
    contact,
    arrayProducts
  }
  console.log(toSend);

  // envoie de l'objet toSend vers le serveur
  let promise = fetch("https://localhost:3000/api/products/order", {
    method: "POST",
    body: JSON.stringify(toSend),
    headers: {
      "content-Type" : "application/json"
    }
  });
  // console.log(promise);
});

// gardrer le contenu du local storage dans le formulaire
// let dataLocal = JSON.parse(localStorage.getItem("contact"));

// function getInputValues(input) {
//   document.querySelector(`#${input}`).value = dataLocal[input];
// }
// getInputValues("firstName");
// getInputValues("lastName");
// getInputValues("address");
// getInputValues("city");
// getInputValues("email");


function errorMsg(id, message, valid) {
  if(!valid) {
    id.textContent = message;
  } else {
    id.textContent = "";
  }
};
first.addEventListener('input', (e) => {
  nameChecker(e.target.value, "prénom", "firstNameErroeMsg");
  console.log('ok');
});
last.addEventListener('input', (e) => {
  nameChecker(e.target.value, "nom", "lastNameErroeMsg");
});
town.addEventListener('input', (e) => {
  nameChecker(e.target.value, 'ville', 'cityErrorMsg');
});
street.addEventListener('input', (e) => {
  adressChecker(e.target.value);
});
lien.addEventListener('input', (e) => {
  emailChecker(e.target.value);
});

function emailChecker(result) {
  if (!(/^[\w_-]+@[\w-]+\.[a-z]{2,4}$/i).test(result)) {
    errorMsg('email', 'adresse mail invalide', false);
  } else {
    errorMsg('email', "", true);
    return true;
  }
  return false;
};

function adressChecker(result) {
  if (!(/^[a-zA-Z0-9-]+$/).test(result)) {
    errorMsg('address', 'adresse invalide', false);
  } else {
    errorMsg('address', "", true);
    return true;
  }
  return false;
};


function nameChecker(result, tag, inputName) {
  if (result.length >= 0 && (result.length < 2 || result.length > 20)) {
    errorMsg(inputName, `Veuillez entrée un ${tag} valide`, false);
  } else if ((/^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._\s-]+$/).test(result)) {
    errorMsg(inputName, `Le ${tag} ne doit pas contenir de caractères spéciaux`, false);
  } else {
    errorMsg(inputName, "", true);
    console.log('ko');
    return true
  }
  return false
}
