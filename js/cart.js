const cart = () => {
  const cartBtn = document.querySelector(".button-cart");
  const cart = document.getElementById("modal-cart");
  const closeBtn = cart.querySelector(".modal-close");
  const goodsContainer = document.querySelector(".long-goods-list");
  const cartTable = document.querySelector(".cart-table__goods");
  const modalForm = document.querySelector(".modal-form");
  const cartTableTotal = document.querySelector('.card-table__total');
  const modalInputName = document.querySelector('.modal-input.name');
  const modalInputPhone = document.querySelector('.modal-input.phone');

  const deleteCartItem = (id) => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    const newCart = cart.filter((good) => good.id !== id);
    localStorage.setItem("cart", JSON.stringify(newCart));
    renderCartGoods(JSON.parse(localStorage.getItem("cart")));
    totalPrice();
  };

  const plusCartItem = (id) => {
    const cart = JSON.parse(localStorage.getItem("cart"));

    const newCart = cart.map((good) => {
      if (good.id === id) {
        good.count++;
      }
      return good;
    });

    localStorage.setItem("cart", JSON.stringify(newCart));
    renderCartGoods(JSON.parse(localStorage.getItem("cart")));
    totalPrice();
  };

  const minusCartItem = (id) => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    const newCart = cart.map((good) => {
      if (good.id === id) {
        if (good.count > 1) {
          good.count--;
        }
      }
      return good;
    });
    localStorage.setItem("cart", JSON.stringify(newCart));
    renderCartGoods(JSON.parse(localStorage.getItem("cart")));
    totalPrice();
  };

  const addToCart = (id) => {
    const goods = JSON.parse(localStorage.getItem("goods"));
    const clickedGood = goods.find((good) => good.id === id);
    const cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];

    if (cart.some((good) => good.id === clickedGood.id)) {
      cart.map((good) => {
        if (good.id === clickedGood.id) {
          good.count++;
        }
        return good;
      });
    } else {
      clickedGood.count = 1;
      cart.push(clickedGood);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    totalPrice();
  };

  const renderCartGoods = (goods) => {
    cartTable.innerHTML = "";
    goods.forEach((good) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${good.name}</td>
        <td>${good.price} $</td>
        <td><button class="cart-btn-minus">-</button></td>
        <td>${good.count}</td>
        <td><button class=" cart-btn-plus">+</button></td>
        <td>${+good.price * +good.count} $</td>
        <td><button class="cart-btn-delete">x</button></td>
      `;

      cartTable.append(tr);

      tr.addEventListener("click", (event) => {
        if (event.target.classList.contains("cart-btn-minus")) {
          minusCartItem(good.id);
        } else if (event.target.classList.contains("cart-btn-plus")) {
          plusCartItem(good.id);
        } else if (event.target.classList.contains("cart-btn-delete")) {
          deleteCartItem(good.id);
        }
      });
    });
  };

  const totalPrice = () => {
    cartTableTotal.innerHTML = '0 $';
    const carts = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];

    const arrayPrices = [];

    carts.forEach((cart) => {
      price = `${+cart.price * +cart.count}`;
      arrayPrices.push(price)
      const sum = arrayPrices.reduce((total, n) => +total + +n, 0);
    cartTableTotal.innerHTML = `${sum} $`;
    })
  }
  totalPrice();

  const contactData = () => {
    contact = []; 
    modalForm.addEventListener('change', (e) => {
      const input = e.target.value;
      contact.push(input);

      localStorage.setItem('contact', JSON.stringify(contact));
    })
  }
  contactData(); 

  const sendForm = () => {
    const cartArray = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
    const contact = localStorage.getItem("contact") ? JSON.parse(localStorage.getItem("contact")) : [];

    try {
      fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        cart: cartArray,
        contact: contact,
        // name: "",
        // phone: "",
      })
      }).then(() => {
        modalInputName.value = '';
        modalInputPhone.value = '';
        cartTableTotal.innerHTML = '0 $';
        cartTable.innerHTML = "";
        cart.style.display = '';
    })
    } catch (e) {
      console.log('error post');
    }
  };

  modalForm.addEventListener("submit", (event) => {
    event.preventDefault();
    sendForm();
    
    localStorage.removeItem('cart');
    localStorage.removeItem('contact');
  });

  cartBtn.addEventListener("click", () => {
    const cartArray = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];

    renderCartGoods(cartArray);
    cart.style.display = "flex";
  });

  closeBtn.addEventListener("click", () => {
    cart.style.display = "";
  });

  cart.addEventListener("click", (event) => {
    if (!event.target.closest(".modal") && event.target.classList.contains("overlay")) {
      cart.style.display = "";
    }
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      cart.style.display = "";
    }
  });

  if (goodsContainer) {
    goodsContainer.addEventListener("click", (event) => {
      if (event.target.closest(".add-to-cart")) {
        const buttonToCart = event.target.closest(".add-to-cart");
        const goodId = buttonToCart.dataset.id;
        addToCart(goodId);
      }
    });
  }
};

cart();

// my homework 

    // - After submitting the form, delete the entire cart from localStorage

    // - In the modal window of the cart there is a field with the total price (class="card-table__total").
    // Calculate the cost of the entire product and output the result in this field

    // - Add the name and phone number from the form to the sent data
    
    // - Clear the form after sending the data

