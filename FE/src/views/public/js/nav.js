//스크롤 이벤트
const header = document.querySelector("header");
const nav = document.querySelector("nav");
let headerHeight = header.offsetHeight;

window.onscroll = function () {
    let windowTop = window.scrollY;
    if (windowTop > 195) {
        header.classList.add("drop"); 
        nav.classList.add("drop");
    } else {
        header.classList.toggle("drop", windowTop !== 0);
        nav.classList.toggle("drop", windowTop !== 0);
    }
};

const dropdownItems = document.querySelectorAll(".dropdown-item");

dropdownItems.forEach(function(item) {
  item.addEventListener("click", function(event) {
    event.preventDefault();
    const category = event.target.textContent;
    if (category) {
      location.href = `../product-list/product-list.html?category=${category}`;
    }
  });
});
// 제품 목록에서 클릭한 제품의 id값을 URL에 추가하는 함수
function goToProductDetail(id) {
  window.location.href = "../product-detail/product-detail.html?id=" + id;
}

// 제품 목록에서 제품 클릭 시 이벤트 리스너 등록
const items = document.querySelectorAll(".item");
items.forEach(item => {
  const productId = item.dataset.id;
  item.addEventListener("click", function(event) {
    event.preventDefault();
    goToProductDetail(productId);
  });
});



//로그인 유무 체크
const utilLink = document.querySelector('.util-link');
const loginBtn = document.createElement('button');
const signupBtn = document.createElement('button');
const mypageBtn = document.createElement('button');
const cartBtn = document.createElement('button');

// 페이지 로딩 시 상태 체크
function checkStatus() {
  const token = localStorage.getItem('token');

  if (token) {
    // 로그인 상태
    loginBtn.style.display = 'none';
    signupBtn.style.display = 'none';
    mypageBtn.style.display = 'inline-block';
    cartBtn.style.display = 'inline-block';
  } else {
    // 로그아웃 상태
    loginBtn.style.display = 'inline-block';
    signupBtn.style.display = 'inline-block';
    mypageBtn.style.display = 'none';
    cartBtn.style.display = 'none';
  }
}

// 로그인/로그아웃 상태 업데이트
function updateStatus() {
  checkStatus();
}

// 이벤트 등록
loginBtn.addEventListener('click', () => {
  location.href = '../login.html';
});
signupBtn.addEventListener('click', () => {
  location.href = '../signup.html';
});
mypageBtn.addEventListener('click', () => {
  location.href = '../user-mypage/user-mypage.html';
});
cartBtn.addEventListener('click', () => {
  location.href = '../cart/cart.html';
});

// 버튼 설정
loginBtn.type = 'button';
loginBtn.className = 'btn btn-link';
loginBtn.textContent = '로그인';

signupBtn.type = 'button';
signupBtn.className = 'btn btn-link';
signupBtn.textContent = '회원가입';

mypageBtn.type = 'button';
mypageBtn.className = 'btn btn-link';
mypageBtn.textContent = '마이페이지';
mypageBtn.style.display = 'none';

cartBtn.type = 'button';
cartBtn.className = 'btn btn-link';
cartBtn.textContent = '장바구니';
cartBtn.style.display = 'none';

// 버튼 추가
utilLink.appendChild(loginBtn);
utilLink.appendChild(mypageBtn);
utilLink.appendChild(signupBtn);
utilLink.appendChild(cartBtn);

// 초기 상태 체크
checkStatus();
