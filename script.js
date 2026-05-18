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
  
  // Calculate safe movement range (MUCH smaller on mobile)
  const isMobile = viewportWidth < 768;
  const maxMoveX = isMobile ? 40 : 100;  // Reduced from 60 to 40
  const maxMoveY = isMobile ? 50 : 100;  // Reduced from 60 to 50
  
  let x, y, isOverlapping;
  let attempts_to_find_position = 0;
  const maxAttempts = 30;  // Increased from 20 to 30

  // Keep trying to find a position that doesn't overlap with YES button
  do {
    x = Math.random() > 0.5 
      ? Math.random() * maxMoveX + 20 
      : -(Math.random() * maxMoveX + 20);
    y = Math.random() > 0.5 
      ? Math.random() * maxMoveY + 30 
      : -(Math.random() * maxMoveY + 30);
    
    // Calculate new position
    const newLeft = noBtnRect.left + x;
    const newTop = noBtnRect.top + y;
    const newRight = newLeft + noBtnRect.width * (1 - attempts * 0.15);
    const newBottom = newTop + noBtnRect.height * (1 - attempts * 0.15);
    
    // Check if overlapping with YES button (with MORE padding on mobile)
    const padding = isMobile ? 40 : 20;  // Increased padding for mobile
    isOverlapping = !(
      newRight + padding < yesBtnRect.left ||
      newLeft - padding > yesBtnRect.right ||
      newBottom + padding < yesBtnRect.top ||
      newTop - padding > yesBtnRect.bottom
    );
    
    attempts_to_find_position++;
  } while (isOverlapping && attempts_to_find_position < maxAttempts);

  // Scale down NO button
  const noScale = Math.max(0.4, 1 - attempts * 0.12);  // Changed from 0.3 to 0.4
  noBtn.style.transform = `translate(${x}px, ${y}px) scale(${noScale})`;
  noBtn.style.zIndex = "5";

  // Grow YES button (LIMITED growth on mobile)
  const maxYesScale = isMobile ? 1.5 : 2.5;  // Max 1.5x on mobile, 2.5x on desktop
  const yesScale = Math.min(maxYesScale, 1 + attempts * 0.08);  // Reduced from 0.12 to 0.08
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
  e.preventDefault();
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
      
      html, body {
        width: 100%;
        height: 100%;
        overflow-x: hidden;
      }
      
      .success-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        min-height: -webkit-fill-available;
        width: 100%;
        text-align: center;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        background-image: 
          linear-gradient(135deg, rgba(102, 126, 234, 0.95) 0%, rgba(118, 75, 162, 0.95) 100%),
          url('https://images.unsplash.com/photo-1557683316-973673baf926?w=1600&q=80');
        background-size: cover;
        background-position: center;
        background-attachment: fixed;
        color: white;
        padding: 20px;
        font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      }
      
      .success-content {
        max-width: 90%;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      
      .success-container h1 {
        font-size: clamp(28px, 8vw, 56px);
        font-weight: 700;
        margin: 0 0 40px 0;
        line-height: 1.3;
        animation: bounce 1s ease;
        text-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        text-align: center;
        width: 100%;
        word-wrap: break-word;
      }
      
      .success-container h2 {
        font-size: clamp(18px, 5vw, 32px);
        font-weight: 500;
        margin: 0;
        line-height: 1.4;
        animation: fadeInUp 1s ease 0.3s both;
        text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        text-align: center;
        width: 100%;
        word-wrap: break-word;
      }
      
      @keyframes bounce {
        0% { 
          opacity: 0;
          transform: translateY(30px);
        }
        50% { 
          transform: translateY(-20px); 
        }
        100% { 
          transform: translateY(0); 
          opacity: 1;
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
      
      /* Mobile specific */
      @media (max-width: 480px) {
        .success-container {
          padding: 15px;
          background-attachment: scroll;
        }
        
        .success-content {
          max-width: 95%;
        }
        
        .success-container h1 {
          margin-bottom: 30px;
          font-size: clamp(24px, 7vw, 40px);
        }
        
        .success-container h2 {
          font-size: clamp(16px, 4.5vw, 28px);
        }
      }
      
      /* Very small phones */
      @media (max-width: 360px) {
        .success-container h1 {
          font-size: 22px;
          margin-bottom: 25px;
        }
        
        .success-container h2 {
          font-size: 15px;
        }
      }
      
      /* Landscape mode */
      @media (max-height: 500px) and (orientation: landscape) {
        .success-container {
          padding: 10px;
          min-height: 100vh;
        }
        
        .success-container h1 {
          margin-bottom: 20px;
          font-size: clamp(20px, 6vw, 36px);
        }
        
        .success-container h2 {
          font-size: clamp(14px, 4vw, 24px);
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
