const alert = {
    frame: document.querySelector('#alert'),
    quantity: document.querySelector('#quantity'),
    price: document.querySelector('#alert-total-price'),
    button: document.querySelector('#add-cart-button')
};

window.addEventListener('load', () => {
    alert.frame.style.visibility = 'hidden';
});

let price = 0;
let originalPrice = 149.99;
let total = 0;

alert.button.addEventListener('click', () => {
    alert.frame.style.visibility = 'visible';
    alert.quantity.innerHTML = ++price;
    total += originalPrice;
    alert.price.innerHTML = total.toFixed(2);
    playSound();
});

// Sound Effect by <a href="https://pixabay.com/users/rasoolasaad-47313572/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=316482">Rasool Asaad</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=316482">Pixabay</a>
function playSound() {
    try {
        const sound = new Audio('asset/ui-pop.mp3');
        sound.currentTime = 0;
        sound.play();
    } catch (e) {
        console.log(e);
    }
}