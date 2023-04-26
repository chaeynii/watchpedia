const urlParams = new URLSearchParams(window.location.search);
const productName = urlParams.get("name");

fetch("../data/data.json")
  .then((response) => response.json())
  .then((products) => {
    const product = products.find((p) => p.name === productName);
    const productImg = document.getElementById("product-img");
    const productNameEl = document.getElementById("product-name");
    const productDesc = document.getElementById("product-desc");
    const productPrice = document.getElementById("product-price");
    const minusBtn = document.querySelector(".count-btn-minus");
    const plusBtn = document.querySelector(".count-btn-plus");
    const amountCount = document.querySelector(".product-amount-count");
    const productColor = document.getElementById("product-color");

    productImg.src = product.bigImageURL;
    productNameEl.innerText = product.name;
    productDesc.innerText = product.longContent;
    productPrice.innerText = product.price.toLocaleString() + "원";
    product.color.forEach((color) => {
      const option = document.createElement("option");
      option.value = color;
      option.text = color;
      productColor.add(option);
    });
    let amount = 1;
    amountCount.innerText = amount;

    minusBtn.addEventListener("click", () => {
      if (amount > 1) {
        amount--;
        amountCount.innerText = amount;
      }
    });

    plusBtn.addEventListener("click", () => {
      amount++;
      amountCount.innerText = amount;
    });

    const addToCartBtn = document.querySelector(".btn-primary");
    addToCartBtn.addEventListener("click", () => {
      const cartItem = {
        name: product.name,
        price: product.price,
        image: product.bigImageURL,
        amount: amount,
        color: productColor.value, // 선택된 색상 정보 저장
      };

      let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

      //장바구니에 상품이 있는지 확인
      const existingItemIndex = cartItems.findIndex((item) => item.id === cartItem.id);

      if (existingItemIndex !== -1) {
        // 있다면 해당 제품 갯수 증가
        cartItems[existingItemIndex].amount += cartItem.amount;
      } else {
        // 없다면 해당 제품 추가
        cartItems.push(cartItem);
      }

      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    });
  })
  .catch((error) => {
    console.error("에러 발생:", error);
  });


/* 
  nav.js에 토큰 확인해서
  버튼을 보여줄지, 안보여줄지
*/