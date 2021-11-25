// chargement  document HTML initial quand chargé et analysé
document.addEventListener('DOMContentLoaded', () => {
  initPage();
});

// fonction du choix d'ouverture de la page si orderID dans l'URL
function initPage() {
  let params = new URLSearchParams(window.location.search);
  if (params.get("orderId") !== null) {
    const elem = document.getElementById('orderID');
    elem.textContent = params.get('orderID');
    return false
  }
  getBasket();
}

// création de la fonction de récupération du localstorage si existant
function getBasket() {
  let stockProduct = JSON.parse(localStorage.getItem("basket"));
  if(stockProduct === null || stockProduct == 0) {
    let h1 = document.querySelector('h1');
    h1.textContent = "Votre panier est vide"
    return false;
  }
  displayProduct(stockProduct);
} 

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

// fonction de récupération du contenu du localstorage
function getLocalStorage() {
  return JSON.parse(localStorage.getItem("basket"));
}

// déclaration de la fontion de calcul du panier
function calcul(kanap) {
  let quantitySelected = document.querySelectorAll('input[type="number"]');
  let totPrice = 0;
  let totQuantity = 0;
  quantitySelected.forEach(e => {
    totPrice += parseInt(kanap.price) * parseInt(e.value);
    // console.log(kanap.price);
    // console.log(e.value);
    // console.log(totPrice);
    totQuantity += parseInt(e.value);
    calculTot(totPrice, totQuantity)
  });
};

// déclaration de la fonction de calcul du panier après modification
function calculChange(price) {
  let quantitySelected = document.querySelectorAll('input[type="number"]');
  let newTotPrice = 0;
  let newTotQuantity = 0;
  quantitySelected.forEach(e => {
    newTotPrice += price * e.value;
    newTotQuantity += parseInt(e.value);
    calculTot(newTotPrice, newTotQuantity)
  });
};

// déclaration de la fonction de calcul des totaux
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
  let cart = getLocalStorage();
  basket = cart.filter( el => el.kanapId !== idToDelete.color && el.kanapColor !== idToDelete.color);
  localStorage.setItem("basket", JSON.stringify(basket));
  alert("Ce produit a été supprimé du panier");
  deleteItem.closest(".cart__item").remove();
}

// déclaration de la fonction pour la modification de la quantité qui modifie le contenu de la quantité dans le localStorage
function modifBasket(event) {
  let basket = getLocalStorage();
  let inputNum = event.target;
  if (inputNum.value < 1) {
    alert("Quantité de produit non conforme");
    inputNum.value = inputNum.actualQuantity;
    return false;
  } 
  basket.forEach((elem) => {
    if (elem.kanapId == inputNum.idProduct && elem.kanapColor == inputNum.colorSelected) {
      inputNum.actualQuantity = inputNum.value;
      elem.kanapQuantity = parseInt(inputNum.value); 
      calculChange(inputNum.unitPrice);
      return basket;
    }
  });
  localStorage.setItem("basket", JSON.stringify(basket));
  // console.log(basket);
} 

// fonction de la création dynamique de page panier d'après le contenu du localstorage
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
    // écoute du change pour modification les totaux et du localStorage
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
    // écoute du click pour suppression
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
  let order = document.querySelector('#order');
    // écoute du click pour l'envoi
  order.addEventListener('click', (e) => {
    e.preventDefault();
    sendOrder();
    // console.log(sendOrder());
  });
  formChecker();
};

// console.log(document.getElementById("address"));
// déclaration de la fonction qui crée l'objet à retourner à l'api contenant l'objet contact et l'array des ID produits du panier
function sendOrder() {
  // récupération des valeurs du formulaire en objet 'contact'
  let contact = {
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    email: ''
  };

  let firstName = document.getElementById("firstName").value;
  console.log(firstName);
  if(!nameChecker(firstName, "prénom", "firstNameErrorMsg")) {
    return false;
  } 
  contact.firstName = firstName;

  let lastName = document.getElementById("lastName").value;
  console.log('lastName');
  console.log(lastName);
  if(!nameChecker(lastName, "prénom", "lastNameErrorMsg")) {
    return false;
  }
  contact.lastName = lastName;
  
  let address = document.getElementById("address").value;
  console.log(address);
  if(!addressChecker(address)) {
    return false;
  }
  contact.address = address;
  console.log(contact);
  
  let city  = document.getElementById("city").value;
  console.log(city);
  if(!nameChecker(city, 'ville', 'cityErrorMsg')) {
    return false;
  }
  contact.city = city;
  // console.log(city);

  
  let email = document.getElementById("email").value;
  console.log(email);
  if(!emailChecker(email)) {
    return false;
  }
  contact.email = email;
  console.log(contact);

  // localStorage.setItem("contact", JSON.stringify(contact));
  // console.log(contact);

  // console.log(contact);
  let products = [];
  let basket = getLocalStorage();
  basket.forEach((product) => {
    products.push(product.kanapId)
  });
  // console.log(arrayProducts);

  // faire un objet avec les donnés du panier et les data
  let toSend = {
    contact,
    products
  }
  console.log(toSend);

  // envoie de l'objet toSend vers le serveur
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    body: JSON.stringify(toSend),
    headers: {
      "content-Type" : "application/json"
    }
  })
  .then((res) => res.json())
    // exploitation de la réponse en JSON
  .then((data) => {
    console.log('success:', data);
    // localStorage.clear();
    let urlcourante = document.location.href;
    urlcourante = urlcourante.replace('cart.html', '');

    let confirm = 'confirmation.html?orderID='+ data.orderID;
    let url = urlcourante + confirm;
    window.location = url;
  });
}

// définition de la fonction qui affiche le message d'erreur
function errorMsg(id, message, valid) {
  // console.log(id);
  let elem = document.getElementById(id);
  if(!valid) {
    elem.textContent = message;
  } else {
    elem.textContent = "";
  }
}

// déclaration de la fonction de controle du formulaire
function formChecker() {
  let first = document.querySelector("#firstName");
  // console.log(first);
  let last = document.querySelector("#lastName");
  let town = document.querySelector("#city");
  let street = document.querySelector("#address");
  let lien = document.querySelector("#email");
  first.addEventListener('input', (e) => {
    // console.log(e.target.value);
    nameChecker(e.target.value, "prénom", "firstNameErrorMsg");
  });
  last.addEventListener('input', (e) => {
    nameChecker(e.target.value, "nom", "lastNameErrorMsg");
  });
  town.addEventListener('input', (e) => {
    nameChecker(e.target.value, 'ville', 'cityErrorMsg');
  });
  street.addEventListener('input', (e) => {
    addressChecker(e.target.value);
  });
  lien.addEventListener('input', (e) => {
    emailChecker(e.target.value);
  });
}

// test regExp email
function emailChecker(result) {
  if (!(/^[\w_-]+@[\w-]+\.[a-z]{2,4}$/i).test(result)) {
    errorMsg('emailErrorMsg', 'adresse mail invalide', false);
  } else {
    errorMsg('emailErrorMsg', "", true);
    return true;
  }
  return false;
}

// test regExp adresse
function addressChecker(result) {
  if (!(/^[a-zA-Z0-9- ]+$/i).test(result)) {
    errorMsg('addressErrorMsg', 'adresse invalide', false);
  } else {
    errorMsg('addressErrorMsg', "", true);
    return true;
  }
  return false;
}

// test regExp nom, prénom, ville
function nameChecker(result, tag, inputName) {
  // console.log(inputName);
  if (result.length >= 0 && (result.length < 2 || result.length > 20)) {
    errorMsg(inputName, `Veuillez entrée un ${tag} valide`, false);
  } else if (!(/^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._\s-]+$/).test(result)) {
    errorMsg(inputName, `Le ${tag} ne doit pas contenir de caractères spéciaux`, false);
  } else {
    errorMsg(inputName, "", true);
    return true
  }
  return false
}
