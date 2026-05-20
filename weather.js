export function initWeather() {
  const apiKey = "a7e507503fea97437525b4bda3d2ed85"; // ⚠️ make sure this is valid

  const searchBtn = document.getElementById("search-btn");
  const cityInput = document.getElementById("city-input");

  // Display elements
  const cityName = document.getElementById("city-name");
  const temperature = document.getElementById("temperature");
  const SunriseTime = document.getElementById("SunriseTime");
  const SunsetTime = document.getElementById("SunsetTime");
  const description = document.getElementById("description");
  const humidity = document.getElementById("humidity");
  const windSpeed = document.getElementById("wind-speed");

  // ✅ Convert timestamp → readable time
  function formatTime(timestamp) {
    const date = new Date(timestamp * 1000); // convert seconds → ms

    let hours = date.getHours();
    let minutes = date.getMinutes();

    // optional AM/PM
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    minutes = minutes < 10 ? "0" + minutes : minutes;

    return `${hours}:${minutes} ${ampm}`;
  }

  // Event Listener
  searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();

    if (city === "") {
      alert("Please enter a city name");
      return;
    }

    getWeather(city);
  });

  // Fetch Weather Data
  async function getWeather(city) {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

      const response = await fetch(url);
      const data = await response.json();

      console.log(data); // 🔥 debug

      if (data.cod !== 200) {
        throw new Error(data.message);
      }

      // ✅ Update UI
      cityName.textContent = data.name;
      temperature.textContent = `Temperature: ${data.main.temp} °C`;
      description.textContent = `Condition: ${data.weather[0].description}`;
      humidity.textContent = `Humidity: ${data.main.humidity}%`;
      windSpeed.textContent = `Wind Speed: ${data.wind.speed} km/h`;

      // 🌅 Sunrise & Sunset
      const sunrise = formatTime(data.sys.sunrise);
      const sunset = formatTime(data.sys.sunset);

      SunriseTime.textContent = `Sunrise: ${sunrise}`;
      SunsetTime.textContent = `Sunset: ${sunset}`;
    } catch (error) {
      alert(error.message);
    }
  }
}
