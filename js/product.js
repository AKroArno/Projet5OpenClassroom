let id = new URLSearchParams(window.location.search).get("id");
// console.log(id);

const addToCart = document.getElementById('addToCart');


const imgDom = document.querySelector('article');
let ImgDisplay = imgDom.children[0];
const title = document.getElementById('title');
const price = document.getElementById('price');
const description = document.getElementById('description');
const colorsKanap = document.getElementById('colors');


let quantity = document.getElementById('quantity');

fetch('http://localhost:3000/api/products').then((res) => res.json()).then((kanaps) => {
  kanaps.map(kanap => {
    if (kanap._id === id) {
      creatPage(kanap)
    };
  });
});

// création dynamique de la page en fonction du contenu du localStorage
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

// fonction test si le panier existe modifie le sinon créer le
function basketCheck(basket, kanap) {
  let check = false;
  basket.forEach((product, item) => {
      if (product.kanapId == kanap.kanapId && product.kanapColor == kanap.kanapColor) {
      product.kanapQuantity += parseInt(kanap.kanapQuantity);
      check = true;
    }
  })
  if(!check) {
    basket.push(kanap);
  }
  return basket;
};

// fonction comfirmation pop up
function popupComfirm () {
  if (window.confirm( `le produit a bien été ajouté au panier
  Consulter le panier OK ou revenir à l'acceuil ANNULER`)){
    window.location.href = "cart.html"
  }else{
    window.location.href = "index.html"
  }
}

// definition de la fonction d'ajout au panier
function addBasket (tag) {
  if (!localStorage.getItem("basket")) {
    let basketKanaps = [];
    basketKanaps.push(tag);
    localStorage.setItem("basket", JSON.stringify(basketKanaps));
    popupComfirm();
  } else {
    basketKanaps = JSON.parse(localStorage.getItem("basket"));
    let newBasket = basketCheck(basketKanaps, tag);
    localStorage.setItem("basket", JSON.stringify(newBasket));
    popupComfirm();
  }
};
// evenement au click sur ajouter au panier
addToCart.addEventListener('click', () => {
  let selectedKanap = {
    kanapId: id,
    kanapQuantity: parseInt(quantity.value),
    kanapColor: colorsKanap.value
  };  
  addBasket(selectedKanap);
});

