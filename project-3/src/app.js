const card = {
    payment : document.querySelector('#payment'),
    //card area
    toggle : document.querySelector('#toggle-change'),
    planTypeHeading: document.querySelector('.music-plan-type'),
    planTypePrice: document.querySelector('.music-plan-pricing'),

    //toggled frame
    planTypeFrame : document.querySelector('#change'),
    changeTypesHeading : document.querySelectorAll('.change-types-heading'),
    changeTypePrice : document.querySelectorAll('.change-type-price'),
    selectBtn : document.querySelectorAll('.plan-select'),
}

card.payment.addEventListener('click', () =>{
    window.location.href = 'orderplaced.html';
});

card.toggle.addEventListener('click', () => {
    card.planTypeFrame.style.display = 'flex';
});

let elementAtt = "";
function getBtnIdOnClick() {
    card.selectBtn.forEach(element => {
        element.addEventListener('click', () => {
            elementAtt = element.getAttribute('id');
            matchBtnIdToPlans();
            card.planTypeFrame.style.display = 'none';
        });
    });
}

function matchBtnIdToPlans() {   
    switch (elementAtt) {
        case 'monthly':
            card.planTypeHeading.innerHTML = card.changeTypesHeading[0].textContent;
            card.planTypePrice.innerHTML = card.changeTypePrice[0].textContent;
            break;
        case 'family':
            card.planTypeHeading.innerHTML = card.changeTypesHeading[1].textContent;
            card.planTypePrice.innerHTML = card.changeTypePrice[1].textContent;
            break;
        case 'student':
            card.planTypeHeading.innerHTML = card.changeTypesHeading[2].textContent;
            card.planTypePrice.innerHTML = card.changeTypePrice[2].textContent;
            break;
        case 'duo':
            card.planTypeHeading.innerHTML = card.changeTypesHeading[3].textContent;
            card.planTypePrice.innerHTML = card.changeTypePrice[3].textContent;
            break;
        case 'lifetime':
            card.planTypeHeading.innerHTML = card.changeTypesHeading[4].textContent;
            card.planTypePrice.innerHTML = card.changeTypePrice[4].textContent;
            break;
    }
}

getBtnIdOnClick();