document.addEventListener('DOMContentLoaded', () => {
    const images = Array.from(document.querySelectorAll('.img-wrapper'));
    const overlay = document.querySelector('.overlay');
    const overlayImage = overlay.querySelector('.overlay-image');
    const overlayTitle = overlay.querySelector('.overlay-title');
    const overlayDescription = overlay.querySelector('.description-text');
    const prevBtn = overlay.querySelector('.prev-btn');
    const nextBtn = overlay.querySelector('.next-btn');
  
    let currentIndex = 0;
  
    // Function to update overlay content
    function updateOverlay(index) {
      const wrapper = images[index];
      overlayImage.src = wrapper.querySelector('img').src;
      overlayTitle.textContent = wrapper.dataset.title || '';
      overlayDescription.innerHTML = wrapper.dataset.description || 'No description available';
      currentIndex = index;
    }
  
    // Open overlay
    images.forEach((wrapper, index) => {
      wrapper.addEventListener('click', (e) => {
        e.preventDefault();
        updateOverlay(index);
        overlay.classList.add('active');
      });
    });
  
    // Close overlay
    overlay.addEventListener('click', (e) => {
      if (e.target.classList.contains('overlay') || e.target.classList.contains('close-btn')) {
        overlay.classList.remove('active');
  
        // Wait for the transition to complete before resetting content
        setTimeout(() => {
          overlayImage.src = '';
          overlayTitle.textContent = '';
          overlayDescription.textContent = '';
        }, 300); // Match the transition duration
      }
    });
  
    // Previous button
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent closing the overlay
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateOverlay(currentIndex);
    });
  
    // Next button
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent closing the overlay
      currentIndex = (currentIndex + 1) % images.length;
      updateOverlay(currentIndex);
    });
  
    // Optional: Keyboard navigation for desktop
    document.addEventListener('keydown', (e) => {
      if (overlay.classList.contains('active')) {
        if (e.key === 'ArrowLeft') {
          // Previous image
          currentIndex = (currentIndex - 1 + images.length) % images.length;
          updateOverlay(currentIndex);
        } else if (e.key === 'ArrowRight') {
          // Next image
          currentIndex = (currentIndex + 1) % images.length;
          updateOverlay(currentIndex);
        }
      }
    });
  });