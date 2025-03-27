const card = {
    frame  : document.querySelector('.qr'),
    qrCode : document.querySelector('.qr-fig img')
}

// add pulsing glow to card.frame
addPulsingGlow(card.frame, '#90e0ef', '5px', '13px', 1.3);

// copy url link when image is clicked
card.qrCode.addEventListener('click', () => {
    const url = 'https://www.frontendmentor.io/';
    navigator.clipboard.writeText(url).then( () => {
        alert('URl copied to clipboard successfully.');
    }).catch(err => {
        console.error('Failed to copy text: ' + err);
    })
});



// glow effect
function addPulsingGlow(element, color = '#e63946', minSize = '5px', maxSize = '15px', speed = 2) {
    let growing = true;
    let currentSize = parseFloat(minSize);
    
    function animateGlow() {
      if (growing) {
        currentSize += 0.1 * speed;
        if (currentSize >= parseFloat(maxSize)) growing = false;
      } else {
        currentSize -= 0.1 * speed;
        if (currentSize <= parseFloat(minSize)) growing = true;
      }
      
      element.style.boxShadow = `0 0 ${currentSize * 2}px ${currentSize}px ${color}`;
      requestAnimationFrame(animateGlow);
    }
    
    animateGlow();
    return () => cancelAnimationFrame(animateGlow); // Returns cleanup function
  }