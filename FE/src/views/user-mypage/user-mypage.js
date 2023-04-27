import * as Api from "/api.js";

// import { main } from "/public/js/main.js";
// const { loggedInUser } = await main();

// if (!loggedInUser) {
//     window.location.href = "/";
// }

const addressSearchBtn = document.querySelector(".address__search");
const userInfoChangeBtn = document.querySelector(".user-info--change");
const userDeleteBtn = document.querySelector(".user__delete");

const [
    userEmail,
    userPassWordOne,
    userPassWordTwo,
    userName,
    userPhoneNumber,
    userPostCode,
    userStreetAddress,
    userExtraAddress,
] = document.querySelectorAll(".user-info");

const token = sessionStorage.getItem("token");
let pw, _id;

Api.get(`/api/mypage`,"64482d003a3beba2765daa2b")
// {
//     //method: "GET",
//     headers: {
//         Authorization: `Bearer ${token}`,
//     },
// })
  .then((data) => {
    let { _id, email, pw, address_1, address_2, zip, name, phone } = data;
    
    // 유저 데이터를 사용하여 UI를 업데이트합니다.
    userEmail.innerHTML = email;
    userPassWordOne.value = pw;
    userName.value = name;
    userPhoneNumber.value = phone;
    userPostCode.value = zip;
    userStreetAddress.value = address_1;
    userExtraAddress.value = address_2;
  })
  .catch((err) => {
    alert(`에러가 발생했습니다. 관리자에게 문의하세요. \n에러내용: ${err}`);
  });


// 유저 불러오기
// let { _id, email, pw, address_1, address_2, zip, name, phone
// } = data;

// userEmail.innerHTML = email;
// userPassWordOne.value = pw;
// userName.value = name;
// userPhoneNumber.value = phone;
// userPostCode.value = zip;
// userStreetAddress.value = address_1;
// userExtraAddress.value = address_2;

// 주소와 핸드폰번호가 없을 경우 빈칸으로 만들기
if (userPostCode.value === "undefined" || userStreetAddress.value === "undefined") {
    userPostCode.value = "";
    userStreetAddress.value = "";
    userExtraAddress.value = "";
}

if (userPhoneNumber.value === "undefined") {
    userPhoneNumber.value = "";
}

//주소 찾기
// Daum 주소 API
function searchAddress() {

    new daum.Postcode({
        oncomplete: function (data) {
            let addr = '';
            let extraAddr = '';


            if (data.userSelectedType === 'R') {
                addr = data.roadAddress;
            } else {
                addr = data.jibunAddress;
            }

            if (data.userSelectedType === 'R') {
                if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                    extraAddr += data.bname;
                }
                if (data.buildingName !== '' && data.apartment === 'Y') {
                    extraAddr +=
                    extraAddr !== '' ? ', ' + data.buildingName : data.buildingName;
                }
                if (extraAddr !== '') {
                    extraAddr = ' (' + extraAddr + ')';
                }
            } else {
            }

            userPostCode.value = data.zonecode;
            userStreetAddress.value = `${addr} ${extraAddr}`;

            userExtraAddress.focus();
        },
    }).open();
}

addressSearchBtn.addEventListener("click", searchAddress);

// 우편번호, 도로명주소 input칸 클릭 시 주소검색 나타나게 구현
userPostCode.addEventListener("click", searchAddress);
userStreetAddress.addEventListener("click", searchAddress);


// 유저변경
function saveUserData(e) {
    e.preventDefault();
    // 비밀번호 확인
    if (!(userPassWordOne.value === "" && userPassWordTwo.value === "")) {
        // 두 칸이 빈칸이 아니면 = 하나라도 입력값이 있으면
        if (userPassWordOne.value !== userPassWordTwo.value) {
            // 두 값이 틀리면
            return alert("비밀번호가 다릅니다. 다시 입력해주세요.");
        } else if (userPassWordOne.value === userPassWordTwo.value) {
            pw = userPassWordOne.value;
        }
    } else {
        return alert("비밀번호를 입력해주세요.");
    }

    // 이름
    if (!userName.value.trim()) {
        return alert("이름을 입력해주세요");
    }

    // 전화번호
    if (!userPhoneNumber.value) {
        return alert("휴대폰번호를 입력해주세요.");
    } else if (userPhoneNumber.value !== "") {
        // 숫자만 매칭
        const numberCheck = userPhoneNumber.value.split("");
        let result = [];
        numberCheck.forEach((number) => {
            const pattern = /[0-9]/g;
            result.push(number.match(pattern));
        });

        // 숫자가 아닌 다른값이 들어가 있을 경우
        if (result.includes(null)) {
            return alert("휴대폰번호를 잘못 입력하셨습니다. 숫자만 입력하세요.");
        }
        // 길이가 아닐 경우
        if (!(numberCheck.length >= 10 && numberCheck.length <= 11)) {
            return alert("휴대폰번호를 잘못 입력하셨습니다. 다시 입력해주세요.");
        }
    } else {
        userPhoneNumber.value = phoneNumber;
    }

    let { pw, address_1, address_2, zip, phone } = data;
    Api.patch(`/api/mypage`,"64482d003a3beba2765daa2b", data) 
    .then(async (res) => {
        const json = await res.json();
        console.log('json:::', json)
        if (res.ok) {
            return json;
        }

        return Promise.reject(json);
    })
    .then((userInfoChange) => {
        alert("회원정보가 변경되었습니다.");
    })
    .catch((err) => {
        alert(`에러가 발생했습니다. 관리자에게 문의하세요. \n에러내용: ${err}`);
    });
}

userInfoChangeBtn.addEventListener("click", saveUserData);


// 회원탈퇴 기능
function deleteUser() {
    const answer = confirm(
        "회원 탈퇴 하시겠습니까? \n탈퇴즉시 정보가 삭제됩니다."
    );
    if (answer) {
        fetch(`/api/users/${_id}`, {
            method: "DELETE",
        })
        .then(async (res) => {
            const json = await res.json();

            if (res.ok) {
                return json;
            }

            return Promise.reject(json);
        })
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
