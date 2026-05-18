let attempts = 0;

const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const question = document.getElementById("question");

const texts = [
  "Why are you like this? 😭",
  "Stop playing 💔",
  "You know you want to say yes 😏",
  "I'm begging you now 🥺",
  "I'm not going to stop until you say YES 😌",
  "Last chance!",
  "Come ooooon 😩",
  "Just one little yes 🥺👉👈",
  "NO is not an option anymore 😌",
];

// Function to move the NO button (used by both hover and touch)
function moveNoButton() {
  attempts++;

  // Update text
  question.textContent = texts[Math.min(attempts - 1, texts.length - 1)];

  // Get viewport dimensions
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  
  // Get button dimensions
  const noBtnRect = noBtn.getBoundingClientRect();
  const yesBtnRect = yesBtn.getBoundingClientRect();
  
  // Calculate safe movement range (smaller on mobile)
  const isMobile = viewportWidth < 768;
  const maxMoveX = isMobile ? 60 : 100;
  const maxMoveY = isMobile ? 60 : 100;
  
  let x, y, isOverlapping;
  let attempts_to_find_position = 0;
  const maxAttempts = 20;

  // Keep trying to find a position that doesn't overlap with YES button
  do {
    x = Math.random() > 0.5 
      ? Math.random() * maxMoveX + 30 
      : -(Math.random() * maxMoveX + 30);
    y = Math.random() > 0.5 
      ? Math.random() * maxMoveY + 30 
      : -(Math.random() * maxMoveY + 30);
    
    // Calculate new position
    const newLeft = noBtnRect.left + x;
    const newTop = noBtnRect.top + y;
    const newRight = newLeft + noBtnRect.width;
    const newBottom = newTop + noBtnRect.height;
    
    // Check if overlapping with YES button (with padding)
    const padding = 20;
    isOverlapping = !(
      newRight + padding < yesBtnRect.left ||
      newLeft - padding > yesBtnRect.right ||
      newBottom + padding < yesBtnRect.top ||
      newTop - padding > yesBtnRect.bottom
    );
    
    attempts_to_find_position++;
  } while (isOverlapping && attempts_to_find_position < maxAttempts);

  // Scale down NO button
  const noScale = Math.max(0.3, 1 - attempts * 0.15);
  noBtn.style.transform = `translate(${x}px, ${y}px) scale(${noScale})`;
  noBtn.style.zIndex = "5"; // Lower than YES button

  // Grow YES button and keep it on top
  const yesScale = 1 + attempts * 0.12;
  yesBtn.style.transform = `scale(${yesScale})`;
  yesBtn.style.zIndex = "10";
  yesBtn.style.position = "relative";

  // Make NO disappear after all attempts
  if (attempts >= texts.length) {
    noBtn.style.display = "none";
    noBtn.style.pointerEvents = "none";
    question.textContent = "Okay okay 😌 Just press YES ❤️";
  }
}

// Desktop: mouseover
noBtn.addEventListener("mouseover", moveNoButton);

// Mobile: touchstart
noBtn.addEventListener("touchstart", (e) => {
  e.preventDefault(); // Prevent default touch behavior
  moveNoButton();
});

// YES button click handler
yesBtn.addEventListener("click", () => {
  document.body.innerHTML = `
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      .success-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        width: 100vw;
        text-align: center;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        background-image: 
          linear-gradient(135deg, rgba(102, 126, 234, 0.95) 0%, rgba(118, 75, 162, 0.95) 100%),
          url('https://images.unsplash.com/photo-1557683316-973673baf926?w=1600&q=80');
        background-size: cover;
        background-position: center;
        color: white;
        padding: 30px 20px;
        font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        overflow: hidden;
      }
      
      .success-content {
        max-width: 600px;
        width: 100%;
      }
      
      .success-container h1 {
        font-size: clamp(32px, 10vw, 56px);
        font-weight: 700;
        margin-bottom: 60px;
        line-height: 1.2;
        animation: bounce 1s ease;
        text-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      }
      
      .success-container h2 {
        font-size: clamp(20px, 6vw, 32px);
        font-weight: 500;
        line-height: 1.4;
        animation: fadeInUp 1s ease 0.3s both;
        text-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      }
      
      @keyframes bounce {
        0%, 100% { 
          transform: translateY(0); 
          opacity: 1;
        }
        50% { 
          transform: translateY(-25px); 
        }
        0% {
          opacity: 0;
          transform: translateY(30px);
        }
      }
      
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      /* Mobile adjustments */
      @media (max-width: 480px) {
        .success-container {
          padding: 20px 15px;
        }
        
        .success-container h1 {
          margin-bottom: 50px;
        }
      }
      
      /* Landscape mode */
      @media (max-height: 500px) and (orientation: landscape) {
        .success-container {
          padding: 15px;
        }
        
        .success-container h1 {
          margin-bottom: 30px;
          font-size: clamp(24px, 8vw, 40px);
        }
        
        .success-container h2 {
          font-size: clamp(16px, 5vw, 24px);
        }
      }
    </style>
    <div class="success-container">
      <div class="success-content">
        <h1>Yayyyy 🎉🎉🎆🎆✨✨</h1>
        <h2>Please text me back 👩‍💻👩‍💻😬</h2>
      </div>
    </div>
  `;
});

console.log("Total messages:", texts.length);
