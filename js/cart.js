const form = document.querySelector('form');
const inputs = document.querySelectorAll('input');
// const firstName, lastName, adress, city, email;
let itemQuantity = localStorage.getItem('quantity');



function creatBasket(tag) {
  let cartItem = document.getElementById('cart__items');
  let article = document.createElement('article');
  article.setAttribute('class', 'cart__item');
  article.setAttribute('data-id', product-ID);

  let cartItemImg = document.createElement('div');
  cartItemImg.setAttribute('class', 'cart__item__img');

  let img = document.createElement('img');
  img.setAttribute('src', tag.imageUrl);
  img.setAttribute('alt', tag.altTxt);
  img.setAttribute('width', 200);
  img.setAttribute('height', 200);

  let cartItemContent = document.createElement('div');
  cartItemContent.setAttribute('class', 'cart__item__content');

  let cartItemContentTitlePrice = document.createElement('div');
  cartItemContentTitlePrice.setAttribute('class', 'cart__item__content__title');

  let h2 = document.createElement('h2');
  h2.textContent = tag.price;

  let pPrice = document.createElement('p');
  pPrice.textContent = tag.price;

  let cartItemContentSettings = document.createElement('div');
  cartItemContentSettings.setAttribute('div', 'cart__item__content__settings');

  let cartItemContentSettingsQuantity = document.createElement('div');
  cartItemContentSettingsQuantity.setAttribute('class', 'cart__item__content__settings__quantity');

  let pQte = document.createElement('p');

  let numberInput = document.createElement('input');
  numberInput.setAttribute('type', 'number');
  numberInput.setAttribute('class', 'itemQuantity');
  numberInput.setAttribute('name', 'itemQantity');
  numberInput.setAttribute('min', '1');
  numberInput.setAttribute('max', '100');
  numberInput.setAttribute('value', itemQuantity);

  let cartItemContentSettingsDelete = document.createElement('div');
  cartItemContentSettingsDelete.setAttribute('class', 'cart__item__content__settings__delete');

  let pDelete = document.createElement('p');
  pDelete.setAttribute('class', 'deleteItem');
  pDelete.textContent = 'Supprimer';

  cartItem.appendChild(article);
  article.appendChild(cartItem);
  cartItem.appendChild(cartItemImg);
  cartItemImg.appendChild(img);
  cartItem.appendChild(cartItemContent);
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


fetch('http://localhost:3000/api/products').then((res) => res.json()).then((kanaps) => {
  kanaps.map(kanap => {
    if (kanap._id === id) {
      creatBasket(kanap)
    };
  });
});














function errorMsg(id, message, valid) {
  const container = document.getElementById(id);
  const errorText = document.getElementById(id + 'ErrorMsg');
  if(!valid) {
    errorText.textContent = message;
  } else {
    errorText.textContent = "";
  }
};
function NameChecker(value) {
  if (value.length > 0 && (value.length < 2 || value.length > 20)){
    errorMsg('firstName', "'Veuillez entrée un ' ${tagName} ' valide'");
    // firstName = null;
  } else if (!value.match(/^[a-zA-Z-]+$/)) {
    errorMsg('firstName', "'Le ' ${tagName} ' ne doit pas contenir de caractères spéciaux'");
    // firstName = null;
  } else {
    errorMsg('firstName', "", true);
    // firstName = value;
  }
};
// function lastNameChecker(value) {
//   if (value.length > 0 && (value.length < 2 || value.length > 20)){
//     errorMsg('lastName', 'Veuillez entrée un prénom valide');
//     // lastName = null;
//   } else if (!value.match(/^[a-zA-Z-]+$/)) {
//     errorMsg('lastName', 'Le nom ne doit pas contenir de caractères spéciaux');
//     // lastName = null;
//   } else {
//     errorMsg('lastName', "", true);
//     // lastName = value;
//   }
// };
function adressChecker(value) {
  if (!value.match(/^[a-zA-Z0-9-]+$/)) {
    errorMsg('adress', 'adresse invalide');
    // adress = null;
  } else {
    errorMsg('email', "", true);
    // adress = value;
  }
};
// function cityChecker(value) {
//   if (!value.match(/^[a-z]+$/i)) {
//     errorMsg('city', 'nom de la ville invalide');
//     // city = null;
//   } else {
//     errorMsg('city', "", true);
//     // city = value;
//   }
// };
function emailChecker(value) {
  if (!value.match(/^[\w_-]+@[\w-]+\.[a-z]{2,4}$/i)) {
    errorMsg('email', 'adresse mail invalide');
    // email = null;
  } else {
    errorMsg('city', "", true);
    // email = value;
  }
};

inputs.forEach((input) => {
  input.addEventListener('input', (e) =>{
    switch (e.target.id) {
      case 'firstName':
        firstNameChecker(e.target.value)
        break;
      case 'lastName':
        lastNameChecker(e.target.value)
        break;
      case 'adress':
        adressChecker(e.target.value)
        break;
      case 'city':
        cityChecker(e.target.value)
        break;
      case 'email':
        emailChecker(e.target.value)
        break;
    }
  });
});


fetch('http://localhost:3000/api/products').then((res) => res.json()).then((kanaps) => {
  kanaps.map(kanap => {
  })
});

