    // Get the audio element
    const audio = document.getElementById('backgroundMusic');

    // Function to play audio
    function playSong() {
      audio.play().catch(err => console.log("Error playing the song:", err));
    }

    // Event listener for click
    document.addEventListener('click', playSong);
    document.addEventListener('touchstart', playSong);

if (sessionStorage.getItem('refreshed')) {
  // If the page was refreshed, redirect to index.html
  window.location.href = 'index.html';
} else {
  // Mark that the page has been refreshed
  sessionStorage.setItem('refreshed', 'true');
}

    
let highestZ = 1;

class Paper {
  holdingPaper = false;
  mouseX = 0;
  mouseY = 0;
  touchX = 0;
  touchY = 0;
  prevMouseX = 0;
  prevMouseY = 0;
  prevTouchX = 0;
  prevTouchY = 0;
  velX = 0;
  velY = 0;
  currentPaperX = 0;
  currentPaperY = 0;
  rotating = false;

  // Initialize event listeners for mouse and touch
  init(paper) {
    // Mouse events
    paper.addEventListener('mousedown', (e) => {
      if (this.holdingPaper) return;

      this.holdingPaper = true;

      // Bring paper to the front
      paper.style.zIndex = highestZ;
      highestZ += 1;

      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
      this.prevMouseX = this.mouseX;
      this.prevMouseY = this.mouseY;
    });

    document.addEventListener('mousemove', (e) => {
      if (!this.holdingPaper) return;

      // Calculate velocity and update position for mouse
      this.velX = e.clientX - this.prevMouseX;
      this.velY = e.clientY - this.prevMouseY;

      this.currentPaperX += this.velX;
      this.currentPaperY += this.velY;

      paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px)`;

      this.prevMouseX = e.clientX;
      this.prevMouseY = e.clientY;
    });

    document.addEventListener('mouseup', () => {
      this.holdingPaper = false;
    });

    // Touch events
    paper.addEventListener('touchstart', (e) => {
      if (this.holdingPaper) return;

      this.holdingPaper = true;

      // Bring paper to the front
      paper.style.zIndex = highestZ;
      highestZ += 1;

      const touch = e.touches[0];
      this.touchX = touch.clientX;
      this.touchY = touch.clientY;
      this.prevTouchX = this.touchX;
      this.prevTouchY = this.touchY;
    });

    document.addEventListener('touchmove', (e) => {
      if (!this.holdingPaper) return;

      const touch = e.touches[0];

      // Calculate velocity and update position for touch
      this.velX = touch.clientX - this.prevTouchX;
      this.velY = touch.clientY - this.prevTouchY;

      this.currentPaperX += this.velX;
      this.currentPaperY += this.velY;

      paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px)`;

      this.prevTouchX = touch.clientX;
      this.prevTouchY = touch.clientY;
    });

    document.addEventListener('touchend', () => {
      this.holdingPaper = false;
    });
  }
}

const papers = Array.from(document.querySelectorAll('.paper'));

papers.forEach(paper => {
  const p = new Paper();
  p.init(paper);
});
