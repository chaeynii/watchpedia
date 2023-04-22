// import * as Api from "/api.js";

const name = document.getElementById("register-name");
const email = document.getElementById("register-email");
const password = document.getElementById("register-pw1");
const passwordConfirm = document.getElementById("register-pw2");
const address = document.getElementById("register-address1");
const addressDetail = document.getElementById("register-address2");
const phoneNum = document.getElementById("register-contact");
const registerSubmit = document.getElementById("register-submit");


registerSubmit.addEventListener('click', () => {
// 클라이언트 사이드 데이터 유효성 체크 검사

    // 이름 형식 체크 함수
        const isNameValid = (name) => {
        return name.length >= 2;
        };

    // 이메일 형식 체크 함수
        const validateEmail = (email) => {
            return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
        };

    // 비밀번호 길이 체크 함수
    const isPasswordValid = (password) => {
        return password.length >= 4;
        };

    // 비밀번호 재확인 체크 함수
        const isPasswordSame = password === passwordConfirm;

    // 휴대폰번호 체크 함수
        const isPhoneNumValid = (phoneNum) => {
            const pattern = /^[0-9]+$/;
            return pattern.test(phoneNum);
    };
    

// 유효성 검사 시작
    // 이름 또는 비밀번호 검사
    if (!isNameValid || !isPasswordValid) {
        return alert("이름은 2글자 이상, 비밀번호는 4글자 이상이어야 합니다.");
    }

    // 이메일 검사
    if (!validateEmail(email.value)) {
        return alert("올바른 이메일 형식이 아닙니다.");
    }

    // 비밀번호 길이 검사
    if (!isPasswordValid(password.value)) {
        return alert('비밀번호는 4글자 이상이어야 합니다.');
    }

    // 비밀번호 일치 검사
    if (!isPasswordSame) {
        return alert("비밀번호가 일치하지 않습니다.");
    }

    // 휴대폰번호 검사
    if (!isPhoneNumValid(phoneNum.value)) {
        return alert("휴대폰 번호 형식이 맞지 않습니다.");
    }


});
