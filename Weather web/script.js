document.addEventListener("DOMContentLoaded", function () {
  const cityInput = document.getElementById("cityInput");
  const getWeatherBtn = document.getElementById("getWeatherBtn");
  const weatherInfo = document.querySelector(".weather-info");

  getWeatherBtn.addEventListener("click", async function () {
    const city = cityInput.value;
    if (city === "") return;

    const apiKey = "344c0e548e9519cb2f14a95f3d014937";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      const location = `${data.name}, ${data.sys.country}`;
      const temperature = `${data.main.temp.toFixed(1)}°C`;
      const conditions = data.weather[0].description;

      document.querySelector(".location").textContent = location;
      document.querySelector(".temperature").textContent = temperature;
      document.querySelector(".conditions").textContent = conditions;

      weatherInfo.style.display = "block";
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  });
});
