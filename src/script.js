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
  colorChange(hour);
}
function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML += `
          <div class="col-2">
            <img src="https://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png" alt="icon" class="forecast-icon">
            <div class="forecast-temps">
              <span class="forecast-high">${Math.round(
                forecastDay.temp.max
              )}&deg;</span> |
              <span class="forecast-low">${Math.round(
                forecastDay.temp.min
              )}&deg;</span>
            </div>
          </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  let apiKey = "6d68aadfacdd4f5163bc273049a0cf2d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayForecast);
}
function showTemp(response) {
  console.log(response.data);

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
    .querySelector("#icon-image")
    .setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );

  getForecast(response.data.coord);
}

function defaultWeather(response) {
  document
    .querySelector("#icon-image")
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

  getForecast(response.data.coord);
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

function colorChange(hour) {
  let body = document.querySelector("body");
  let content = document.querySelector(".content");
  if (hour >= 20 || hour <= 6) {
    body.classList.add("night-mode");
    content.classList.add("night-mode");
    body.classList.remove("sunset", "sunrise", "day-mode");
    content.classList.remove("sunset", "sunrise", "day-mode");
  } else if (hour >= 6 && hour < 9) {
    body.classList.add("sunrise");
    body.classList.remove("night-mode", "sunset", "day-mode");
  } else if (hour >= 9 && hour < 16) {
    body.classList.add("day-mode");
    body.classList.remove("night-mode", "sunrise", "sunset");
  } else if (hour >= 16 && hour < 20) {
    body.classList.add("sunset");
    body.classList.remove("night-mode", "sunrise", "day-mode");
  }
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", submitInfo);

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getLocation);

showDate();
changeCity("Seattle");
