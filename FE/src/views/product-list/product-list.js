// //product-list.js
// const itemlist = document.querySelector(".main-container__itemlist");

// fetch("../data/data.json")
//   .then(response => response.json())
//   .then(productList => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const categoryFilter = urlParams.get("category");

//     let filteredProducts = productList.filter(
//       product => product.category[0] === categoryFilter
//     );

//     if (filteredProducts.length === 0) {
//       const message = document.createElement("p");
//       message.textContent = "제품이 존재하지 않습니다.";
//       itemlist.style.display = "none";
//       message.style.textAlign = "center";
//       itemlist.insertAdjacentElement("afterend", message);
//     } else {
//       filteredProducts.forEach(product => {
//         const item = document.createElement("div");
//         item.classList.add("item");
//         item.innerHTML = `
//             <a href="../product-detail/product-detail.html?category=${categoryFilter}" data-id="${product.id}" class="item">
//               <img src="${product.smallImageURL}" alt="${product.name}">
//               <p class="item-title">${product.name}</p>
//               <span class="item-price">${product.price}</span>
//             </a>`;
//         itemlist.appendChild(item);
//       });
//     }

//     const itemCount = document.createElement("p");
//     itemCount.classList.add("item-count");
//     itemCount.textContent = `전체 : ${filteredProducts.length}개`;
//     itemlist.insertAdjacentElement("beforebegin", itemCount);

//     const items = document.querySelectorAll(".item a");
//     items.forEach(item => {
//       item.addEventListener("click", function (event) {
//         event.preventDefault();
//         const id = this.dataset.id;
//         localStorage.setItem("productId", id);
//         location.href = `../product-detail/product-detail.html?id=${id}`;
//       });
//     });
//   })
//   .catch(error => {
//     console.error("에러 발생:", error);
//   });
const itemlist = document.querySelector(".main-container__itemlist");

fetch("../data/data.json")
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
          <a href="../product-detail/product-detail.html?name=${product.name}" data-name="${product.name}" class="item">
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
        const name = this.dataset.name;
        localStorage.setItem("productName", name);
        location.href = `../product-detail/product-detail.html?name=${name}`;
      });
    });
  })
  .catch(error => {
    console.error("에러 발생:", error);
  });
