// import * as Api from "/api.js";

// const urlParams = new URL(location.href).searchParams;
// const productId = urlParams.get("id"); //productId 정의

// // 작품 data 가져오기
// async function getProductDetail() {
//   const products = await Api.get("/api/products"); //products 불러오기
//   console.log(productId);
//   products.forEach((productData) => {
//     if (productData._id === productId) {
//       console.log(productData);
//       document.querySelector("#product-id").name = productData._id; //디폴트는 ""값
//       document.querySelector("#work-img").src = productData.image; //디폴트는 ""값
//       document.querySelector("#work-type").innerHTML = productData.category;
//       document.querySelector(
//         "#work-name"
//       ).innerHTML = `${productData.productName} | ${productData.painterName}`;
//       document.querySelector(
//         ".work-price"
//       ).innerHTML = `${productData.price}원`;
//       document.querySelector(".work-explain").innerHTML = productData.content;
//       document.querySelector(
//         "#painter-link"
//       ).href = `/painter/?name=${productData.painterName}`;
//     }
//   });
// }
// getProductDetail();



// ******* 유정님 작업 시작 ******* //
// const addToCartBtn = document.querySelector(".btn-primary");
// addToCartBtn.addEventListener("click", () => {
//   const cartItem = {
//     name: product.name,
//     price: product.price,
//     image: product.bigImageURL,
//     amount: amount,
//     color: productColor.value, // 선택된 색상 정보 저장
//   };

//   let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

//   //장바구니에 상품이 있는지 확인
//   const existingItemIndex = cartItems.findIndex((item) => item.id === cartItem.id);

//   if (existingItemIndex !== -1) {
//     // 있다면 해당 제품 갯수 증가
//     cartItems[existingItemIndex].amount += cartItem.amount;
//   } else {
//     // 없다면 해당 제품 추가
//     cartItems.push(cartItem);
//   }

//   localStorage.setItem("cartItems", JSON.stringify(cartItems));
// });
// })
// .catch((error) => {
// console.error("에러 발생:", error);
// });

// ******* 유정님 작업 끝 ******* //


// 상세페이지에서 장바구니 버튼 눌렀을 떄 로컬 스토리지로 올리는 작업 정의 
// 나중에 product detail 페이지에서 이 js 모듈 불러와야 함!!!!
const addCartBtn = document.querySelector("#addCart"); // 장바구니 클래스명 필요

function addCart() {  // 장바구니 담기 함수
  let cartList = JSON.parse(localStorage.getItem("cart")); 
  // 로컬스토리지 cart 정보 파싱하는 함수(선언 밑에 있음)

  if (cartList === null) { // 빈 장바구니
    cartList = []; // 배열로 담기
  }

  // 로컬스토리지에 올릴 조건 정의 시작, 문자열만 셀렉 (제외 조건: 상품설명 제외, 이미지는 객체에서 등장)
  let name = document.querySelector(".product-name") // 상품명
  let price = Number(document.querySelector(".product-price"));  //상품가격
  let smallImageURL = document.querySelector(".product-detail-img") // 상품 이미지
  let productColor = document.querySelector(".product-color") // 상품 색상
  let productCount = document.querySelector(".product-amount-count") // 상품 수량

  // 로컬에 실을 정보 객체 형태 통으로 담기
  const wantToCart = {
    name: name,
    price: price,
    smallImageURL: document.querySelector(".product-detail-img").src,
    productCount: document.querySelector(".product-amount-count").value,
    color: color,
  };

  // (예외처리) 기존 장바구니 리스트에 현재 상품이 있는 경우
  let check = true;
  for (let elem of cartList) {
    if (elem["name"] === document.querySelector(".product-name").value) {  
      check = false;
      alert("동일한 상품이 이미 장바구니에 담겨있습니다.");
      break; 
    }
  }

  if (check) {
    cartList.push(wantToCart);  // 장바구니 내용 모두 cartList에 push
  }

  // cart로 로컬 스토리지 값 세팅, 스토리지 올릴때는 문자열화
  localStorage.setItem("cart", JSON.stringify(cartList)); 
  alert("장바구니 넣기 성공!");
}

addCartBtn.addEventListener("click", addCart);


// 바로구매 작업
const buyBtn = document.querySelector("#buyNow"); 

function buyNow() { // 밑에 필요 없을 수도 있음...?? 또는 주문결제 페이지에서 구현 필요
  let name = document.querySelector(".product-name") // 상품명
  let price = Number(document.querySelector(".product-price"));  //상품가격
  let smallImageURL = document.querySelector(".product-detail-img") // 상품 이미지
  let productColor = document.querySelector(".product-color") // 상품 색상
  let productCount = document.querySelector(".product-amount-count") // 상품 수량

  const buyList = [ 
    {
      name: name,
      price: price,
      smallImageURL: document.querySelector(".product-detail-img").src,
      productCount: document.querySelector(".product-amount-count").value,
      color: color,
    },
  ];


// 로컬스토리지 값 문자열로 저장
  localStorage.setItem("buy-direct", JSON.stringify(buyList));

  // 로그인을 하지 않은 경우
  const token = sessionStorage.getItem("token");
  if (!token) {
    alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
    window.location.href="/login";
  }

  window.location.href="/cart-order";
}

buyBtn.addEventListener("click", buyNow);
