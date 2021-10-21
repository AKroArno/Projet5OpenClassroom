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

colorsKanap.addEventListener('change', console.log(colorsKanap.value));

function addBasket () {
  localStorage.id = id;
  localStorage.quantity = quantity.value;
  localStorage.color = colorsKanap.value;
};

addToCart.addEventListener('click', console.log(colorsKanap.value));