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
function changeCity() {
  let citySearch = document.getElementById("city-input");
  citySearch = citySearch.trim();
  citySearch = citySearch.toLowerCase();

  let unit = "imperial";
  let apiKey = "f94ea25a0e5f5ee54c0ba93fee57f24d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch.value}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(showTemp);
}
function showPosition(position) {
  navigator.geolocation.getCurrentPosition(showPosition);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let unit = "imperial";
  let apiKey = "f94ea25a0e5f5ee54c0ba93fee57f24d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;
  console.log(position);

  axios.get(apiUrl).then(showTemp);
}

function showTemp(response) {
  let city = response.data.name;
  let mainTemp = Math.round(response.data.main.temp);
  let feelsLike = Math.round(response.data.main.feels_like);
  let highTemp = Math.round(response.data.main.temp_max);
  let lowTemp = Math.round(response.data.main.temp_min);
  let humidity = response.data.main.humidity;
  let precipitation = response.data.weather[0].main;
  let windSpeed = response.data.wind.speed;
  let header = document.querySelector("#city");
  let temp = document.querySelector("#temp");
  let feel = document.querySelector(".feels-like");
  let highLow = document.querySelector(".high-low-main");
  let humidityDisplay = document.querySelector("#humidity");
  let precipitationDisplay = document.querySelector("#precipitation");
  let windSpeedDisplay = document.querySelector("#aqi");
  header.innerHTML = `${city}`;
  temp.innerHTML = `${mainTemp}°`;
  feel.innerHTML = `Feels Like: ${feelsLike}°`;
  highLow.innerHTML = `H: ${highTemp}° L: ${lowTemp}°`;
  humidityDisplay.innerHTML = `Humidity: ${humidity}%`;
  precipitationDisplay.innerHTML = `Precipitation: ${precipitation}`;
  windSpeedDisplay.innerHTML = `Wind Speed: ${windSpeed}/mph`;

  console.log(response);
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
let cityButton = document.querySelector("#search-button");
let currentButton = document.querySelector("#current-button");
//let celcius = document.querySelector(".c-link");
//let farenheit = document.querySelector(".f-link");

//celcius.addEventListener("click", toCelcius);
//farenheit.addEventListener("click", toFarenheit);

cityButton.addEventListener("click", changeCity);
currentButton.addEventListener("click", showPosition);
showDate();
