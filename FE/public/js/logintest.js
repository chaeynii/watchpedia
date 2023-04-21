const email = document.getElementById('loginInputEmail');
const password = document.getElementById('loginInputPw');
const loginSubmit = document.getElementById('loginBtn');
let errStack = 0;

loginSubmit.addEventListener('click', () => {
// 클라이언트 사이드 데이터 유효성 검사
// 유효성 검사 형식

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


// 유효성 검사 시작
    // 이메일 형식 검사
    if (!validateEmail(email.value)) {
        alert('올바른 이메일 형식이 아닙니다.');
        return;
    }

    // 비밀번호 길이 검사
    if (!isPasswordValid(password.value)) {
        alert('비밀번호는 4글자 이상이어야 합니다.');
        return;
    }

// 로그인 로직(예시)
    if (email.value === 'test@user.com') {
        if (password.value === '0000') {
            alert('로그인 되었습니다!');
        } else {
            alert('이메일과 비밀번호를 다시 한 번 확인해주세요!');
            errStack++;
        }
    } 
    
    else {
        alert('존재하지 않는 계정입니다.');
    }

    if (errStack >= 3) {
        alert('비밀번호 3회 실패. 비밀번호 찾기를 시도하세요.');
    }

    
});
