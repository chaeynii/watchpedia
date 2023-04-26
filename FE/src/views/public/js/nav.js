//스크롤 이벤트
const header = document.querySelector("header");
const nav = document.querySelector("nav");
let headerHeight = header.offsetHeight;

window.onscroll = function () {
    let windowTop = window.scrollY;
    if (windowTop > 195) {
        header.classList.add("drop"); 
        nav.classList.add("drop");
    } else {
        header.classList.toggle("drop", windowTop !== 0);
        nav.classList.toggle("drop", windowTop !== 0);
    }
};