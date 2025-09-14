// Global Variable
const rocket = document.getElementById("rocket");
const launchBtn = document.getElementById("launchBtn");
const resetBtn = document.getElementById("resetBtn");
const countdownDisplay = document.getElementById("countdown");
const sky = document.getElementById("sky");

// Helper Function
/**
 * Creates smoke under the rocket
 * @param {number} size - size of the smoke puff
 * @param {number} duration - how long it lasts
 */
function createSmoke(size, duration) {
  const smoke = document.createElement("div");
  smoke.classList.add("smoke");
  smoke.style.width = `${size}px`;
  smoke.style.height = `${size}px`;
  smoke.style.animationDuration = `${duration}s`;

  rocket.parentElement.appendChild(smoke);

  // Remove smoke after animation ends
  setTimeout(() => smoke.remove(), duration * 1000);
}

/**
 * @param {number} count - number of stars to create
 */
function createStars(count) {
  for (let i = 0; i < count; i++) {
    const star = document.createElement("div");
    star.classList.add("star");
    star.style.top = `${Math.random() * window.innerHeight}px`;
    star.style.left = `${Math.random() * window.innerWidth}px`;
    sky.appendChild(star);
  }
}

/**
 * countdown before launch
 * @param {number} seconds - countdown timer
 * @returns {Promises} - resolve when countdown finishes
 */
function startCountdown(seconds) {
  return new Promise((resolve) => {
    let current = seconds;

    const interval = setInterval(() => {
      countdownDisplay.textContent =
        current > 0 ? `T - ${current}` : "Liftoff! 🚀";
      current--;

      if (current < 0) {
        clearInterval(interval);
        resolve("Countdown Complete");
      }
    }, 1000);
  });
}

/**
 * Launches the rocket
 * @param {number} power - affects shake intensity and smoke
 * @param {number} delay - time before liftoff
 * @returns {string} - status message
 */
function launchRocket(power, delay) {
  rocket.classList.add("shake");

  // After delay, remove shake and launch
  setTimeout(() => {
    rocket.classList.remove("shake");
    rocket.classList.add("launch");

    // Show flame
    rocket.querySelector(".flame").style.display = "block";

    // Generate smoke during launch
    let smokeInterval = setInterval(
      () => createSmoke(20 + Math.random() * 20, 2),
      200
    );

    // Stop smoke after rocket leaves screen
    setTimeout(() => clearInterval(smokeInterval), 5000);

    // Transition to night sky
    sky.classList.add("night");
    createStars(50);
  }, delay * 1000);

  return "Rocket Launched!";
}

/* 
* Resets the rocket to initial state
*/

function resetRocket() {
  rocket.classList.remove("launch", "shake");
  rocket.style.bottom = "100px";
  rocket.querySelector(".flame").style.display = "none";
  countdownDisplay.textContent = "Ready for launch 🚀";

  // Remove stars
  document.querySelectorAll(".star").forEach((star) => star.remove());
  sky.classList.remove("night");
}

// Event listeners

// Start countdown and launch on click
launchBtn.addEventListener("click", async () => {
  launchBtn.disabled = true; // disable button during countdown
  await startCountdown(5); // 5 second countdown
  const status = launchRocket(5, 1); // Power=5, delay=1s
  console.log(status);
});

// Reset rocket
resetBtn.addEventListener("click", () => {
  resetRocket();
  launchBtn.disabled = false;
});