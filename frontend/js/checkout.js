import MakeRequest from "./request.js";
import {updateCartBadge, getCartPrice } from "./util.js";

let listOfItems = JSON.parse(localStorage.getItem('cart'));

const tbody = document.querySelector('tbody');

setNumberOfItems();

function setNumberOfItems() {
  document.querySelector('.cart-content').textContent = `your cart has ${ updateCartBadge() } ${updateCartBadge() === 1 ? 'item' : 'items'}`
}



function setTableView() {
  listOfItems.forEach((item, index) => createItemRow(item, index))
  const cartAmount = document.querySelector('.cartAmount');
  cartAmount.textContent = `Total $${getCartPrice(listOfItems)}`;
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

setTableView();