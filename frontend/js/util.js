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

  document.getElementById('cartBadge').innerText = isNaN(cart) ? 0 : cart;
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

function isString(input, error) {
  if (!/[^a-zA-Z]/.test(input.value) && input.value.length > 1) {
    document.getElementById(error).textContent = '';
    if (input.classList.contains('is-invalid')) {
      input.classList.remove('is-invalid');
      input.classList.add('is-valid');
    } else {
      input.classList.add('is-valid');
    }
    return true;
  }

  input.classList.remove('is-valid');
  input.classList.add('is-invalid');
  document.getElementById(error).textContent = "Make sure you enter correct value.";
  return false
}

function isAddress(input, error) {
  const regex = /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/;
  if (regex.test(input.value) && input.value.length > 5) {
    document.getElementById(error).textContent = '';
    if (input.classList.contains('is-invalid')) {
      input.classList.remove('is-invalid');
      input.classList.add('is-valid');
    } else {
      input.classList.add('is-valid');
    }
    return true;
  }

  input.classList.remove('is-valid');
  input.classList.add('is-invalid');
  document.getElementById(error).textContent = "Make sure you enter a correct address.";
  return false
}

function isEmail(input, error) {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (regex.test(input.value) && input.value.length > 7) {
    document.getElementById(error).textContent = '';
    if (input.classList.contains('is-invalid')) {
      input.classList.remove('is-invalid');
      input.classList.add('is-valid');
    } else {
      input.classList.add('is-valid');
    }
    return true;
  }

  input.classList.remove('is-valid');
  input.classList.add('is-invalid');
  document.getElementById(error).textContent = "Make sure you enter a correct email address.";
  return false
}

export { updateCartBadge, addAlert, adjustCart, getCartPrice, isString, isAddress, isEmail };