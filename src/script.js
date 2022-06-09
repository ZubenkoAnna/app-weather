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

function showWeather(response) {
  let city = document.querySelector("#searching-city");
  city.innerHTML = response.data.name;
  let country = document.querySelector("#searching-country");
  country.innerHTML = `, ${response.data.sys.country}`;
  let currentTemperature = document.querySelector("#temperature");
  let temperature = Math.round(response.data.main.temp);
  currentTemperature.innerHTML = `${temperature}`;
  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = ` ${response.data.main.humidity} %`;
  let currentWindSpeed = document.querySelector("#wind-speed");
  let speed = Math.round(response.data.wind.speed);
  currentWindSpeed.innerHTML = ` ${speed} km/h`;
  let currentDescription = document.querySelector("#description");
  currentDescription.innerHTML = ` ${response.data.weather[0].main}`;
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

function yourCoordinates() {
  navigator.geolocation.getCurrentPosition(calculateCoordinates);
}

inputCity("New York");

let currentButtonClick = document.querySelector("#current-button");
currentButtonClick.addEventListener("click", yourCoordinates);
