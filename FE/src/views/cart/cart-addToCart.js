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



// ******* 유정님 작업 ******* //
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

// ******* 유정님 작업 ******* //


// 상세페이지에서 장바구니 버튼 눌렀을 떄 로컬 스토리지로 올리는 작업 정의 
// 나중에 product detail 페이지에서 이 js 모듈 불러와야 함!!!!
const addCartBtn = document.querySelector(".addCart"); // 장바구니 클래스명 필요

function addCart() {  // 장바구니 담기 함수
  let cartList = JSON.parse(localStorage.getItem("cart")); // 로컬스토리지 cart 정보 파싱하는 함수(선언 밑에 있음)

  if (cartList === null) { // 빈 장바구니
    cartList = []; // 배열로 담기
  }


  // 로컬스토리지에 올릴 조건 정의 시작, 문자열만 셀렉 (제외 조건: 상품설명 제외, 이미지는 객체에서 등장)
  let productName = document.querySelector(".product-name") // 상품명

  let productPrice = Number( //상품가격
    document.querySelector(".product-price") // 원은 공백값으로 변경
  );
  let productAmount = document.querySelector(".product-amount") // 상품 수량
  let productColor = document.querySelector(".product-color") // 상품 색상


  // 로컬에 실을 정보 객체 형태 통으로 담기
  const wantToCart = {
    name: productName,
    price: productPrice,
    smallImageUR: document.querySelector(".product-detail-img").src,
    productCount: productAmount,
    color: productColor,
  };

  // (예외처리) 기존 장바구니 리스트에 현재 상품이 있는 경우
  let check = true;
  for (let elem of cartList) {
    if (elem["productNAME"] === document.querySelector(".product-name").name) {  
      // productNAME은 설정한 변수값
      // id 없어도 디테일 페이지에 상품 name 추가해야함
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
addCartBtn.addEventListener("click", addCart); // 장바구니 버튼 id html 추가 필요(상품명만 하기로 했음)


// 바로구매 작업
const buyBtn = document.querySelector(".BuyNow"); // 바로구매 버튼 id html 추가 필요

function buyNow() { // 밑에 필요 없을 수도 있음...?? 또는 주문결제 페이지에서 구현 필요
let productName = document.querySelector(".product-name") // 새로 선언한 이름
let productPrice = Number(document.querySelector(".product-price"));
let productAmount = document.querySelector(".product-amount") // 상품 수량
let productColor = document.querySelector(".product-color") // 상품 색상

  const buyList = [ //왜 이건 배열로 담는지 ?
    {
    productName: productName,
    productPrice: productPrice,
    ProductImage: document.querySelector(".product-detail-img").src,
    productAmount: productAmount,
    productColor: productColor,
    },
  ];


// 로컬스토리지 값 문자열로 저장
  localStorage.setItem("buy-direct", JSON.stringify(buyList));
  window.location.replace("cart-order.html");
}

buyBtn.addEventListener("click", buyNow);
