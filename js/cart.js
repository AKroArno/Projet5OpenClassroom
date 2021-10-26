

const form = document.querySelector('form');
const inputs = document.querySelectorAll('input');
// const firstName, lastName, adress, city, email;
// const local = localStorage.getItem(id);
// const selectedKanap = JSON.parse(localStorage.getItem(id));
// console.log(selectedKanap);
// let itemQuantity = localStorage.getItem('quantity');
// let id = localStorage.getItem('id');
// let colorKanap = localStorage.getItem('color');
// console.log(itemQuantity);
// console.log(id);
// console.log(colorKanap);

// function creatBasket(tag) {
//   let cartItem = document.getElementById('cart__items');
//   let article = document.createElement('article');
//   article.setAttribute('class', 'cart__item');
//   article.setAttribute('data-id', product-ID);

//   let cartItemImg = document.createElement('div');
//   cartItemImg.setAttribute('class', 'cart__item__img');

//   let img = document.createElement('img');
//   img.setAttribute('src', tag.imageUrl);
//   img.setAttribute('alt', tag.altTxt);
//   img.setAttribute('width', 200);
//   img.setAttribute('height', 200);

//   let cartItemContent = document.createElement('div');
//   cartItemContent.setAttribute('class', 'cart__item__content');

//   let cartItemContentTitlePrice = document.createElement('div');
//   cartItemContentTitlePrice.setAttribute('class', 'cart__item__content__title');

//   let h2 = document.createElement('h2');
//   h2.textContent = tag.price;

//   let pPrice = document.createElement('p');
//   pPrice.textContent = tag.price;

//   let cartItemContentSettings = document.createElement('div');
//   cartItemContentSettings.setAttribute('div', 'cart__item__content__settings');

//   let cartItemContentSettingsQuantity = document.createElement('div');
//   cartItemContentSettingsQuantity.setAttribute('class', 'cart__item__content__settings__quantity');

//   let pQte = document.createElement('p');

//   let numberInput = document.createElement('input');
//   numberInput.setAttribute('type', 'number');
//   numberInput.setAttribute('class', 'itemQuantity');
//   numberInput.setAttribute('name', 'itemQantity');
//   numberInput.setAttribute('min', '1');
//   numberInput.setAttribute('max', '100');
//   numberInput.setAttribute('value', itemQuantity);

//   let cartItemContentSettingsDelete = document.createElement('div');
//   cartItemContentSettingsDelete.setAttribute('class', 'cart__item__content__settings__delete');

//   let pDelete = document.createElement('p');
//   pDelete.setAttribute('class', 'deleteItem');
//   pDelete.textContent = 'Supprimer';

//   cartItem.appendChild(article);
//   article.appendChild(cartItem);
//   cartItem.appendChild(cartItemImg);
//   cartItemImg.appendChild(img);
//   cartItem.appendChild(cartItemContent);
//   cartItemContent.appendChild(cartItemContentTitlePrice);
//   cartItemContentTitlePrice.appendChild(h2);
//   cartItemContentTitlePrice.appendChild(pPrice);
//   cartItemContent.appendChild(cartItemContentSettings);
//   cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);
//   cartItemContentSettingsQuantity.appendChild(pQte);
//   cartItemContentSettingsQuantity.appendChild(numberInput);
//   cartItemContentSettings.appendChild(cartItemContentSettingsDelete);
//   cartItemContentSettingsDelete.appendChild(pDelete);
  
// };


// fetch('http://localhost:3000/api/products').then((res) => res.json()).then((kanaps) => {
//   kanaps.map(kanap => {
//     if (kanap._id === id) {
//       creatBasket(kanap)
//     };
//   });
// });













function errorMsg(id, message, valid) {
  const container = document.getElementById(id);
  const errorText = document.getElementById(id + 'ErrorMsg');
  if(!valid) {
    errorText.textContent = message;
  } else {
    errorText.textContent = "";
  }
};
function nameChecker(value, tag, name) {
  if (value.length > 0 && (value.length < 2 || value.length > 20)){
    errorMsg(name, `Veuillez entrée un  ${tag}  valide`);
    name = null;
  } else if (!value.match(/^[a-zA-Z-]+$/)) {
    errorMsg(name, `'Le ${tag} ne doit pas contenir de caractères spéciaux'`);
    name = null;
  } else {
    errorMsg(name, "", true);
    name = value;
  }
};
function adressChecker(value) {
  if (!value.match(/^[a-zA-Z0-9-]+$/)) {
    errorMsg('adress', 'adresse invalide');
    adress = null;
  } else {
    errorMsg('adress', "", true);
    adress = value;
  }
};
function emailChecker(value) {
  if (!value.match(/^[\w_-]+@[\w-]+\.[a-z]{2,4}$/i)) {
    errorMsg('email', 'adresse mail invalide');
    email = null;
  } else {
    errorMsg('email', "", true);
    email = value;
  }
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
form.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log('ok');
  if (firstName && lastName && adress && city && email) {
    const data = {
      firstName: firstName,
      lastName: lastName,
      adress: adress,
      city: city,
      email: email,
    };
    console.log(data);
   }
});

fetch('http://localhost:3000/api/products').then((res) => res.json()).then((kanaps) => {
  kanaps.map(kanap => {
    console.log(kanap);
  })
});

