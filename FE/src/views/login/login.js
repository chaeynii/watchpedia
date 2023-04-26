import * as Api from "/api.js";


const loginEmail = document.getElementById("loginInputEmail");
const loginPassword = document.getElementById("loginInputPw");

const loginSubmit = document.getElementById("loginBtn");

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

    const email = loginEmail.value;
    const password = loginPassword.value;

// 클라이언트 사이드 데이터 유효성 체크 검사

    // 이메일 형식 체크 함수
    const isEmailValid= (loginEmail) => {
        return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    // 비밀번호 길이 체크 함수
    const isPasswordValid = (loginPassword) => {
        return password.length >= 4;
    };


// 유효성 체크 검사 시작

    // 공백 경고 alert
    if (email === '' || password === '') {
        alert('이메일과 비밀번호를 모두 입력해주세요.');
        return;
    }

    // 이메일 검사
    if (!isEmailValid(loginEmail)) {
        alert('올바른 이메일 형식이 아닙니다.');
        return;
    }

    // 비밀번호 길이 검사
    if (!isPasswordValid(loginPassword)) {
        alert('비밀번호는 4글자 이상이어야 합니다.');
        return;
    }

// 로그인 api 요청(fetch 버전)
const loginURL = "/api/login";

const data = {
    email: data.email,
    pw: data.pw,
}

Api.post(loginURL, {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(data) 
})
    .then((response) => {
        if (!response.ok) {
            throw new Error("데이터 전송에 실패하였습니다.");
        }
        return response.json(); // 응답 데이터를 JSON 형태로 파싱하여 반환
    })
    .then((responseData) => {
        // 로그인 페이지 이동
        console.log(responseData);
        alert("회원가입에 성공했습니다.");
        window.location.href = "login.html";
    })
    .catch((error) => {
        // 에러 처리
        console.error(error);
        // alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`)
    })}