function createTop(listArr) {
    const top = document.createElement("thead");
    top.className = "table-light";
    const tr = document.createElement("tr");
    const addHtml = [];
    for (let count = 0; count < listArr.length; count++) {
      addHtml.push(`
      <th scope="col">
        ${listArr[count]}
      </th>`);
    }
    tr.innerHTML += addHtml.join("");
    top.prepend(tr);
    return top;
  }
  
  function createOrderMiddle(dataArr) {
    console.log("createOrderMiddle 실행")
    const middle = document.createElement("tbody");
    const addHtml = [];
    console.log(dataArr.length)
    for (let count = 0; count < dataArr.length; count++) {
      addHtml.push(
        `<tr id="${dataArr[count]._id}">
            <th scope="row">
              ${dataArr[count].date}
            </th>
            <td>
              ${dataArr[count].orderNumber}
            </td>
            <td>
              ${dataArr[count].name}
            </td>
            <td>
              ${dataArr[count].products.join(",<br>")}
            </td>
            <td>
              ${dataArr[count].total}
            </td>
            <td>
              <div class="dropdown">
                <a class="btn btn-outline-secondary dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  ${dataArr[count].shopStatus}
                </a>
                <ul class="dropdown-menu btn__edit">
                  <li><a class="dropdown-item">배송전</a></li>
                  <li><a class="dropdown-item">배송중</a></li>
                  <li><a class="dropdown-item">배송완료</a></li>
                  <li><a class="dropdown-item">취소완료</a></li>
                </ul>
              </div>
            </td>
            <td>
              <button type="button" class="btn btn-outline-danger btn__delete">주문취소</button>
            </td>
          </tr>`
      );
    }
    middle.innerHTML += addHtml.join("");
    return middle;
  }
  
  function createOrderTable(listArr, datasArr) {
    //datas 는 필요한 데이터만 받아온 객체들의 배열
    const table = document.createElement("table");
    table.className = "table text-center";
    table.prepend(createTop(listArr));
    table.append(createOrderMiddle(datasArr));
    return table;
  }
  
  function createUserTable(listArr, datasArr) {
    //datas 는 필요한 데이터만 받아온 객체들의 배열
    const table = document.createElement("table");
    table.className = "table text-center";
    table.prepend(createTop(listArr));
    table.append(createUserMiddle(datasArr));
    return table;
  }
  
  function createUserMiddle(dataArr) {
    console.log("createUserMiddle 실행")
    const middle = document.createElement("tbody");
    const addHtml = [];
    for (let count = 0; count < dataArr.length; count++) {
      addHtml.push(
        `<tr id="${dataArr[count]._id}">
            <th scope="row">
              ${dataArr[count].date}
            </th>
            <td>
              ${dataArr[count].email}
            </td>
            <td>
              ${dataArr[count].name}
            </td>
            <td>
              <button type="button" class="btn btn-outline btn__show-list">조회</button>
            </td>
            <td>
              <button type="button" class="btn btn-outline-danger btn__delete">회원삭제</button>
            </td>
          </tr>`
      );
    }
    middle.innerHTML += addHtml.join("");
    return middle;
  }
  
  function createCategoryMiddle(dataArr) {
    const middle = document.createElement("tbody");
    const addHtml = [];
    for (let count = 0; count < dataArr.length; count++) {
      addHtml.push(
        `<tr id="${dataArr[count]._id}">
            <td class="current__name">
              ${dataArr[count].name}
            </td>
            <td class="current__name">
              ${dataArr[count].subCategory}
            </td>
            <td>
            <button type="button" class="btn btn-outline-primary ms-auto p-2 bd-highlight btn__edit" data-bs-toggle="modal"
        data-bs-target="#btn__admin__editCategory">수정</button>
            </td>
            <td>
              <button type="button" class="btn btn-outline-danger btn__delete">삭제</button>
            </td>
          </tr>`
      );
    }
    middle.innerHTML += addHtml.join("");
    return middle;
  }
  
  function createCategoryTable(listArr, datasArr) {
    //datas 는 필요한 데이터만 받아온 객체들의 배열
    const table = document.createElement("table");
    table.className = "table text-center";
    table.prepend(createTop(listArr));
    table.append(createCategoryMiddle(datasArr));
    return table;
  }
  
  function createProductMiddle(dataArr) {
    const middle = document.createElement("tbody");
    const addHtml = [];
    for (let count = 0; count < dataArr.length; count++) {
      addHtml.push(
        `<tr id="${dataArr[count]._id}">
            <th scope="row">
              ${dataArr[count].date}
            </th>
            <td class="current__name">
              ${dataArr[count].name}
            </td>
            <td>
              ${dataArr[count].category}
            </td>
            <td>
              ${dataArr[count].price}
            </td>
            <td>
              ${dataArr[count].stock}
            </td>
            <td>
            <button type="button" class="btn btn-outline-primary ms-auto p-2 bd-highlight btn__edit" data-bs-toggle="modal"
        data-bs-target="#btn__admin__editProduct">수정</button>
            </td>
            <td>
              <button type="button" class="btn btn-outline-danger btn__delete">삭제</button>
            </td>
          </tr>`
      );
    }
    middle.innerHTML += addHtml.join("");
    return middle;
  }
  
  function createProductTable(listArr, datasArr) {
    //datas 는 필요한 데이터만 받아온 객체들의 배열
    const table = document.createElement("table");
    table.className = "table text-center";
    table.prepend(createTop(listArr));
    table.append(createProductMiddle(datasArr));
    return table;
  }
  
  export {
    createOrderTable,
    createUserTable,
    createCategoryTable,
    createProductTable,
  };
  