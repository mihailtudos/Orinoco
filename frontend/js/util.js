function addAlert(message, style, id) {
  const alert = document.getElementById('alert');
  const alertDiv = document.createElement('div');
  alertDiv.id = id;
  alertDiv.className = `alert alert-${style}`;
  alertDiv.setAttribute('role', 'alert');
  alertDiv.innerText = message;

  alert.appendChild (alertDiv)
  setTimeout(() => {
    document.getElementById(id).remove()
  },2000);
}

function updateCartBadge() {
  let cart = JSON.parse(localStorage.getItem('cart'));
  if (cart) {
    cart = cart.reduce((acc, curr) => {
      return acc += curr.qty;
    } , 0);
  } else {
    cart = 0;
  }

  document.getElementById('cartBadge').innerText = cart;
  return cart;
}

function adjustCart(productId, lens) {
  let qty = 1;
  if (localStorage.getItem('cart')) {
    const cartItems = JSON.parse(localStorage.getItem('cart'));
    for (let i = 0; i < cartItems.length; i++) {
      if (cartItems[i].id === productId && cartItems[i].lens === lens) {
        cartItems[i].qty += 1;
        localStorage.removeItem('cart');
        localStorage.setItem('cart', JSON.stringify(cartItems));
        return true;
      }
    }
  }
  return false;
}

function getCartPrice(cart) {
  return cart.reduce((acc, curr) => {
    return acc += curr.qty * curr.price;
  }, 0).toLocaleString();
}

export { updateCartBadge, addAlert, adjustCart, getCartPrice };