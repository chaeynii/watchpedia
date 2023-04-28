import * as Api from "/api.js";

const registerName = document.getElementById("register-name");
const registerEmail = document.getElementById("register-email");
const registerPw = document.getElementById("register-pw1");
const registerPwConfirm = document.getElementById("register-pw2");
const registerZip = document.getElementById("register-address1");
const registerAddress = document.getElementById("register-address2");
const registerAddressDetail = document.getElementById("register-address3");
const registerPhoneNum = document.getElementById("register-contact");

const registerSubmit = document.getElementById("register-submit");


addAllElements();
addAllEvents();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function addAllElements() {}

//// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
    registerSubmit.addEventListener("click", handleSubmit);
}


// 회원가입 진행
async function handleSubmit(e) {
    e.preventDefault(); // 폼 제출 시에도 기존 내용 유지

    const name = registerName.value;
    const email = registerEmail .value;
    const pw = registerPw.value;
    const passwordConfirm = registerPwConfirm.value;
    const phone = registerPhoneNum.value;
    const zip = registerZip.value;
    const address_1 = registerAddress.value;
    const address_2 = registerAddressDetail.value;

// 클라이언트 사이드 데이터 유효성 체크 검사

    // 이름 형식 체크 함수
    const isNameValid = (registerName) => {
        return name.length >= 2;
        };

    // 이메일 형식 체크 함수
        const isEmailValid= (registerEmail) => {
            return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
        };

    // 비밀번호 길이 체크 함수
    const isPasswordValid = (registerPw) => {
        return pw.length >= 4;
        };

    // 비밀번호 재확인 체크 함수
    const isPasswordSame = (registerPw, registerPwConfirm) => {
        return pw === passwordConfirm;
    }
    

    // 휴대폰번호 체크 함수
        const isPhoneNumValid = (registerPhoneNum) => {
            const pattern = /^[0-9]+$/;
            return pattern.test(phone);
    };
    

// 유효성 체크 검사 시작
    // 이름 길이 검사
    if (!isNameValid(registerName)) {
        alert("이름은 2글자 이상이어야 합니다.");
        return;
    }

    // 이메일 검사
    if (!isEmailValid(registerEmail)) {
        alert("올바른 이메일 형식이 아닙니다.");
        return;
    }

    // 비밀번호 길이 검사
    if (!isPasswordValid(registerPw)) {
        alert('비밀번호는 4글자 이상이어야 합니다.');
        return;
    }

    // 비밀번호 일치 검사
    if (!isPasswordSame(registerPw, registerPwConfirm)) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
    }

    // 휴대폰번호 검사
    if (!isPhoneNumValid(registerPhoneNum)) {
        alert("휴대폰 번호 형식이 맞지 않습니다.");
        return;
    } 


// // 회원가입 api 요청
// 밑에 형식 이상하면 내부 유효성 검사 안뜨는 문제 발생하고 있음

const registerURL = "/api/register";

const data = { name, email, pw, zip, address_1, address_2, phone }

Api.post(registerURL, data)
    .then((res) => {
        // 로그인 페이지 이동
        console.log(res)
        alert("회원가입에 성공했습니다.");
        window.location.href = "/login";
    })
    .catch((error) => {
        // 에러 처리
        console.error(error);
        alert(error.message)
    });
}