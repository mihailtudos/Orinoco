import { addAlert } from "./util.js";
const orderConfirmation = JSON.parse(localStorage.getItem('order'));
if (!orderConfirmation) {
  window.location.href = 'index.html';
}

if (orderConfirmation) {
  addAlert('Your order was placed successfully!', 'success');
  console.log(orderConfirmation)
  createOrderConfirmationView();
}

function createOrderConfirmationView() {
  const customerName = document.getElementById('customerName');
  customerName.innerText = `${ orderConfirmation.contact.firstName } ${ orderConfirmation.contact.lastName } `;

  const orderCost = document.getElementById('orderCost');
  orderCost.innerText = `$${ getOrderPrice() } `;

  const tbody = document.querySelector('tbody');
  orderConfirmation.products.map((item, index) => {
    tbody.appendChild(createRow(item, index+1));
  });

  const shippingAddress = document.getElementById('shippingAddress');
  shippingAddress.textContent = `${ orderConfirmation.contact.address }, ${ orderConfirmation.contact.city }`

  const orderID = document.getElementById('orderID');
  orderID.innerText = `${ orderConfirmation.orderId }`;

  localStorage.removeItem('order');
}

function getOrderPrice() {
  let amount = 0;
  orderConfirmation.products.map(item => {
    amount += item.price * item.lenses.length;
  });
  return amount.toLocaleString();
}

function createRow(item, index) {
  const tr = document.createElement('tr');

  const th = document.createElement('th');
  th.setAttribute('scope', 'row');
  th.textContent = index;

  const td1 = document.createElement('td');
  td1.className = 'd-flex align-items-center flex-row'
  const img = document.createElement('img');
  const title = document.createElement('span');
  let modifiedTitle = item.name + ' (';
  item.lenses.forEach((product, index) => modifiedTitle += `${product }${ index === item.lenses.length-1 ? '' : ','}`);
  title.textContent = modifiedTitle + ')';
  title.className = 'p-3'
  img.setAttribute('src', item.imageUrl);
  img.setAttribute('width', '50');
  img.setAttribute('alt', item.name);

  td1.append(img, title);

  const td2 = document.createElement('td');
  td2.textContent = item.lenses.length + '';

  const td3 = document.createElement('td');
  td3.textContent = '$' +(item.lenses.length * item.price).toLocaleString();

  tr.append(th, td1, td2, td3);
  return tr;
}
