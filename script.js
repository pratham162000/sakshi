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

noBtn.addEventListener("mouseover", () => {
  attempts++;

  // Update text
  question.textContent = texts[Math.min(attempts - 1, texts.length - 1)];

  // Move button randomly and scale it (avoid overlapping YES button, constrained for mobile)
  const x =
    Math.random() > 0.5 ? Math.random() * 80 + 50 : -(Math.random() * 80 + 50);
  const y =
    Math.random() > 0.5 ? Math.random() * 80 + 50 : -(Math.random() * 80 + 50);
  const noScale = Math.max(0.3, 1 - attempts * 0.15);
  noBtn.style.transform = `translate(${x}px, ${y}px) scale(${noScale})`;

  // Grow YES and ensure it stays on top
  const yesScale = 1 + attempts * 0.15;
  yesBtn.style.transform = `scale(${yesScale})`;
  yesBtn.style.zIndex = "10";

  // make NO disappear
  if (attempts >= texts.length) {
    noBtn.style.display = "none";
    noBtn.style.pointerEvents = "none";
    question.textContent = "Okay okay 😌 Just press YES ❤️";
  }
});

yesBtn.addEventListener("click", () => {
  document.body.innerHTML = `
    <h1>Yayyyy 🎉🎉🎆🎆✨✨</h1>
    <p>Please text me back 👩‍💻👩‍💻😬</p>
  `;
});

console.log(texts.length);

// for mobile devices where hover is not possible
noBtn.addEventListener("touchstart", () => {
  attempts++;

  // Update text
  question.textContent = texts[Math.min(attempts - 1, texts.length - 1)];

  // Move button randomly and scale it (avoid overlapping YES button, constrained for mobile)
  const x =
    Math.random() > 0.5 ? Math.random() * 80 + 50 : -(Math.random() * 80 + 50);
  const y =
    Math.random() > 0.5 ? Math.random() * 80 + 50 : -(Math.random() * 80 + 50);
  const noScale = Math.max(0.3, 1 - attempts * 0.15);
  noBtn.style.transform = `translate(${x}px, ${y}px) scale(${noScale})`;

  // Grow YES and ensure it stays on top
  const yesScale = 1 + attempts * 0.15;
  yesBtn.style.transform = `scale(${yesScale})`;
  yesBtn.style.zIndex = "10";

  // Optional: make NO disappear
  if (attempts >= texts.length) {
    noBtn.style.display = "none";
    noBtn.style.pointerEvents = "none";
    question.textContent = "Okay okay 😌 Just press YES ❤️";
  }
});
