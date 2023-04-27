// import { main } from "/public/js/main.js";
// const { loggedInUser } = await main();

// import { error } from "console";

import * as Api from "/api.js";
// const Api = require("../api");

import {
  createOrderTable,
  createUserTable,
  createCategoryTable,
  createProductTable,
} from "./user-admin-module.js";

const mainTag = document.getElementById("main__container");
const ADMIN_URL = "/api/admin";

let categoryId;
let beforeValue;
let productId;

const adminBtnOrder = document.querySelector(".btn-admin__order");
const adminBtnUser = document.querySelector(".btn-admin__user");
const adminBtnCategory = document.querySelector(".btn-admin__category");
const adminBtnProduct = document.querySelector(".btn-admin__product");
const allBtns = [
  adminBtnOrder,
  adminBtnUser,
  adminBtnCategory,
  adminBtnProduct,
];

const orderAdmin = [
  "주문일자",
  "주문번호",
  "상품명",
  "총(원)",
  "주문자",
  "주문상태",
  "주문취소",
];
const userAdmin = ["가입날짜", "이메일", "이름", "주문내역", "회원삭제"];
const categoryAdmin = [
  "카테고리(대)",
  "카테고리(소)",
  "수정",
  "삭제",
];
const productAdmin = [
  "등록날짜",
  "상품명",
  "카테고리",
  "가격(원)",
  "재고수량(개)",
  "수정",
  "삭제",
];

const btnAddCategory = document.querySelector(".btn-add__category");
const btnAddProduct = document.querySelector(".btn-add__product");

function compareEnglish(lsName) {
  if (lsName === "주문관리") return "order__management";
  else if (lsName === "회원관리") return "user__management";
  else if (lsName === "카테고리관리") return "category__management";
  return "product__management";
}

for (let i = 0; i < allBtns.length; i++) {
  const listBtn = allBtns[i];
  listBtn.addEventListener("click", (element) => {
    element.preventDefault();
    //지금 table이 있는지 확인하고 있다면 다 지우기
    const currentTable = document.querySelector(".bd-example");
    if (currentTable) currentTable.remove();

    const listName = allBtns[i].innerText;
    const listNameEn = compareEnglish(listName);
    const newHtml = document.createElement("div");
    newHtml.className = `bd-example ${listNameEn}`;

    sessionStorage.setItem("key", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDQ4MTA2YmE1NDhhYjEzZWRmNTM2ZmYiLCJlbWFpbCI6ImFkbWluIiwiaWF0IjoxNjgyNDQ0NDExfQ.yl5S7x9f7R644xvT8NQpCwGt7opU0B7RbHmVRbg7P34")

    //주문관리 기능 구현
    if (listName === "주문관리") {
      btnAddCategory.style =
        "display:none";
      btnAddProduct.style =
        "display:none";

      // const ORDER_INFO_URL = "./example-data/order.json";

      Api.get(ADMIN_URL, "orders")
        // .then(async (res) => {
        //   const json = await res.json();

        //   if (res.ok) {
        //     return json;
        //   }

        //   return Promise.reject(json);
        // })
        .then((datas) => {
          const newDatas = datas.map((data) => {
            return {
              _id: data._id,
              orderNumber: data.orderNumber,
              // date: data.createdAt.slice(0, 10),
              date: data.date,
              name: data.buyer,
              // products: data.productList.map((data) => data.name),
              productList: data.productList,
              countList: data.countList,
              // total: Number(data.totalAmount).toLocaleString(),
              total: data.totalAmount,
              shippingStatus: data.shippingStatus,
            };
          });
          return newDatas.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
          });
        })
        .then((newDatas) => {
          newHtml.appendChild(createOrderTable(orderAdmin, newDatas));
          mainTag.append(newHtml);
        })
        .then(() => {
          orderManagementEdit();
          orderManagementDelete();
        })
        .catch((err) => alert(err));
    }

    //회원관리 기능구현
    else if (listName === "회원관리") {
      // console.log("회원관리 in 확인:",listName)
      document.querySelector(".btn-add__category").style =
        "display:none";
      document.querySelector(".btn-add__product").style =
        "display:none";
    
      // const USER_INFO_URL = "./example-data/user.json";

      
      Api.get(ADMIN_URL,"users")
        .then((datas) => {
          const newDatas = datas.map((data) => {
            return {
              _id: data._id,
              // date: data.createdAt.slice(0, 10),
              date: data.date,
              name: data.name,
              email: data.email,
              // orderList: data.orderList,
            };
          });
          // console.log("newDatas:", newDatas)
          return newDatas.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
          });
        })
        .then((newData) => {
          newHtml.appendChild(createUserTable(userAdmin, newData));
          mainTag.append(newHtml);
        })
        .then(() => {
          userOrderList();
          userManagementDelete();
        })
        .catch((err) => alert(err));

      


    } else if (listName === "카테고리관리") {
      //상품추가와 카테고리추가 없애기
      document.querySelector(".btn-add__category").style =
        "display:inline";
      document.querySelector(".btn-add__product").style =
        "display:none";

      // const CATEGORY_INFO_URL = "./example-data/category.json";

      Api.get("/api/category")
        .then((datas) => {
          const newDatas = datas.map((data) => {
            return {
              _id: data._id,
              name: data.name,
              subCategory: data.subCategory,
            };
          });
          return newDatas.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
          });
        })
        .then((newDatas) => {
          newHtml.appendChild(createCategoryTable(categoryAdmin, newDatas));
          mainTag.append(newHtml);
        })
        .then(() => {
          categoryManagementEdit();
          categoryManagementDelete();
        })
        .catch((err) => alert(err));

    } else if (listName === "상품관리") {
      //상품추가와 카테고리추가 없애기
      document.querySelector(".btn-add__category").style =
        "display:none";
      document.querySelector(".btn-add__product").style =
        "display:inline";

      // const PRODUCT_INFO_URL = "./example-data/product.json";

      const PRODUCT_URL = "/api/product";
      Api.get(PRODUCT_URL, "products")
        .then((datas) => {
          const newDatas = datas.map((data) => {
            return {
              _id: data._id,
              category: data.category,
              name: data.name,
              price: Number(data.price).toLocaleString(),
              stock: Number(data.stock).toLocaleString(),
            };
          });
          return newDatas.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
          });
        })
        .then((newDatas) => {
          newHtml.appendChild(createProductTable(productAdmin, newDatas));
          mainTag.append(newHtml);
        })
        .then(() => {
          productManagementEdit();
          productManagementDelete();
        })
        .catch((err) => alert(err));

      

      // async function getProductData() {
      //   try {
      //     const response1 = await fetch(PRODUCT_INFO_URL);
      //     const productInfoData = await response1.json();
          
      //     newHtml.appendChild(createProductTable(productAdmin, productInfoData));
      //     mainTag.append(newHtml)

      //     productManagementCreate()
      //     productManagementDelete()

      //   } catch(err) {  
      //     console.log(err)
      //   }
      // }

      // getProductData();
    }
  });
}
editSubmitCategory();
categoryManagementCreate();
editSubmitProduct();
productManagementCreate();

//============ 주문관련 =====================
function orderManagementEdit() {
  const editBtns = document.querySelectorAll(".dropdown-item");
  
  for (let count = 0; count < editBtns.length; count++) {
    editBtns[count].addEventListener("click", (e) => {
      e.preventDefault();
      // console.log(editBtns[count],"-clicked!")
      const btnValue = e.target.text;
      const btnId =
        e.target.parentElement.parentElement.parentElement.parentElement
          .parentElement.id;
      console.log("e.target.parentElement:", e.target.parentElement)
      console.log("e.target.parentElement.parentElement:", e.target.parentElement.parentElement)
      console.log("e.target.parentElement.parentElement.parentElement:", e.target.parentElement.parentElement.parentElement)
      console.log("e.target.parentElement.parentElement.parentElement.parentElement:", 
      e.target.parentElement.parentElement.parentElement.parentElement)
      console.log("e.target.parentElement.parentElement.parentElement.parentElement.parentElement:", 
      e.target.parentElement.parentElement.parentElement.parentElement.parentElement)
      console.log("btnId:",btnId)
      //배송상태가 바뀐 값(배송중 => 배송완료)으로 현재 버튼이 배송완료 바뀌는 기능
      e.target.parentElement.parentElement.parentElement.querySelector(
        "a"
      ).innerText = `${btnValue}`;
      fetch(`/api/orders/${btnId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          shippingStatus: `${btnValue}`,
        }),
      })
        .then(async (res) => {
          const json = await res.json();

          if (res.ok) {
            return json;
          }

          return Promise.reject(json);
        })
        .then((alt) =>
          alert(`배송상태가 "${alt.shippingStatus}"으로 변경되었습니다.`)
        )
        .catch((err) => alert(err));
    });
  }
}
function orderManagementDelete() {
  const deleteBtns = document.querySelectorAll(".btn__delete");
  for (let count = 0; count < deleteBtns.length; count++) {
    deleteBtns[count].addEventListener("click", (e) => {
      const conf = confirm("해당 주문건을 삭제하시겠습니까?");
      if (conf) {
        const btnId = e.target.parentElement.parentElement.id;
        document.getElementById(`${btnId}`).remove();
        fetch(`/api/orders/${btnId}`, {
          method: "DELETE",
        })
          .then(async (res) => {
            const json = await res.json();

            if (res.ok) {
              return json;
            }

            return Promise.reject(json);
          })
          .then((alt) => alert(alt))
          .catch((err) => alert(err));
      }
    });
  }
}

function userOrderList() {
  const showListBtns = document.querySelectorAll(".btn__show-list");
  for (let count = 0; count < showListBtns.length; count++) {
    showListBtns[count].addEventListener("click", (e) => {
      // const btnId = e.target.parentElement.parentElement.id;
      // console.log(document.getElementById(`${btnId}`))
      Api.get(ADMIN_URL,"users")
        // .then(async (res) => {
        //     const json = await res.json();

        //     if (res.ok) {
        //       return json;
        //     }

        //     return Promise.reject(json);
        // })
        .then((datas) => {
          const getName = datas.map(data => data.name);
          console.log(getName)
        })
        .catch((err) => alert(err));
    });
  }
}
function userManagementDelete() {
  const deleteBtns = document.querySelectorAll(".btn__delete");
  for (let count = 0; count < deleteBtns.length; count++) {
    deleteBtns[count].addEventListener("click", (e) => {
      const conf = confirm("해당 유저의 정보를 삭제하시겠습니까?");
      if (conf) {
        const btnId = e.target.parentElement.parentElement.id;
        document.getElementById(`${btnId}`).remove();
        fetch(`/api/users/${btnId}`, {
          method: "DELETE",
        })
          .then(async (res) => {
            const json = await res.json();

            if (res.ok) {
              return json;
            }

            return Promise.reject(json);
          })
          .then((idData) => alert(`${idData}이 삭제되었습니다.`))
          .catch((err) => alert(err));
      }
    });
  }
}

//============== 카테고리관련 ===============
function editSubmitCategory() {
  document
    .querySelector(".submit__edit__category")
    .addEventListener("click", (e) => {
      const newValue = document.getElementById("edit-category-name").value;
      fetch(`/api/categories/${categoryId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newValue.trim(),
        }),
      })
        .then(async (res) => {
          const json = await res.json();
          if (res.ok) {
            return json;
          }
          return Promise.reject(json);
        })
        .then((data) => {
          alert(`"${beforeValue}"이(가) "${data.name}" 으로 변경되었습니다.`);
          document.querySelector(".btn__admin__category").click();
          bootstrap.Modal.getInstance("#btn__admin__editCategory").hide();
        })
        .catch((err) => alert(err));
    });
}
function categoryManagementEdit() {
  const editCategoryBtns = document.querySelectorAll(
    ".btn__edit"
  );
  for (let count = 0; count < editCategoryBtns.length; count++) {
    editCategoryBtns[count].addEventListener("click", (e) => {
      beforeValue =
        document.querySelectorAll(".current__name")[count].innerText;
      categoryId = e.currentTarget.parentElement.parentElement.id;
      const inputCategoryName = document.getElementById("edit-category-name");
      inputCategoryName.value = beforeValue;
    });
  }
}
function categoryManagementCreate() {
  // const addCategoryBtn = document.querySelector(".submit__category");
  btnAddCategory.addEventListener("click", (e) => {
    //category-name
    fetch("/api/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: `${document.getElementById("category-name").value.trim()}`,
      }),
    })
      .then(async (res) => {
        const json = await res.json();
        if (res.ok) {
          return json;
        }
        return Promise.reject();
      })
      .then((data) => {
        const newData = {
          _id: data._id,
          date: data.createdAt.slice(0, 10),
          name: data.name,
          updateDate: data.updatedAt.slice(0, 10),
        };
        alert(`${newData.name} 이(가) 카테고리에 추가되었습니다.`);
        //모달숨기기
        document.getElementById("category-name").value = "";
        bootstrap.Modal.getInstance("#btn__admin__addCategory").hide();
        document.querySelector(".btn__admin__category").click();
      })
      .catch(() => alert("카테고리명을 입력해주세요"));
  });
}
function categoryManagementDelete() {
  const deleteBtns = document.querySelectorAll(".btn__delete");
  for (let count = 0; count < deleteBtns.length; count++) {
    deleteBtns[count].addEventListener("click", (e) => {
      const conf = confirm("해당 카테고리를 삭제하시겠습니까?");
      if (conf) {
        const btnId = e.target.parentElement.parentElement.id;
        document.getElementById(`${btnId}`).remove();
        fetch(`/api/categories/${btnId}`, {
          method: "DELETE",
        })
          .then(async (res) => {
            const json = await res.json();

            if (res.ok) {
              return json;
            }

            return Promise.reject(json);
          })
          .then((alt) => alert(alt))
          .catch((err) => alert(err));
      }
    });
  }
}
//============== 상품관련 ===============

function editSubmitProduct() {
  const submitBtns = document.querySelector(".submit__edit__product");
  const name = document.getElementById("edit-product-name");
  const category = document.getElementById("edit-product-category");
  const shortDesc = document.getElementById("edit-short-description");
  const longDesc = document.getElementById("edit-long-description");
  const imageFile = document.getElementById("edit-product-img");
  const stock = document.getElementById("edit-product-stock");
  const price = document.getElementById("edit-product-price");
  submitBtns.addEventListener("click", (e) => {
    const formData = new FormData();

    if (category.value === "카테고리를 선택하세요") {
      formData.append("category", "#전체");
    } else {
      formData.append("category", `#${category.value.trim()}`);
    }
    formData.append("name", name.value.trim());
    formData.append("shortDesc", shortDesc.value.trim());
    formData.append("longDesc", longDesc.value.trim());
    formData.append("productImage", imageFile.files[0]);
    formData.append("stock", stock.value.trim());
    formData.append("price", price.value.trim());

    fetch(`/api/products/${productId}`, {
      method: "PUT",
      body: formData,
      headers: {},
    })
      .then(async (res) => {
        const json = await res.json();
        if (res.ok) {
          return json;
        }
        return Promise.reject(json);
      })
      .then((data) => {
        alert(`${data.name} 의 정보가 변경되었습니다.`);
        //form 안의 input값 전부 초기화하기
        name.value = "";
        category.value = "";
        shortDesc.value = "";
        longDesc.value = "";
        imageFile.value = "";
        stock.value = "";
        price.value = "";
        bootstrap.Modal.getInstance("#btn__admin__editProduct").hide();
        document.querySelector(".btn__admin__product").click();
      })
      .catch((err) => alert(err));
  });
}
function productManagementEdit() {
  //카테고리의 리스트를 불러오는 작업
  const addCategoryList = document.querySelectorAll(
    ".btn__edit"
  );
  addCategoryList.forEach((editBtn) => {
    editBtn.addEventListener("click", (e) => {
      fetch("/api/categories")
        .then(async (res) => {
          const json = await res.json();

          if (res.ok) {
            return json;
          }

          return Promise.reject(json);
        })
        .then((datas) => {
          document.getElementById("edit-product-category").innerHTML = "";
          datas.forEach((element) => {
            document.getElementById("edit-product-category").innerHTML += `
        <option>${element.name}</option>`;
          });
        })
        .catch((err) => alert(err));
    });
  });

  //수정하기 모달창을 띄울 때 데이터에 맞게 모달창에 넣어주기
  const editProductBtns = document.querySelectorAll(
    ".btn__admin__editProduct"
  );
  const name = document.getElementById("edit-product-name");
  const category = document.getElementById("edit-product-category");
  const shortDesc = document.getElementById("edit-short-description");
  const longDesc = document.getElementById("edit-long-description");
  const stock = document.getElementById("edit-product-stock");
  const price = document.getElementById("edit-product-price");

  for (let count = 0; count < editProductBtns.length; count++) {
    editProductBtns[count].addEventListener("click", (e) => {
      productId = e.currentTarget.parentElement.parentElement.id;
      fetch(`/api/products/${productId}`)
        .then(async (res) => {
          const json = await res.json();

          if (res.ok) {
            return json;
          }

          return Promise.reject(json);
        })
        .then((newData) => {
          name.value = newData.name;
          //카테고리의 제일첫번째 데이터가 현재 데이터의 카테고리 표기가 되게 replace사용
          category.value = newData.category.replace("#", "");
          shortDesc.value = newData.shortDesc;
          longDesc.value = newData.longDesc;
          stock.value = newData.stock;
          price.value = newData.price;
        })
        .catch((err) => alert(err));
    });
  }
}
function productManagementCreate() {
  //카테고리의 리스트를 불러오는 작업
  // const addCategoryList = document.querySelector(".btn__admin__addProduct");
  btnAddCategory.addEventListener("click", (e) => {
    fetch("/api/categories")
      .then(async (res) => {
        const json = await res.json();

        if (res.ok) {
          return json;
        }

        return Promise.reject(json);
      })
      .then((datas) => {
        document.getElementById("create-product-category").innerHTML = "";
        datas.forEach((element) => {
          document.getElementById("create-product-category").innerHTML += `
        <option>${element.name}</option>`;
        });
      })
      .catch((err) => alert(err));
  });
  //추가하기 버튼을 클릭했을 때
  // const addProductBtn = document.querySelector(".submit__product");
  btnAddProduct.addEventListener("click", (e) => {
    const name = document.getElementById("create-product-name");
    const category = document.getElementById("create-product-category");
    const shortDesc = document.getElementById("create-short-description");
    const longDesc = document.getElementById("create-long-description");
    const imageFile = document.getElementById("create-product-img");
    const stock = document.getElementById("create-product-stock");
    const price = document.getElementById("create-product-price");

    const formData = new FormData();
    if (category.value === "카테고리를 선택하세요") {
      formData.append("category", "전체");
    } else {
      formData.append("category", category.value.trim());
    }
    formData.append("name", name.value.trim());
    formData.append("shortDesc", shortDesc.value.trim());
    formData.append("longDesc", longDesc.value.trim());
    formData.append("productImage", imageFile.files[0]);
    formData.append("stock", stock.value.trim());
    formData.append("price", price.value.trim());

    fetch("/api/products", {
      method: "POST",
      body: formData,
      headers: {},
    })
      .then(async (res) => {
        const json = await res.json();
        if (res.ok) {
          return json;
        }
        return Promise.reject(json);
      })
      .then((data) => {
        alert(`${data.name} 이(가) 상품에 추가되었습니다.`);
        //form 안의 input값 전부 초기화하기
        name.value = "";
        category.value = "";
        shortDesc.value = "";
        longDesc.value = "";
        imageFile.value = "";
        stock.value = "";
        price.value = "";

        bootstrap.Modal.getInstance("#btn__admin__addProduct").hide();
        document.querySelector(".btn__admin__product").click();
      })
      .catch((err) => alert(err));
  });
}
function productManagementDelete() {
  const deleteBtns = document.querySelectorAll(".btn__delete");
  for (let count = 0; count < deleteBtns.length; count++) {
    deleteBtns[count].addEventListener("click", (e) => {
      const conf = confirm("해당 상품의 정보를 삭제하시겠습니까?");
      if (conf) {
        const btnId = e.target.parentElement.parentElement.id;
        document.getElementById(`${btnId}`).remove();
        fetch(`/api/products/${btnId}`, {
          method: "DELETE",
        })
          .then(async (res) => {
            const json = await res.json();

            if (res.ok) {
              return json;
            }

            return Promise.reject(json);
          })
          .then((alt) => alert(alt))
          .catch((err) => alert(err));
      }
    });
  }
}
