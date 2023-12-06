const getGoods = () => {
  const links = document.querySelectorAll(".navigation-link"); //сначала получаем все ссылки из меню
  const viewAll = document.querySelector(".more");

  const renderGoods = (goods) => {
    const goodsContainer = document.querySelector(".long-goods-list");

    goodsContainer.innerHTML = "";

    goods.forEach((good) => {
      const goodBlock = document.createElement("div");

      goodBlock.classList.add("col-lg-3");
      goodBlock.classList.add("col-sm-6");

      goodBlock.innerHTML = `
        <div class="goods-card">
          <span class="label ${good.label ? null : 'd-none'}">${good.label}</span>
          <img src="db/${good.img}" alt="${good.name}" class="goods-image">
          <h3 class="goods-title">${good.name}</h3>
          <p class="goods-description">${good.description}</p>
          <button class="button goods-card-btn add-to-cart" data-id="${good.id}">
            <span class="button-price">$${good.price}</span>
          </button>
        </div> 
      `;
      goodsContainer.append(goodBlock);
    });
  };

  const getData = (value, category) => {
    try {
      // fetch("./db/dbb.json")
      fetch("https://berry-bf3fb-default-rtdb.asia-southeast1.firebasedatabase.app/db.json")
      .then((res) => res.json())
      .then((data) => {
        const array = category ? data.filter((item) => item[category] === value) : data;

        localStorage.setItem("goods", JSON.stringify(array));

        if (window.location.pathname !== "/goods.html") {
          window.location.href = "/goods.html";
        } else {
          renderGoods(array);
        }
      });
    } catch (e) {
      e.message()
      console.log('my error data in getGoods');
    }
  };

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const linkValue = link.textContent;
      const category = link.dataset.field;
      getData(linkValue, category);
    });
  });

  if (localStorage.getItem("goods") && window.location.pathname === "/goods.html") {
    renderGoods(JSON.parse(localStorage.getItem("goods")));
  }
  if (viewAll) {
    viewAll.addEventListener("click", (event) => {
      event.preventDefault()
      getData('')
    });
  }
};

getGoods();

// ### personal notes ##############################################

  // firebase.google.com for database

  //   localStorage.setItem("goods", JSON.stringify([1, 2, 3, 4]));

  //   const goods = JSON.parse(localStorage.getItem("goods"));
  //   console.log(goods);

  //   localStorage.removeItem("goods");
  //   console.log(localStorage);
  
// #################################################################

