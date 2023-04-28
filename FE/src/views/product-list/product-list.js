import * as Api from "../api.js";
const itemlist = document.querySelector(".main-container__itemlist");
const productUrl = 'api/product';

Api.get(productUrl, 'category/:categoryId')
  .then(response => response.json())
  .then(productList => {
    const params = new URLSearchParams(location.search);
    const category = params.get("category");
    const filteredProducts = productList.filter(product => product.category.includes(category));

    if (filteredProducts.length === 0) {
      const message = document.createElement("p");
      message.textContent = "해당 카테고리의 제품이 존재하지 않습니다.";
      itemlist.style.display = "none";
      message.style.textAlign = "center";
      itemlist.insertAdjacentElement("afterend", message);
    } else {
      filteredProducts.forEach(product => {
        const item = document.createElement("div");
        item.classList.add("item");
        item.innerHTML = `
          <a href="../product-detail/product-detail.html?id=${product.Id}" class="item">
            <img src="${product.smallImageURL}" alt="${product.name}">
            <p class="item-title">${product.name}</p>
            <span class="item-price">${product.price}</span>
          </a>
        `;
        itemlist.appendChild(item);
      });
    }

    const itemCount = document.createElement("p");
    itemCount.classList.add("item-count");
    itemCount.textContent = `전체 : ${filteredProducts.length}개`;
    itemlist.insertAdjacentElement("beforebegin", itemCount);

    const items = document.querySelectorAll(".item a");
    items.forEach(item => {
      item.addEventListener("click", function(event) {
        event.preventDefault();
        const id = this.dataset.id;
        localStorage.setItem("producId", id);
        location.href = `../product-detail/product-detail.html?name=${id}`;
      });
    });
  })
  .catch(error => {
    console.error("에러 발생:", error);
  });
