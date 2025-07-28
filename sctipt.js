document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('.screen img');
  const dots = document.querySelectorAll('.dot');
  let currentIndex = 0;
  
  // Автоперелистывание каждые 3 секунды
  setInterval(nextSlide, 3000);
  
  // Клик по точкам
  dots.forEach(dot => {
    dot.addEventListener('click', function() {
      currentIndex = parseInt(this.getAttribute('data-index'));
      updateSlider();
    });
  });
  
  // Свайп для мобилок
  const screen = document.querySelector('.screen');
  let touchStartX = 0;
  let touchEndX = 0;
  
  screen.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });
  
  screen.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });
  
  function handleSwipe() {
    if (touchEndX < touchStartX - 50) nextSlide();
    if (touchEndX > touchStartX + 50) prevSlide();
  }
  
  function nextSlide() {
    currentIndex = (currentIndex + 1) % images.length;
    updateSlider();
  }
  
  function prevSlide() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateSlider();
  }
  
  function updateSlider() {
    images.forEach(img => img.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    images[currentIndex].classList.add('active');
    dots[currentIndex].classList.add('active');
  }
});