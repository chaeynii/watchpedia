import * as Api from "../api.js";

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");
const productUrl = '/api/product';


// 상세페이지에서 장바구니 버튼 눌렀을 떄 로컬 스토리지로 올리는 작업 정의 
// 나중에 product detail 페이지에서 이 js 모듈 불러와야 함!!!!

const addCartBtn = document.querySelector("#addCart"); // 장바구니 클래스명 필요

function addCart() {  // 장바구니 담기 함수
    let cartList = JSON.parse(localStorage.getItem("cart"));

    // 로컬스토리지 cart 정보 파싱하는 함수(선언 밑에 있음)
    console.log('addCart 실행', cartList)

    if (cartList === null) { // 빈 장바구니
      cartList = []; // 배열로 담기
    }

// 상품정보(고정값) api로 가져오기
Api.get(productUrl, `${productId}`) 
    .then((product)=> {
      const name = product.name;
      const image = product.bigImageURL;
      const price = product.price;
      console.log("product 확인:", product); //id를 포함한 가장 많은 정보들이 들어옴

      //document로 가져옴
      const count = document.querySelector(".product-amount-count");
      const color = document.getElementById("product-color");

      const wantToCart = {
        name: name,
        image: image,
        price: price,

        count: count.innerText,
        color: color.value,
      };
      console.log("wantToCart(cartList) 출력", wantToCart);
       
      cartList.push(wantToCart); 

      localStorage.setItem("cart", JSON.stringify(cartList)); 
      console.log("로컬스토리지 목록 입니다", cartList);
      alert("장바구니 넣기 성공!")

// (예외처리) 기존 장바구니 리스트에 현재 상품이 있는 경우
    let check = true;
    for (let elem of cartList) {
      if (elem["name"] === document.getElementById("product-name").value) {  
        check = false;
        alert("동일한 상품이 이미 장바구니에 담겨있습니다.");
        break; 
      }
    }
    if (check) {
      cartList.push(wantToCart);  // 장바구니 내용 모두 cartList에 push
    }
    })
}
  addCartBtn.addEventListener("click", addCart);


  /////////////////  바로구매 작업
  const buyBtn = document.querySelector("#buyNow"); 

  function buyNow() { 
    Api.get(productUrl, `${productId}`) 
    .then((product)=> {
      const name = product.name;
      const image = product.bigImageURL;
      const price = product.price;
      console.log("product 확인:", product);

    const count = document.querySelector(".product-amount-count");
    const color = document.getElementById("product-color");

      const buyList = {
        name: name,
        image: image,
        price: price,

        count: count.innerText,
        color: color.value,
      };
      console.log("buyList(바로구매) 출력", buyList);

    // 로컬스토리지 값 문자열로 저장
    localStorage.setItem("buy-direct", JSON.stringify(buyList));
    })


    // 로그인을 하지 않은 경우
    const token = sessionStorage.getItem("token");
    if (!token) {
      alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
      window.location.href= "/login";
    }
    else {
      window.location.href="./cart-order.html"; 
    }
  }
  buyBtn.addEventListener("click", buyNow);

