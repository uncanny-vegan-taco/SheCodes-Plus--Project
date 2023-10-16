function showDate() {
  let date = new Date();
  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[dayIndex];

  let hour = date.getHours();
  let minute = String(date.getMinutes()).padStart(2, "0");

  document.querySelector("#date-time").innerHTML = `${day}, ${hour}:${minute}`;
}
function showTemp(response) {
  console.log(response);

  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector(".feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#high-temp").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#low-temp").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#wind").innerHTML =
    Math.round(response.data.wind.speed) + "mph";
  document
    .querySelector("icon-image")
    .setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  fahrenheitTemperature = Math.round(response.data.main.temp);
  highTemperature = Math.round(response.data.main.temp_max);
  lowTemperature = Math.round(response.data.main.temp_min);
  feelsLikeTemperature = Math.round(response.data.main.feels_like);
  windSpeed = Math.round(response.data.wind.speed);
}
function defaultWeather(response) {
  document
    .querySelector("icon-image")
    .setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );

  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector(".feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#high-temp").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#low-temp").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#wind").innerHTML =
    Math.round(response.data.wind.speed) + "mph";
}
function submitInfo(event) {
  event.preventDefault();
  let citySearch = document.querySelector("#city-input").value;
  changeCity(citySearch);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let unit = "imperial";
  let apiKey = "f94ea25a0e5f5ee54c0ba93fee57f24d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;
  console.log(position);

  axios.get(apiUrl).then(showTemp);
}
function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
function changeCity(citySearch) {
  let unit = "imperial";
  let apiKey = "f94ea25a0e5f5ee54c0ba93fee57f24d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(showTemp);
}

function toCelcius(event) {
  event.preventDefault();
  let display = document.querySelector("#temp");
  let high = document.querySelector("#high-temp");
  let low = document.querySelector("#low-temp");
  let feelsLike = document.querySelector(".feels-like");
  let wind = document.querySelector("#wind");

  let newTemp = Math.round((fahrenheitTemperature - 32) * (5 / 9));
  let newHigh = Math.round((highTemperature - 32) * (5 / 9));
  let newLow = Math.round((lowTemperature - 32) * (5 / 9));
  let newFeelsLike = Math.round((feelsLikeTemperature - 32) * (5 / 9));
  let newWindSpeed = Math.round(windSpeed * 1.60934);

  display.innerHTML = newTemp;
  high.innerHTML = newHigh;
  low.innerHTML = newLow;
  feelsLike.innerHTML = newFeelsLike;
  wind.innerHTML = newWindSpeed + "kmph";
}

function toFahrenheit(event) {
  event.preventDefault();
  let display = document.querySelector("#temp");
  let high = document.querySelector("#high-temp");
  let low = document.querySelector("#low-temp");
  let feelsLike = document.querySelector(".feels-like");
  let wind = document.querySelector("#wind");
  display.innerHTML = Math.round(fahrenheitTemperature);
  high.innerHTML = Math.round(highTemperature);
  low.innerHTML = Math.round(lowTemperature);
  feelsLike.innerHTML = Math.round(feelsLikeTemperature);
  wind.innerHTML = Math.round(windSpeed) + "mph";
}

let fahrenheitTemperature = null;
let highTemperature = null;
let lowTemperature = null;
let feelsLikeTemperature = null;
let windSpeed = null;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", submitInfo);

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getLocation);

let celcius = document.querySelector(".c-link");
celcius.addEventListener("click", toCelcius);

let farenheit = document.querySelector(".f-link");
farenheit.addEventListener("click", toFahrenheit);

showDate();
changeCity("Seattle");
