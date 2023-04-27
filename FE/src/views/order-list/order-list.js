import * as Api from "/api.js";

const orderNone = document.querySelector(".mypage__order--none");
const orderListZone = document.querySelector(".order__list");
const userDeleteBtn = document.querySelector(".user__delete");

// 1000 -> 1,000
const addCommas = n => {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// 주문내역 있는 경우
function orderListMake(order) {
    // 주문내역이 있으면 주문내역 없다는 안내멘트 지우기
    orderNone.className = "mypage__order--none hidden";

    const orderId = order._id;
    const countList = order.productCount;
    //const productIdList = order.productList;
    const orderDay = order.createdAt.split("T")[0];
    const shippingStatus = order.shoppingStatus;

    orderListZone.innerHTML += `<div class="order__contents card">
        <a href="/orders/detail/${orderId}">
            <div class="card-header">${orderDay} 주문</div>
            <div class="orderzone__${orderId}" style="display:flex;align-items: center;justify-content: space-between;">
                <div class="order__${orderId}"></div>
        </a>
    </div>
    `;


    for (let i = 0; i < countList.length; i++) {
        //fetch(`/api/products/${productIdList[i]}`)
        //fetch(`order-list-test.json`)
        Api.get(`/api/mypage/orders/:orderId`)
        // .then(async (res) => {
        //     const json = await res.json();
        //     if (res.ok) {
        //         return json;
        //     }
        //     return Promise.reject(json);
        // })
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



// 회원탈퇴 기능
function deleteUser() {
    const answer = confirm(
        "회원 탈퇴 하시겠습니까? \n탈퇴즉시 정보가 삭제됩니다."
    );
    if (answer) {
        fetch(`/api/user/${_id}`, {
            method: "DELETE",
        })
        // .then(async (res) => {
        //     const json = await res.json();

        //     if (res.ok) {
        //         return json;
        //     }

        //     return Promise.reject(json);
        // })
        .then((data) => {
            alert("회원 정보가 삭제되었습니다.");
            window.location.href = "/";
        })
        .catch((err) =>
            alert(`회원정보 삭제 과정에서 오류가 발생하였습니다: ${err}`)
        );
    }
}

userDeleteBtn.addEventListener("click", deleteUser);
