import MakeRequest from "./request.js";
const url = "http://localhost:3000/api/cameras";

//elements selected
const productsList = document.getElementById('productsList');

async function allProductsList() {
  await MakeRequest('GET', url)
    .then(products => {
      localStorage.setItem('products', JSON.stringify(products));
      createProductsView();
    })
    .catch(e => console.log(e));
}

allProductsList();

function createProductsView() {
  const products = JSON.parse(localStorage.getItem('products'));
  products.map(product => createProductCard(product));
}

function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'card m-3';
  card.setAttribute('style', 'width: 20rem');
  const cardImage = document.createElement('img');
  cardImage.className = 'card-img-top';
  cardImage.setAttribute('alt', 'image of ' + product.name);
  cardImage.setAttribute('width', '318');
  cardImage.setAttribute('height', '211');
  cardImage.setAttribute('loading', 'lazy');
  cardImage.setAttribute('src', product.imageUrl);
  card.appendChild(cardImage);

  const cardBody = document.createElement('div');
  cardBody.className = 'card-body';
  const cardTitle = document.createElement('h5');
  cardTitle.textContent = product.name;
  cardBody.appendChild(cardTitle);

  const cardDescription = document.createElement('p');
  cardDescription.textContent = product.description;
  cardBody.appendChild(cardDescription);

  const cardLink = document.createElement('a');
  cardLink.className = 'btn btn-primary';
  cardLink.setAttribute('href', '/product/' + product._id + '/');
  cardLink.textContent = 'Buy now';
  cardBody.appendChild(cardLink);

  card.appendChild(cardBody);
  productsList.appendChild(card)
}
