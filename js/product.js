// chargement  document HTML initial quand chargé et analysé
document.addEventListener('DOMContentLoaded', () => {
  initProduct();
});

// récupération de l'ID du produit a afficher sur la page avec URLSearchParams
function initProduct() {
  let id = new URLSearchParams(window.location.search).get("id");
  if (id !== '') {
    getProduct(id);
  } else {
    alert('Pas de produits');
  }
}

// appel à l'api pour récupérer les informations du produit séléctionné seulement
function getProduct(id) {
  fetch('http://localhost:3000/api/products/' + id).then((res) => res.json()).then((kanap) => {
  creatPage(kanap);
  });
}

// création dynamique de la page en fonction du contenu du localStorage
function creatPage (tag) {
  let kanapImg = document.createElement('img');
  kanapImg.setAttribute('src', tag.imageUrl);
  kanapImg.setAttribute('alt', tag.altTxt);
  kanapImg.setAttribute('width', 350);
  kanapImg.setAttribute('height', 350);

  let imgDom = document.querySelector('article');
  let ImgDisplay = imgDom.children[0];
  ImgDisplay.appendChild(kanapImg);

  let title = document.getElementById('title');
  title.textContent = tag.name;
  let price = document.getElementById('price');
  price.textContent = tag.price;
  let description = document.getElementById('description');
  description.textContent = tag.description;

  let colorsKanap = document.getElementById('colors');
  tag.colors.forEach(color => {
    let option = new Option(color,color);
    colorsKanap.append(option);
    // console.log(option);
  });

  let addToCart = document.getElementById('addToCart');
  // evenement au click sur ajouter au panier
  addToCart.addEventListener('click', () => {
    console.log(colorsKanap.value);
    let quantity = document.getElementById('quantity');
    console.log(quantity.value);
    if (colorsKanap.value == '' || quantity.value < 1) {
      alert('Veuillez entrer une couleur et une quantité');
      return false;
    } else {
      addProducts(tag._id);
    }
  });
}

// fonction test si le panier existe modifie le sinon créer le
function basketCheck(basket, kanap) {
  let check = false;
  basket.forEach((product, item) => {
      if (product.kanapId == kanap.kanapId && product.kanapColor == kanap.kanapColor) {
      product.kanapQuantity += parseInt(kanap.kanapQuantity);
      check = true;
    }
  });
  if(!check) {
    basket.push(kanap);
  }
  return basket;
}

// definition de la fonction d'ajout au panier ou de création du panier
function addBasket (tag) {
  if (!localStorage.getItem("basket")) {
    let basketKanaps = [];
    basketKanaps.push(tag);
    //transformation en format JSON et l'envoyer dans le localStorage 
    localStorage.setItem("basket", JSON.stringify(basketKanaps));
    alert('Le produit a bien été ajouté au panier');
  } else {
    basketKanaps = JSON.parse(localStorage.getItem("basket"));
    let newBasket = basketCheck(basketKanaps, tag);
    localStorage.setItem("basket", JSON.stringify(newBasket));
    alert('Le produit a bien été ajouté au panier');
  }
};

// fonction de création de l'élément à envoyer au panier au click
function addProducts(id) {
  let quantity = document.getElementById('quantity');
  let colorsKanap = document.getElementById('colors');
  let selectedKanap = {
    kanapId: id,
    kanapQuantity: parseInt(quantity.value),
    kanapColor: colorsKanap.value
  };  
  addBasket(selectedKanap);
}