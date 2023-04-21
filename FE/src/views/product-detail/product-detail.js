let amountCount = document.querySelector('.product-amount-count');
const plusBtn = document.querySelector('.count-btn-plus');
const minusBtn = document.querySelector('.count-btn-minus');

//증가
plusBtn.addEventListener('click', function(){
    amountCount.textContent = parseInt(amountCount.textContent) + 1;
});

//감소
minusBtn.addEventListener('click', function(){
    if(parseInt(amountCount.textContent) > 1) {
        amountCount.textContent = parseInt(amountCount.textContent) - 1;
    }
});
