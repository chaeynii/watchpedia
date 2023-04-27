// import * as Api from "/api.js";

// // 장바구니 데이터 불러오기
const buyList =
  JSON.parse(localStorage.getItem("buy-direct")) || 
  JSON.parse(localStorage.getItem("buy-cart")) ||
  JSON.parse(localStorage.getItem("buy-totalAmount")) ||
  JSON.parse(localStorage.getItem("buy-totalPrice"));
  console.log("buyList: ", buyList);


// 로그인한 주문자 정보 불러오기
let userData;
async function inputOrdererInfo() {
  userData = await Api.get("/api/user");
  deliveryName.value = userData.name || null;
  deliveryPostcode.value = userData.zip || null;
  deliveryAddress.value = userData.address_1 || null;
  deliveryAddress2.value = userData.address_2 || null;
  deliveryTel.value = userData.phone || null;
}
inputOrdererInfo();


// // 총 상품 개수와 총 상품 가격 업데이트 함수
// function updateCartTotal() {
//   let totalAmountElement = document.getElementById("cart-total-amount");
//   let totalPriceElement = document.getElementById("cart-total-price");

//     totalAmountElement.innerHTML = `${totalAmount}개`;
//     totalPriceElement.innerHTML = `${totalPrice}원`;
// }
// updateCartTotal()


// 총 상품 개수와 총 상품 가격 업데이트 함수
function updateCartTotal() {
  let buyList = JSON.parse(localStorage.getItem("buy-cart"));
  let totalAmountElement = document.getElementById("cart-total-amount");
  let totalPriceElement = document.getElementById("cart-total-price");
  let totalAmount = 0;
  let totalPrice = 0;

  buyList.forEach(function(item) {
    totalAmount += item.totalAmount;
    totalPrice += item.totalPrice; 
  });

  console.log(totalAmount)
  totalAmountElement.innerHTML = `${totalAmount}개`;
  totalPriceElement.innerHTML = `${totalPrice}원`;
}

updateCartTotal();


// 배송지 정보 입력
const deliveryName = document.querySelector("#cartOrder__name");
const deliveryPostcode = document.querySelector("#cartOrder__postcode");
const deliveryAddress = document.querySelector("#cartOrder__address1");
const deliveryAddress2 = document.querySelector("#cartOrder__address2");
const deliveryTel = document.querySelector("#cartOrder__contact");

const payButton = document.querySelector("#cart-order--submit");

// ******* 결제 정보 및 유저 DB post 보내기 ********
async function order() {
  if (!deliveryName.value || !deliveryPostcode.value || //상품 상세페이지에서 끌어오는 거
    !deliveryAddress.value || !deliveryAddress2.value ||
    !deliveryTel.value) {
    return alert("배송지 정보를 입력해주세요.");
  }

  try {
    const data = {
      receiverName: deliveryName.value,
      zipCode: deliveryPostcode.value,
      extraAddress: deliveryAddress.value,
      // 그냥 주소 스키마는 어디에??
      receiverPhone: deliveryTel.value,

      name: buyList.name,
      price: buyList.price,
      smallImageURL: buyList.smallImageURL,
      color: buyList.color,
      totalAmount: buyList.totalAmount,
      totalPrice: buyList.totalPrice,
    };

    await Api.post("/api/order", data); //결제 api 경로 확인
    alert("주문이 정상적으로 완료되었습니다.");

    // buylist 지우기
    if (buyList == JSON.parse(localStorage.getItem("buy-direct"))) {
      localStorage.removeItem("buy-direct");
    } else {
      localStorage.removeItem("buy-cart");
      localStorage.removeItem("cart");
    }
    window.location.href = "cart-order-finished.html";
  } 
  catch (err) {
    console.error(err);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}

payButton.addEventListener("click", order);
