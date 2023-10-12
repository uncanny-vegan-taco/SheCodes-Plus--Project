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
  let highTemp = Math.round(response.data.main.temp_max);
  let lowTemp = Math.round(response.data.main.temp_min);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML =
    Math.round(response.data.main.temp) + "°";
  document.querySelector(".feels-like").innerHTML =
    "Feels Like: " + Math.round(response.data.main.feels_like) + "°";
  document.querySelector(
    ".high-low-main"
  ).innerHTML = `H: ${highTemp}° L: ${lowTemp}°`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector(
    "#precipitation"
  ).innerHTML = `Precipitation: ${response.data.weather[0].main}`;
  document.querySelector(
    "#aqi"
  ).innerHTML = `Wind Speed: ${response.data.wind.speed}/mph`;

  console.log(response);
}
function defaultWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(
    `${response.data.main.temp}°`
  );

  document.querySelector(".feels-like").innerHTML = Math.round(
    `Feels Like: ${response.data.main.feels_like}°`
  );
  document.querySelector(
    ".high-low-main"
  ).innerHTML = `H: ${highTemp}° L: ${lowTemp}°`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector(
    "#precipitation"
  ).innerHTML = `Precipitation: ${response.data.weather[0].main}`;
  document.querySelector(
    "#aqi"
  ).innerHTML = `Wind Speed: ${response.data.wind.speed}/mph`;
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

//function toCelcius() {
//  let display = document.querySelector("#temp");
//
//  display.innerHTML = "14°C";
//}
//
//function toFarenheit() {
//  let display = document.querySelector("#temp");
//
//  display.innerHTML = "57°F";
//}

//let celcius = document.querySelector(".c-link");
//let farenheit = document.querySelector(".f-link");

//celcius.addEventListener("click", toCelcius);
//farenheit.addEventListener("click", toFarenheit);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", submitInfo);

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getLocation);

showDate();
changeCity("Seattle");
