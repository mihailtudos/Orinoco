import { updateCartBadge } from "./util.js";

const header = document.querySelector('.header');

header.innerHTML = `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-5">
        <div class="container-fluid">
            <a class="navbar-brand" href="index.html">Orinoco</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Link</a>
                    </li>
                </ul>
                <a href="cart.html" class="position-relative text-white">
                    <i class="fas fa-shopping-cart display-6"></i>
                    <span id="cartBadge" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        
                    </span>
                </a>
            </div>
        </div>
    </nav>`

updateCartBadge();