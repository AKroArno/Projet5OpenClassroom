function creatKanaps (tag) {
  let a = document.createElement('a');
  a.setAttribute('href', `./product.html?id=${tag._id}`);

  let article = document.createElement('article');
  let img = document.createElement('img');
  img.setAttribute('src', tag.imageUrl);
  img.setAttribute('alt', tag.altTxt);
  img.setAttribute('width', 200);
  img.setAttribute('height', 200);

  let h3 = document.createElement('h3');
  h3.setAttribute('class', 'productName');

  let p = document.createElement('p');
  p.setAttribute('class', 'productDescription');

  let items = document.getElementById('items');

  items.appendChild(a);
  a.appendChild(article);
  article.appendChild(img);
  article.appendChild(h3);
  article.appendChild(p);

  h3.textContent = tag.name;
  p.textContent = tag.description;

}


fetch('http://localhost:3000/api/products').then((res) => res.json()).then((kanaps) => {
  kanaps.map(kanap => {
    creatKanaps(kanap);
  });
}); 

