import * as Api from "/api.js";


const loginEmail = document.getElementById("adminLoginInputEmail");
const loginPassword = document.getElementById("adminLoginInputPw");

const loginSubmit = document.getElementById("adminLoginBtn");

addAllElements();
addAllEvents();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function addAllElements() {}

//// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
    loginSubmit.addEventListener('click', handleSubmit);
}

// 로그인 진행
async function handleSubmit(e) {
    e.preventDefault(); // 로그인 실패시 에도 기존 내용 유지

    const email = adminLoginInputEmail.value;
    const pw = adminLoginInputPw.value;

// 클라이언트 사이드 데이터 유효성 체크 검사

    const isAdminValid = (loginEmail) => {
        return email === 'admin'
    }
    // 비밀번호 길이 체크 함수
    const isPasswordValid = (loginPassword) => {
        return pw === "admin";
    };


// 유효성 체크 검사 시작

    // 공백 경고 alert
    if (email === '' || pw === '') {
        alert('이메일과 비밀번호를 모두 입력해주세요.');
        return;
    }

    if(!isAdminValid(loginEmail)){
        alert('관리자 이메일이 아닙니다');
        return;
    }
    // 비밀번호 길이 검사
    if (!isPasswordValid(loginPassword)) {
        alert('비밀번호가 틀립니다');
        return;
    }

// 로그인 api 요청(fetch 버전)
const loginURL = "/api/admin/login";

const data = { email, pw }


Api.post(loginURL, data)
   .then( async (res) => {
        const json = await res;
        const token = json.token

        sessionStorage.setItem('token', token)

        alert('로그인 성공!')

        window.location.href="/admin"
   })
    .catch((error) => {
        // 에러 처리
        alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${error.message}`)
    })
}