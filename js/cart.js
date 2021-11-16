let form = document.querySelector('form');
let inputs = document.querySelectorAll('input[type="text"], input[type="email"]');
// console.log(inputs);
let firstName, lastName, address, city, email;
// console.log(form);

let h1 = document.querySelector('h1')
// console.log(localStorage.getItem("basket"));
// création de la fonction de récupération du localstorage
function getBasket() {
  let stockProduct = JSON.parse(localStorage.getItem("basket"));
  if(stockProduct === null || stockProduct == 0) {
    h1.textContent = "Votre panier est vide"
    return false;
  }
  displayProduct();

  // return JSON.parse(localStorage.getItem("basket"));
} 
getBasket();
// lancement de la recupération dans la variable basket
// console.log(basket);

function displayProduct() {
  let basket = JSON.parse(localStorage.getItem("basket"));
  let products = [];
  for (let i in basket) {
      fetch('http://localhost:3000/api/products/' + basket[i].kanapId).then((res) => res.json()).then((kanap) => {
        kanap.qty = basket[i].kanapQuantity;
        kanap.colorSelected = basket[i].kanapColor;
        products.push(kanap);
        creatBasket(products[i], kanap)
        calcul(kanap);

        supprimerArticle(basket);
      // console.log(products[i]);
      // supprimerArticle(deleteItem);
    });
  }
};
// let quantitySelected = document.querySelectorAll('input[type="number"]');


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
  // ecoute on change
  quantitySelected.forEach(event => {
    event.addEventListener('change', (changeE) => {
      // console.log(event.value);
      // console.log(changeE);
      totPrice += parseInt(kanap.price) * parseInt(event.value);
      totQuantity += parseInt(event.value)
      console.log(totPrice);
      console.log(totQuantity);
    })
  })
};
// calcul des totaux
function calculTot(price, quantity){
  let totalPrice = document.getElementById("totalPrice")
  totalPrice.textContent = price;
  let totalQuantity = document.getElementById("totalQuantity");
  totalQuantity.textContent = quantity;
}


// declaration de la fonction supprimer l'article
function supprimerArticle(element) {
  let deleteItem = document.querySelectorAll(".deleteItem");
  // console.log(deleteItem);
  for (let j = 0; j < deleteItem.length; j++){
    deleteItem[j].addEventListener('click', (e) => {
      let idToDelete = {
        id: element[j].kanapId,
        color: element[j].kanapColor
      };
      // console.log(idToDelete);
      element = element.filter( el => el.kanapId !== idToDelete.color && el.kanapColor !== idToDelete.color);
      // console.log(element);
      localStorage.setItem("basket", JSON.stringify(element));

      alert("Ce produit a été supprimé du panier");
      window.location.href = "cart.html"
    })
  }
}
// function basketCheck();

// function modifBasket(local) {
//   let newBasket = basketCheck(local, tag);
// } 
// quantityselected.addEventListener('change', (e) => {
//   if (e.target.value < 1) {
//     suppBasket()
//   } else {
//     modifBasket()
//   }
//   localStorage.setItem("basket", JSON.stringify(newBasket));
// })

// fonction de la creation de page panier d'après le contenu du localstorage
function creatBasket(local, api) {
  let article = document.createElement('article');
  article.setAttribute('class', 'cart__item');
  article.setAttribute('data-id', local.kanapId);

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
  h2.textContent = api.name + ` (${local.colorSelected})`;

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
  numberInput.setAttribute('value', local.qty);
  numberInput.unitPrice = api.price;

  let cartItemContentSettingsDelete = document.createElement('div');
  cartItemContentSettingsDelete.setAttribute('class', 'cart__item__content__settings__delete');

  let pDelete = document.createElement('p');
  pDelete.setAttribute('class', 'deleteItem');
  pDelete.textContent = 'Supprimer';

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






function errorMsg(id, message, valid) {
  const container = document.getElementById(id);
  // console.log(id);
  const errorText = document.getElementById(id + 'ErrorMsg');
  if(!valid) {
    errorText.textContent = message;
  } else {
    errorText.textContent = "";
  }
};
function nameChecker(value, tag, name) {
  if (value.length > 0 && (value.length < 2 || value.length > 20)){
    errorMsg(name, `Veuillez entrée un  ${tag}  valide`, false);
    // name = null;
  } else if (!value.match(/^[a-zA-Z-]+$/)) {
    errorMsg(name, `Le ${tag} ne doit pas contenir de caractères spéciaux`, false);
    // name = null;
  } else {
    errorMsg(name, "", true);
    return true;
  }
  return false;
};
function adressChecker(value) {
  if (!value.match(/^[a-zA-Z0-9-]+$/)) {
    errorMsg('adress', 'adresse invalide', false);
    // address = null;
  } else {
    errorMsg('address', "", true);
    return true;
  }
  return false;
};
function emailChecker(value) {
  if (!value.match(/^[\w_-]+@[\w-]+\.[a-z]{2,4}$/i)) {
    errorMsg('email', 'adresse mail invalide', false);
    // email = null;
  } else {
    errorMsg('email', "", true);
    return true;
  }
  return false;
};

let data = {
  firstName: firstName,
  lastName: lastName,
  address: address,
  city: city,
  email: email,
};

inputs.forEach((input) => {
  input.addEventListener('input', (e) =>{
    switch (e.target.id) {
      case 'firstName':
        nameChecker(e.target.value, "prenom", "firstName")
        break;
      case 'lastName':
        nameChecker(e.target.value, "nom", "lastName")
        break;
      case 'adress':
        adressChecker(e.target.value)
        break;
      case 'city':
        nameChecker(e.target.value, "ville", "city")
        break;
      case 'email':
        emailChecker(e.target.value)
        break;
    }
  });
});
// form.addEventListener('submit', (e) => {
//   e.preventDefault();
//   console.log(e.target);
//   // e.forEach(input => {
//   //   if (input == true) {
//   //     console.log(input);
//   //   }
//   // })
//   // if (firstName && lastName && address && city && email) {
//   //   console.log(data);
//   //  } else {
//   //    console.log('erreur');
//   // 
