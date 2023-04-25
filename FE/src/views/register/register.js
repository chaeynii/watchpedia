// import * as Api from "./api.js";

const registerName = document.getElementById("register-name");
const registerEmail = document.getElementById("register-email");
const registerPw = document.getElementById("register-pw1");
const registerPwConfirm = document.getElementById("register-pw2");
const registerAddress = document.getElementById("register-address1");
const registerAddressDetail = document.getElementById("register-address2");
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

    const fullName = registerName.value;
    const email = registerEmail .value;
    const password = registerPw.value;
    const passwordConfirm = registerPwConfirm.value;
    const phoneNumber = registerPhoneNum.value;
    const address1 = registerAddress.value;
    const address2 = registerAddressDetail.value;

// 클라이언트 사이드 데이터 유효성 체크 검사

    // 이름 형식 체크 함수
    const isNameValid = (registerName) => {
        return fullName.length >= 2;
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
        return password.length >= 4;
        };

    // 비밀번호 재확인 체크 함수
    const isPasswordSame = (registerPw, registerPwConfirm) => {
        return password === passwordConfirm;
    }
    

    // 휴대폰번호 체크 함수
        const isPhoneNumValid = (registerPhoneNum) => {
            const pattern = /^[0-9]+$/;
            return pattern.test(phoneNumber);
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

// 회원가입 api 요청
  try {
    const data = {
      fullName,
      email,
      password,
      phoneNumber,
      address1,
      address2,
    };

    await Api.post("/api/users", data);

    console.log(data);

    alert(`정상적으로 회원가입되었습니다.`);

    // 로그인 페이지 이동
    window.location.href = "loginFIN.html";
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}