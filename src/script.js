// Current day and time

function currentDate() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let now = new Date();
  let day = days[now.getDay()];
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let currentDate = document.querySelector("#day-today");
  currentDate.innerHTML = `${day} ${hours}:${minutes}`;
}
currentDate();

function formatDay(timestamp) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let data = new Date(timestamp * 1000);
  let day = days[data.getDay()];

  return day;
}

function displayForecast(response) {
  console.log(response.data);
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      let max = Math.round(forecastDay.temp.max);
      let min = Math.round(forecastDay.temp.min);

      forecastHTML =
        forecastHTML +
        `
    <div class="col-2">
      <div class="weather-forcast-day">${formatDay(
        forecastDay.dt
      )}</div>             
        <img src="http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png" alt="" width="48"/>
            <div class="weather-forcast-temperature">
              <span class="weather-forcast-temperature-max">${max}°</span>
              <span class="weather-forcast-temperature-min">${min}°</span>
            </div>
    </div>
    `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coodinates) {
  let key = "b9e5645fd345ccef8ad19143373284ef";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coodinates.lat}&lon=${coodinates.lon}&appid=${key}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showWeather(response) {
  let city = document.querySelector("#searching-city");
  city.innerHTML = response.data.name;
  let country = document.querySelector("#searching-country");
  country.innerHTML = `, ${response.data.sys.country}`;
  let currentTemperature = document.querySelector("#temperature");
  celciuseTemperature = response.data.main.temp;
  let temperature = Math.round(celciuseTemperature);
  currentTemperature.innerHTML = `${temperature}`;
  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = ` ${response.data.main.humidity} %`;
  let currentWindSpeed = document.querySelector("#wind-speed");
  let speed = Math.round(response.data.wind.speed);
  currentWindSpeed.innerHTML = ` ${speed} km/h`;
  let currentDescription = document.querySelector("#description");
  currentDescription.innerHTML = ` ${response.data.weather[0].main}`;
  let currentIcon = document.querySelector("#icon");
  currentIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  currentIcon.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function inputCity(city) {
  let units = "metric";
  let key = "b9e5645fd345ccef8ad19143373284ef";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=${units}`;
  axios.get(url).then(showWeather);
}

function newCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  inputCity(city);
  let temperatureElement = document.querySelector("#temperature");
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  temperatureElement.innerHTML = Math.round(celciuseTemperature);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", newCity);

function calculateCoordinates(position) {
  let apiKey = "b9e5645fd345ccef8ad19143373284ef";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

function yourCoordinates(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(calculateCoordinates);
  let temperatureElement = document.querySelector("#temperature");
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  temperatureElement.innerHTML = Math.round(celciuseTemperature);
}

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = Math.round((celciuseTemperature * 9) / 5 + 32);
  temperatureElement.innerHTML = fahrenheitTemperature;
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  temperatureElement.innerHTML = Math.round(celciuseTemperature);
}

let celciuseTemperature = null;

let currentButtonClick = document.querySelector("#current-button");
currentButtonClick.addEventListener("click", yourCoordinates);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

inputCity("New York");
