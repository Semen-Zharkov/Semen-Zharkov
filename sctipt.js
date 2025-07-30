document.addEventListener('DOMContentLoaded', function() {
  const screenCasts = document.querySelectorAll('.mobile-screencast');
  
  screenCasts.forEach(screenCast => {
    const images = screenCast.querySelectorAll('.screen img');
    const dots = screenCast.querySelectorAll('.dot');
    let currentIndex = 0;
    let intervalId;
    
    // Функция для запуска автоперелистывания
    function startAutoSlide() {
      intervalId = setInterval(nextSlide, 4000);
    }
    
    // Функция для остановки автоперелистывания (например, при взаимодействии пользователя)
    function stopAutoSlide() {
      clearInterval(intervalId);
    }
    
    // Инициализация слайдера
    function initSlider() {
      if (images.length > 0) {
        updateSlider();
        startAutoSlide();
        
        // Добавляем обработчики событий для точек
        dots.forEach(dot => {
          dot.addEventListener('click', function() {
            currentIndex = parseInt(this.getAttribute('data-index'));
            updateSlider();
            stopAutoSlide();
            startAutoSlide();
          });
        });
        
        // Добавляем обработчики свайпа
        const screen = screenCast.querySelector('.screen');
        let touchStartX = 0;
        let touchEndX = 0;
        
        screen.addEventListener('touchstart', (e) => {
          touchStartX = e.changedTouches[0].screenX;
          stopAutoSlide();
        });
        
        screen.addEventListener('touchend', (e) => {
          touchEndX = e.changedTouches[0].screenX;
          handleSwipe();
          startAutoSlide();
        });
        
        function handleSwipe() {
          if (touchEndX < touchStartX - 50) nextSlide();
          if (touchEndX > touchStartX + 50) prevSlide();
        }
      }
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
      
      if (images[currentIndex]) images[currentIndex].classList.add('active');
      if (dots[currentIndex]) dots[currentIndex].classList.add('active');
    }
    
    // Инициализируем слайдер
    initSlider();
  });
});