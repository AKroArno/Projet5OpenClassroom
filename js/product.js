let id = new URLSearchParams(window.location.search).get("id");
// console.log(id);

const addToCart = document.getElementById('addToCart');


const imgDom = document.querySelector('article');
let ImgDisplay = imgDom.children[0];
const title = document.getElementById('title');
const price = document.getElementById('price');
const description = document.getElementById('description');
const colorsKanap = document.getElementById('colors');

// let selectedColor = colors.options[colors.selectedIndex].value;

let quantity = document.getElementById('quantity');

fetch('http://localhost:3000/api/products').then((res) => res.json()).then((kanaps) => {
  kanaps.map(kanap => {
    if (kanap._id === id) {
      creatPage(kanap)
    };
  });
});

function creatPage (tag) {
  let kanapImg = document.createElement('img');
  kanapImg.setAttribute('src', tag.imageUrl);
  kanapImg.setAttribute('alt', tag.altTxt);
  kanapImg.setAttribute('width', 350)
  kanapImg.setAttribute('height', 350)

  ImgDisplay.appendChild(kanapImg)

  title.textContent = tag.name;
  price.textContent = tag.price;
  description.textContent = tag.description;

  tag.colors.forEach(color => {
    let option = new Option(color,color);
    colorsKanap.append(option)
  });
};

// colorsKanap.addEventListener('change', () => {
//   console.log(colorsKanap.value)
// });
function basketCheck(array) {
  array.forEach((inArray, kanap) => {
      if (inArray.kanapID === kanap._id && inArray.kanapColor === kanap.color) {
    array.kanapQuantity += parseInt(kanap.quantity);
    } else {
      array.push(kanap);
    };
  })
};

function addBasket (tag) {
  if (!localStorage.getItem("basket")) {
    let basketKanaps = [];
    basketKanaps.push(tag);
    localStorage.setItem("basket", JSON.stringify(basketKanaps))
  } else {
    basketKanaps = JSON.parse(localStorage.getItem("basket"));
    basketCheck(basketKanaps);
    console.log(basketKanaps);
    localStorage.setItem("basket", JSON.stringify(basketKanaps));
  }
};

addToCart.addEventListener('click', () => {
  let selectedKanap = {
    KanapId: id,
    kanapQuantity: quantity.value,
    kanapColor: colorsKanap.value
  };  
  addBasket(selectedKanap);
});

// let basket = localStorage.getItem("basketKanaps")



// function basketExist () {
//   if (!localStorage.getItem("basketKanaps")) {
//     basket = [];
//     basket.push(selectedKanap);
//   } else {
//     basket = JSON.parse(localStorage.getItem("basketKanaps"));
//     let inBasket = kanapIn
//   }
// }