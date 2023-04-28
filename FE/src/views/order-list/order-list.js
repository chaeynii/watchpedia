import * as Api from "/api.js";

const orderNone = document.querySelector(".mypage__order--none");
const orderListZone = document.querySelector(".order__list");
const userDeleteBtn = document.querySelector(".user__delete");
const orderCheckBtn = document.querySelector(".order__check");


//token역파시 하는 것
function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    
    return JSON.parse(jsonPayload);
};

const token = sessionStorage.getItem('token')
const userId = parseJwt(token).userId

// 1000 -> 1,000
const addCommas = n => {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};



// 전체 리스트에서 로그인 한 회원의 주문 내역만 불러오기
Api.get('/api/admin', "orders")
  .then((data) => {
     const myOrder = data.filter(i  => i['buyer']._id === userId)

     for(let i = 0 ; i < myOrder.length; i++){
        let orders = myOrder[i]
        

        console.log('orders', orders)

    //      orderListZone.innerHTML += `<div class="order__contents card">
    //      <a href="#">
    //          <div class="card-header">${orders.orderDate} 주문</div>
    //          <div class="orderzone__${myOrder}" style="display:flex;align-items: center;justify-content: space-between;">
    //              <div class="order__${myOrder}">
                     
    //                  <div class="card-body">
    //                      <div class="product__picture">
    //                          <img src="" class="product__image"/>
    //                      </div>
    //                      <div class="product__information">
    //                          <h5 class="card-title">${produtName}</h5>
    //                          <span class="card-text">${addCommas(produtPrice)}원</span>
    //                          <span class="card-text"> / </span>
    //                          <span class="card-text">${orders.countList[i]}개</span>
    //                      </div>
    //                  </div>
                     
    //              </div>
    //              <div>
    //                  <div class="detail__zone">
    //                      <div class="shipping__status__${myOrder}">${orders.shippingStatus}</div>
    //                      <a type="button" class="btn btn-outline-secondary" href="../order-detail/order-detail.html">
    //                          주문상세
    //                      </a>
    //                  </div>
    //              </div>
    //          </div>
    //      </a>
    //  </div>
    // `;
        
     }
    
     console.log('data::::', myOrder)
  })
  .catch((err) => {
    alert(`에러가 발생했습니다. 관리자에게 문의하세요. \n ${err}`);
    window.location.href = "/";
  });


// 주문내역 있는 경우
function orderListMake(order) {

    // 전체 리스트에서 로그인 한 회원의 주문 내역만 불러오기
    // Api.get('/api/admin', 'orders')
    // .then((data) => {
    //     // const orders = data.map(i => i)
    //     const myOrder = data.filter(item  => item['buyer']._id === userId)  
        
    //     console.log('myorder:::', data)
    //     // 주문내역이 있으면 주문내역 없다는 안내멘트 지우기

    //     // console.log("orders::::", orders)
    //     // orderNone.className = "mypage__order--none hidden";

    //     // orderListZone.innerHTML += `<div class="order__contents card">
    //     //     <a href="/orders/detail/${orderId}">
    //     //         <div class="card-header">${orderDay} 주문</div>
    //     //         <div class="orderzone__${orderId}" style="display:flex;align-items: center;justify-content: space-between;">
    //     //             <div class="order__${orderId}"></div>
    //     //     </a>
    //     // </div>
    //     // `;
    // })
    // .catch((err) => {
    //     alert(`에러가 발생했습니다. 관리자에게 문의하세요. \n ${err}`);
    //     window.location.href = "/";
    // });





    for (let i = 0; i < countList.length; i++) {
        const productId = countList[i].id;
        //const productCount = countList[i].count;
        Api.get('/api/product', `${productId}`)
        .then((product) => {
            const productName = product.name;
            const productImg = product.smallImageURL;
            const productPrice = product.price;

            // 상품정보 삽입
            const dateOrder = document.querySelector(`.order__${orderId}`);
            dateOrder.innerHTML += `
                <div class="card-body">
                    <div class="product__picture">
                        <img src=${productImg} class="product__image"/>
                    </div>
                    <div class="product__information">
                        <h5 class="card-title">${productName}</h5>
                        <span class="card-text">${addCommas(productPrice)}원</span>
                        <span class="card-text"> / </span>
                        <span class="card-text">${countList[i]}개</span>
                    </div>
                </div>
            `;
        })
        .catch((err) => alert(err));
    }

    // 배송상태와 주문상세버튼 날짜별로 1개씩 추가
    const orderZone = document.querySelector(`.orderzone__${orderId}`);
    orderZone.innerHTML += `
        <div>
            <div class="detail__zone">
                <div class="shipping__status__${orderId}">${shippingStatus}</div>
                <a type="button" class="btn btn-outline-secondary" href="/orders/detail/${orderId}">
                    주문상세
                </a>
            </div>
        </div>
    `;

    // 배송현황 취소완료시 글씨 색 red로 변경
    if (shippingStatus === "취소완료") {
        const shippingStatusMessage = document.querySelector(
            `.shipping__status__${orderId}`
        );
        shippingStatusMessage.style.color = "red";
    }
}

orderCheckBtn.addEventListener("click", orderListMake);


// 회원탈퇴 기능
async function deleteUser() {

    const answer = confirm(
        "회원 탈퇴 하시겠습니까? \n탈퇴즉시 정보가 삭제됩니다."
    );
    
    if (answer) {
        try{
            await Api.delete('/api/mypage', userId)
        }catch(e){
            sessionStorage.removeItem('token')
            window.location.href = '/'
        }
    }
}

userDeleteBtn.addEventListener("click", deleteUser);
