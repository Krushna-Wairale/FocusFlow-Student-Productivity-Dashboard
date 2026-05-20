// ----------------------------------------------------
// EXPORT FUNCTION
// Allows main script.js to start the stopwatch module
//   ----------------------------------------------------
export function initTimer() {
  // ------------------------------
  // GET HTML ELEMENTS
  // ------------------------------

  const display = document.getElementById("stopwatch-display");
  const startBtn = document.getElementById("start-stopwatch");
  const stopBtn = document.getElementById("stop-stopwatch");
  const resetBtn = document.getElementById("reset-stopwatch");

  // ------------------------------
  // STOPWATCH VARIABLES
  // ------------------------------

  let seconds = 0; // total seconds counted
  let interval = null; // stores setInterval ID

  // ------------------------------
  // UPDATE DISPLAY FUNCTION
  // Converts seconds → HH:MM:SS
  // ------------------------------

  function updateDisplay() {
    let hrs = Math.floor(seconds / 3600);
    let mins = Math.floor((seconds % 3600) / 60);
    let secs = seconds % 60;

    // Add leading zero if number < 10
    hrs = hrs < 10 ? "0" + hrs : hrs;
    mins = mins < 10 ? "0" + mins : mins;
    secs = secs < 10 ? "0" + secs : secs;

    display.textContent = `${hrs}:${mins}:${secs}`;
  }

  // ------------------------------
  // START BUTTON FUNCTIONALITY
  // ------------------------------

  startBtn.addEventListener("click", () => {
    // Prevent multiple intervals running
    if (interval !== null) return;

    interval = setInterval(() => {
      seconds++; // increase time
      updateDisplay(); // update UI
    }, 1000); // runs every 1 second
  });

  // ------------------------------
  // STOP BUTTON FUNCTIONALITY
  // ------------------------------

  stopBtn.addEventListener("click", () => {
    clearInterval(interval); // stop interval
    interval = null;
  });

  // ------------------------------
  // RESET BUTTON FUNCTIONALITY
  // ------------------------------

  resetBtn.addEventListener("click", () => {
    clearInterval(interval); // stop timer
    interval = null;

    seconds = 0; // reset time
    updateDisplay(); // update UI
  });

  // ------------------------------
  // INITIAL DISPLAY
  // ------------------------------

  updateDisplay();
}
