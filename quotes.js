export function initQuote() {
  const quoteBtn = document.getElementById("quote-btn");
  const quoteText = document.getElementById("quote-text");
  const quoteAuthor = document.getElementById("quote-author");

  quoteBtn.addEventListener("click", async () => {
    try {
      const response = await fetch("https://dummyjson.com/quotes/random");
      const data = await response.json();

      console.log(data); // debug

      quoteText.textContent = `"${data.quote}"`;
      quoteAuthor.textContent = `-By ${data.author}`;
    } catch (err) {
      quoteText.textContent = "Failed to load quote";
      quoteAuthor.textContent = "";
    }
  });
}
