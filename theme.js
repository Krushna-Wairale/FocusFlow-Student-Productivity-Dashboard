export function initThemeToggle() {
  // Get the toggle button
  const toggleBtn = document.getElementById("theme-toggle");

  // Load saved theme from localStorage
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    toggleBtn.textContent = "☀"; // sun for dark mode
  }

  // Click event to toggle theme
  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark");
      toggleBtn.textContent = "☀"; // sun icon
    } else {
      localStorage.setItem("theme", "light");
      toggleBtn.textContent = "🌙"; // moon icon
    }
  });
}
