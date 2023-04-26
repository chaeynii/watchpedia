// 로컬스토리지에 있는 장바구니 최종 리스트 화면에 출력 시작
let cartOrderList = document.querySelector(".cart-paydetail"); //최종 결제 정보 하단에 그려지도록
let cartList = JSON.parse(localStorage.getItem("buy-cart")); // 파싱된 카트리스트


// 배송지 정보 입력
const deliveryName = document.querySelector("#cartOrder__name");
const deliveryPostcode = document.querySelector("#cartOrder__postcode");
const deliveryAddress = document.querySelector("#cartOrder__address1");
const deliveryAddress2 = document.querySelector("#cartOrder__address2");
const deliveryTel = document.querySelector("#cartOrder__contact");

const payButton = document.querySelector("#cart-order--submit");

// 장바구니 데이터 불러오기
const buyList =
  JSON.parse(localStorage.getItem("buy-direct")) || 
  JSON.parse(localStorage.getItem("buy-cart")); //cart 메인 페이지
  
console.log("buyList: ", buyList);

// ******* 주문 정보 및 유저 post 요청(try, catch 버전) ********
async function order() {
  if (!deliveryName.value || !deliveryPostcode.value || //상품 상세페이지에서 끌어오는 거
    !deliveryAddress.value || !deliveryAddress2.value ||
    !deliveryTel.value) {
    return alert("배송지 정보를 입력해주세요.");
  }

  try {
    const data = {
      products: buyList, // 상품명, id, 가격, 이미지, 색상, 총수량, 총합계
      buyer: deliveryName.value,
      recipientPhoneNumber: deliveryTel.value,
      recipientAddress: deliveryAddress.value,
      stre
    };

    await Api.post("/api/order", data); //결제 api 경로 확인

    // const userUpdateData = {
    //   phoneNumber: ordererTel.value,
    // };

    // await Api.patch("/api/orders/create", userData._id, userUpdateData);

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



// ******* 주문 정보 및 유저 post 요청(fetch 버전) ********
// 장바구니 결제 정보를 담은 객체
// const cartData = {
//   name: elem.name,
//   id: elem.id,
//   price: elem.price,

//   image: elem.image, 
//   color: elem.color,
//   totalAmount: elem.totalAmount,
//   totalPrice: elem.totalPrice
// };

// // fetch를 사용하여 서버로 데이터 전송
// fetch('/api/orders/create', {
//   method: 'POST', 
//   headers: {
//     'Content-Type': 'application/json' 
//   },
//   body: JSON.stringify(cartData) 
// })
// .then(response => {
//   if (response.ok) {
//     // 응답이 성공적으로 처리되었을 경우의 처리
//     alert("결제가 완료되었습니다.");
//     window.location.replace("cart-order-finished.html");
//   } else {
//     // 응답이 에러인 경우의 처리
//     console.error('장바구니 결제 정보 전송에 실패하였습니다.');
//   }
// })
// .catch(error => {
//   // 오류 발생 시의 처리
//   console.error('장바구니 결제 중 오류가 발생하였습니다.', error);
// });

// payButton.addEventListener("click", order);