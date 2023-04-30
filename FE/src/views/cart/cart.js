import * as Api from "../api.js";

let cartItemList = document.querySelector("#cart-item-list");

let cartList = JSON.parse(localStorage.getItem("cart"));
console.log("받아온 로컬스토리지 입니다", cartList);

// 로컬스토리지에 있는 장바구니 리스트 화면에 출력
function addCartItemList(cartList) {
  // cart key의 value 값들
  let cartListContent = "";
  console.log("cartList: ", cartList);
  if (cartList !== null && cartList.length !== 0) {
    cartList.forEach((item) => {
      cartListContent += ` 
            <li class="cart-item">
                  <div><img class="cart-img" src="${item.image}"></div>
                  <div class="cart-item-column item-info-center" id="table-name">${
                    item.name
                  }</div>
                  <div class="cart-item-column item-info-center" id="table-price">${
                    item.price
                  }</div> 
                  <div class="cart-item-column item-info-center" id="table-color">${
                    item.color
                  }</div>
                  <div class="cart-item-column item-info-center" id="result-count">${
                    item.count
                  }</div>
                  <div class="cart-item-column item-info-center" id="singleItem-total">${
                    item.price * item.count
                  }</div>
                </div>
                <div class="cart-count-btns">
                <div class="cart-item-column item-info-right">
                    <button class="item-minus-btn" type="button">-</button>
                </div>
                <div class="cart-item-column item-info-right">
                    <button class="item-plus-btn" type="button">+</button>
                </div>
                <div class="cart-item-column item-info-right">
                    <button class="item-delete-btn" type="button" id=${
                      item.id
                    }>삭제</button>
                </div>
            </li>`;
    });
  } else {
    cartListContent += "장바구니에 담긴 상품이 없습니다.";
    document.querySelector(".cart-total").style.display = "none";
    document.querySelector(".cart-item-list__header").style.display = "none";
    for (const btn of document.querySelectorAll(".buttons-container")) {
      btn.style.display = "none";
    }
  }
  cartItemList.innerHTML = cartListContent;
}
addCartItemList(cartList);
updateCartTotal(); // 계산 박스 실시간 바로 반영되게끔 함수 호출 위치를 변경

// ********************************************

const singleItemCount = document.querySelectorAll("#result-count"); // 모든 개별 수량 접근
const plusBtn = document.querySelectorAll(".item-plus-btn"); // 모든 플러스 버튼 접근
const minusBtn = document.querySelectorAll(".item-minus-btn"); // 모든 마이너스 버튼 접근

const singleItemPrice = document.querySelectorAll("#table-price"); // 모든 개별 단가 접근
const singleItemTotalPrice = document.querySelectorAll("#singleItem-total"); // 모든 개별 단가*금액 = total

// 수량 증가 및 감소
// 모든 플러스 버튼에 이벤트 리스너 등록
plusBtn.forEach(function (plusBtn) {
  plusBtn.addEventListener("click", function () {
    //개별 수량 증가 로직
    let itemCountElement = plusBtn
      .closest(".cart-item")
      .querySelector("#result-count");
    let itemCount = parseInt(itemCountElement.textContent);
    itemCountElement.textContent = itemCount + 1;

    updateSingleItemTotal(plusBtn);
    updateCartTotal();
  });
});

// 모든 마이너스 버튼에 이벤트 리스너 등록
minusBtn.forEach(function (minusBtn) {
  minusBtn.addEventListener("click", function () {
    let itemCountElement = minusBtn
      .closest(".cart-item")
      .querySelector("#result-count");
    let itemCount = parseInt(itemCountElement.textContent);
    if (itemCount > 1) {
      itemCountElement.textContent = itemCount - 1;

      updateSingleItemTotal(minusBtn);
      updateCartTotal();
    }
  });
});

// 개별 수량 변경 시 총 가격 변동 함수
function updateSingleItemTotal(plusBtn, minusBtn) {
  let cartItem = plusBtn.closest(".cart-item");
  let itemCountElement = cartItem.querySelector("#result-count");
  let itemCount = parseInt(itemCountElement.textContent);
  let itemPriceElement = cartItem.querySelector("#table-price");
  let itemPrice = parseInt(itemPriceElement.textContent);
  let itemTotalElement = cartItem.querySelector("#singleItem-total");
  itemTotalElement.textContent = itemCount * itemPrice;
}

// 총 상품 개수와 총 상품 가격 업데이트 함수
function updateCartTotal() {
  let cartItems = document.querySelectorAll(".cart-item");
  let totalAmountElement = document.getElementById("cart-total-amount");
  let totalPriceElement = document.getElementById("cart-total-price");
  let totalAmount = 0;
  let totalPrice = 0;

  cartItems.forEach(function (cartItem) {
    let itemCountElement = cartItem.querySelector("#result-count");
    if (itemCountElement) {
      let itemCount = parseInt(itemCountElement.textContent);
      totalAmount += itemCount;
    }

    let itemTotalElement = cartItem.querySelector("#singleItem-total");
    if (itemTotalElement) {
      let itemTotal = parseInt(itemTotalElement.textContent);
      totalPrice += itemTotal;
    }
  });

  if (totalAmountElement) {
    totalAmountElement.innerHTML = `${totalAmount}개`;
  }
  if (totalPriceElement) {
    totalPriceElement.innerHTML = `${totalPrice}원`;
  }
  localStorage.setItem("totalAmount", totalAmount);
  localStorage.setItem("totalPrice", totalPrice);
}

// ********************************************

// 개별 cart list 삭제
const itemDeleteBtns = document.querySelectorAll(".item-delete-btn");

function itemDelete(e) {
  if (window.confirm("선택하신 상품을 장바구니에서 삭제하시겠습니까?")) {
    const newCartList = JSON.parse(localStorage.getItem("cart")).filter(
      (elem) => {
        return (
          elem.name !==
          e.target.closest(".cart-item").querySelector("#table-name").innerText
          // 삭제 버튼 클릭시 해당 버튼의 부모 요소 li 찾고, 상품명 찾기
        );
      }
    );
    localStorage.setItem("cart", JSON.stringify(newCartList));
    addCartItemList(newCartList);
    updateCartTotal();
  }
}

for (const btn of itemDeleteBtns) {
  btn.addEventListener("click", itemDelete);
}

// ********************************************

// 전체 cart list 삭제
const allDeleteBtn = document.querySelector(".all-item-delete-btn");

function allDelete() {
  console.log(localStorage.getItem("cart"));
  if (window.confirm("전체 상품을 장바구니에서 삭제하시겠습니까?")) {
    localStorage.removeItem("cart");
    addCartItemList([]);
    window.location.reload();
  }
}
allDeleteBtn.addEventListener("click", allDelete);

// ********************************************

// 주문하기 페이지로 넘어가기
const buyAllBtn = document.querySelector(".all-item-order-btn");

function buyAllItem() {
  const buyList = JSON.parse(localStorage.getItem("cart")).map((elem) => {
    return {
      name: elem.name,
      price: elem.price,
      image: elem.bigImageURL,
      _id: elem._id,

      count: elem.innerText,
      color: elem.value,
    };
  });

  console.log("buyList 출력", buyList);
  const totalAmount = JSON.parse(localStorage.getItem("totalAmount"));
  console.log(totalAmount);
  const totalPrice = JSON.parse(localStorage.getItem("totalPrice"));

  localStorage.setItem("buy-cart", JSON.stringify(buyList));
  localStorage.setItem("buy-totalAmount", JSON.stringify(totalAmount));
  localStorage.setItem("buy-totalPrice", JSON.stringify(totalPrice));

  // 로그인을 하지 않은 경우
  const token = sessionStorage.getItem("token");
  if (!token) {
    alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
    window.location.replace("../login/login.html");
    return;
  }
  window.location.replace("cart-order.html");
}

buyAllBtn.addEventListener("click", buyAllItem);
