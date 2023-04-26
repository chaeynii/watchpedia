// DOM

const btnAdminAddCategory = document.querySelector(".button-add__category");
const modal = document.querySelector(".modal");


// function
function showModal(){
    modal.classList += 'show';
}

//event
btnAdminAddCategory.addEventListener("click", showModal);