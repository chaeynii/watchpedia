let header = document.querySelector("header");
let nav = document.querySelector("nav");
let headerHeight = header.offsetHeight;

window.onscroll = function () {
    let windowTop = window.scrollY;
    if (windowTop > 195) {
        header.classList.add("drop"); 
        nav.classList.add("drop");
    } else {
        header.classList.remove("drop");
        nav.classList.remove("drop");
    }
};
