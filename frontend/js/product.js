import MakeRequest from "./request.js";
import { updateCartBadge, addAlert, adjustCart } from "./util.js";

const productId = new URLSearchParams(window.location.search).get('product');
const url = "http://localhost:3000/api/cameras/" + productId;
const productContainer = document.getElementById('product');
let personalizationOption = [];
let productItem = '';
let selectedLens = '';

MakeRequest('get', url)
  .then(product => {
    productItem = product;
    createProductView(product)
  })
  .catch(e => {
    addAlert('Something went wrong please try again later or check our connection.', 'danger');
  });

function createProductView(product) {
  const productDescriptionSection = document.querySelector('.product-description');
  const productImageSection = document.querySelector('.product-image');

  replaceBreadcrumbName(product.name);
  const productImg = document.createElement('img');
  productImg.setAttribute('src', product.imageUrl);
  productImg.className = 'img-fluid img-thumbnail'
  productImg.setAttribute('alt', 'Image of ' + product.name);

  const title = document.createElement('h1');
  title.textContent = product.name;

  const subTitle = document.createElement('p');
  subTitle.textContent = 'Camera';

  const subDescription = document.createElement('p');
  subDescription.className = 'py-3';
  subDescription.textContent = product.description;

  const subPrice = document.createElement('p');
  subPrice.textContent = '$' + product.price.toLocaleString();

  const selectorDescription = document.createElement('p');
  selectorDescription.textContent = 'Choose your lens:';
  
  const customList = createSelector(product.lenses);

  const btnContainer = document.createElement('div');
  btnContainer.className = 'd-flex';

  const buyButton = document.createElement('button');
  buyButton.className = 'btn btn-sm btn-primary disabled'
  buyButton.textContent = 'Add to cart';

  const checkoutButton = document.createElement('a');
  checkoutButton.className = 'btn btn-sm btn-info mx-3'
  checkoutButton.textContent = 'Checkout';
  checkoutButton.setAttribute('href', 'checkout.html')

  btnContainer.append(buyButton, checkoutButton);

  productDescriptionSection.append(title, subTitle, subDescription, selectorDescription, customList, subPrice, btnContainer);
  productImageSection.appendChild(productImg);
  personalizationOption = product.lenses;
}

function replaceBreadcrumbName(productName) {
  document.querySelector('.product-name').textContent = productName;
}


function createSelector(items) {
  const selector = document.createElement('select');
  selector.className = 'form-select form-select-sm mb-5';
  selector.setAttribute('aria-label', 'Personalize options');
  selector.addEventListener('change', validateSelection);

  const defaultOption = document.createElement('option');
  defaultOption.setAttribute('selected', true);
  defaultOption.textContent = 'Personalize your product';
  selector.appendChild(defaultOption);

  items.forEach(item => {
    const option = document.createElement('option');
    option.setAttribute('value', item);
    option.textContent = item;
    selector.appendChild(option);
  });

  return selector;
}

function validateSelection(e) {
  const btn = document.querySelector('.btn.btn-sm.btn-primary');
  if (personalizationOption.indexOf(e.target.value) >= 0){
    btn.classList.remove('disabled');
    btn.addEventListener('click', addProduct);
    selectedLens = e.target.value;
  } else {
    btn.classList.add('disabled');
  }
}

function addProduct() {
  let cart = [];
  if (localStorage.getItem('cart')) {
    cart = JSON.parse(localStorage.getItem('cart'));
  }

  let itemExists = adjustCart(productItem._id, selectedLens);

  if (!itemExists) {
    const product = {
      id: productItem._id,
      name: productItem.name,
      lens: selectedLens,
      price: productItem.price,
      qty:  1
    }

    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  addAlert('Item added successfully', 'success', cart.length)
  updateCartBadge();
}


