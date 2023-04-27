import * as Api from "../api.js";

const itemlist = document.querySelector(".main-container__itemlist");
const productUrl = 'api/product';

Api.get(productUrl, 'products')
  .then(productList => {
    if (productList.length === 0) {
      const message = document.createElement("p");
      message.textContent = "제품이 존재하지 않습니다.";
      itemlist.style.display = "none";
      message.style.textAlign = "center";
      itemlist.insertAdjacentElement("afterend", message);
    } else {
      console.log(productList);
      productList.products.forEach(product => {
        const item = document.createElement("div");
        item.classList.add("item");
        item.innerHTML = `
          <a href="../product-detail/product-detail.html?id=${product._id}" data-id="${product._id}" class="item">
            <img src="${product.smallImageURL}" alt="${product.name}">
            <p class="item-title">${product.name}</p>
            <span class="item-price">${product.price}</span>
          </a>
        `;
        itemlist.appendChild(item);
      });
      const items = document.querySelectorAll(".item a");
      items.forEach(item => {
        const productId = item.dataset.id;
        item.addEventListener("click", function(event) {
          event.preventDefault();
          goToProductDetail(productId);
        });
      });
    }

    const itemCount = document.createElement("p");
    itemCount.classList.add("item-count");
    itemlist.insertAdjacentElement("beforebegin", itemCount);
  })
  .catch(error => {
    console.error("에러 발생:", error);
  });
