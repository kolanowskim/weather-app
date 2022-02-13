export function fetchAllData(lat, lng, name) {
  setCurrentCityName(name);

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${process.env.OPEN_WEATHER_API_KEY}`
  )
    .then((response) => response.json())
    .then((data) => {
      setCurrentWeather(data);
    })
    .catch((e) => console.log(e));

  fetch(
    `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lng}&appid=${process.env.OPEN_WEATHER_API_KEY}`
  )
    .then((response) => response.json())
    .then((data) => {
      setAQI(data);
    })
    .catch((e) => console.log(e));

  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=minutely,hourly&units=metric&appid=${process.env.OPEN_WEATHER_API_KEY}`
  )
    .then((response) => response.json())
    .then((data) => {
      createForecast(data);
    })
    .catch((e) => console.log(e));
}

function createForecast(data) {
  const forecast = document.getElementById("forecast");
  forecast.textContent = "";

  data.daily.forEach((value, index) => {
    let dayName;
    if (index == 0) {
      dayName = "Today";
    } else {
      dayName = new Date(value.dt * 1000).toLocaleDateString("en", {
        weekday: "long",
      });
    }

    const icon = value.weather[0].icon;
    const tempMin = Math.round(value.temp.min) + String.fromCharCode(176);
    const tempMax = Math.round(value.temp.max) + String.fromCharCode(176);

    const templateString = `<div class="forecast-day">
          <p>${dayName}</p>
          <img src="http://openweathermap.org/img/wn/${icon}@2x.png"/>
          <p class="forecast-day-temp">${tempMax} / ${tempMin}</p>
      </div>`;
    forecast.insertAdjacentHTML("beforeend", templateString);
  });
}

function setCurrentCityName(name) {
  const title = document.getElementById("title");
  title.textContent = name;
}

function setCurrentWeather(data) {
  const temperature = document.getElementById("weather-temperature");
  const icon = document.getElementById("weather-icon");
  const description = document.getElementById("weather-description");

  temperature.textContent =
    Math.round(data.main.temp) + String.fromCharCode(176);
  icon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  description.textContent = data.weather[0].description;
}

function setAQI(data) {
  const aqi = document.getElementById("weather-aqi");
  aqi.textContent = "AQI:  " + checkAirQuality(data.list[0].main.aqi);
}

function checkAirQuality(index) {
  switch (index) {
    case 1:
      return "Good";
    case 2:
      return "Fair";
    case 3:
      return "Moderate";
    case 4:
      return "Poor";
    case 5:
      return "Very Poor";
  }
}
