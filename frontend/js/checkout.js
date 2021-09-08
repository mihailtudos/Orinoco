import MakeRequest from "./request.js";
import { updateCartBadge, getCartPrice, isString, isAddress, isEmail, addAlert } from "./util.js";
const url = "http://localhost:3000/api/cameras/order";

let listOfItems = JSON.parse(localStorage.getItem('cart'));

const tbody = document.querySelector('tbody');

function setNumberOfItems() {
  document.querySelector('.cart-content').textContent = `your cart has ${ updateCartBadge() } ${updateCartBadge() === 1 ? 'item' : 'items'}`
}

function setTableView() {
  listOfItems.forEach((item, index) => createItemRow(item, index))
  const cartAmount = document.querySelector('.cartAmount');
  cartAmount.textContent = `Total $${getCartPrice(listOfItems)}`;
}

if (listOfItems) {
  setTableView();
  setNumberOfItems();
} else {
  const checkoutBtn = document.querySelector('#checkoutBtn');
  checkoutBtn.textContent = 'Back to products';
  checkoutBtn.setAttribute('href', 'index.html');
}

function createItemRow(item, index) {
  const row = document.createElement('tr');

  const rowCol1 = document.createElement('th');
  rowCol1.textContent = index+1;

  const rowCol2 = document.createElement('td');
  rowCol2.textContent = item.name;

  const rowCol3 = document.createElement('td');
  rowCol3.textContent = item.lens;

  const rowCol4 = document.createElement('td');
  rowCol4.textContent = item.qty;

  const rowCol5 = document.createElement('td');
  rowCol5.textContent = `$${ item.price.toLocaleString() }`;

  const rowCol6 = document.createElement('td');
  rowCol6.textContent = `$${ (item.price * item.qty).toLocaleString() }`;

  row.append(rowCol1, rowCol2, rowCol3, rowCol4, rowCol5, rowCol6);
  tbody.appendChild(row)
}

if (document.querySelector('form')) {
  if (!listOfItems) {
    window.location.href = 'index.html'
  }

  const firstName   = document.getElementById('firstName');
  const lastName    = document.getElementById('lastName');
  const address     = document.getElementById('address');
  const city        = document.getElementById('city');
  const email       = document.getElementById('email');

  firstName.addEventListener('blur', () => isString(firstName, 'firstNameError'));
  lastName.addEventListener('blur', () => isString(lastName, 'lastNameError'));
  address.addEventListener('blur', () => isAddress(address, 'addressError'));
  city.addEventListener('blur', () => isString(city, 'cityError'));
  email.addEventListener('blur', () => isEmail(email, 'emailError'));

  function sendRequest(e) {
    e.preventDefault();
    if(isString(firstName, 'firstNameError')
      && isString(lastName, 'lastNameError')
      && isAddress(address, 'addressError')
      && isString(city, 'cityError')
      && isEmail(email, 'emailError')) {
      const contact = {
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email: email.value
      }
      const products = listOfItems.map(item => {
        return item.id;
      })
      const data = {
        contact, products
      }

      MakeRequest('POST', url, data)
        .then(order => {
          if (order) {
            localStorage.removeItem('cart');
            localStorage.setItem('order', JSON.stringify(order));
            window.location.href = 'confirmation.html';
          }
        })
        .catch(e => {
          addAlert('Something went wrong, please try again later!', 'danger')
        });
    }
    addAlert('Please complete the given form to place your order!', 'danger')
  }
  const formSubmitButton = document.querySelector('form button');
  formSubmitButton.addEventListener('click', sendRequest);
}


