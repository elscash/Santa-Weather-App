function formatDate(todaysDate) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let formatDay = days[todaysDate.getDay()];
  let formatMonth = months[todaysDate.getMonth()];
  let formatDate = todaysDate.getDate();
  let formatHour = todaysDate.getHours();
  if (formatHour < 10) {
    formatHour = `0${formatHour}`;
  }
  let formatMinutes = todaysDate.getMinutes();
  if (formatMinutes < 10) {
    formatMinutes = `0${formatMinutes}`;
  }
  return `${formatDay}  ${formatDate} ${formatMonth}<br/>${formatHour}:${formatMinutes}`;
}

function formatDay(timeStamp) {
  let date = new Date(timeStamp * 1000);
  let day = date.getDay();
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col-2">
          <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
          
          <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
          />
          <div><span class="weather-forecast-max">H: ${Math.round(
            forecastDay.temp.max
          )}° </span><span class="weather-forecast-min">  L: ${Math.round(
          forecastDay.temp.min
        )}°</span></div>
        </div>
         `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "1aa2c893e497775edeb7c6f94c4a3453";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
  console.log(response.data);
  document.querySelector("#display-city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  celsiusTemperature = response.data.main.temp;

  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "1aa2c893e497775edeb7c6f94c4a3453";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "1aa2c893e497775edeb7c6f94c4a3453";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let h2 = document.querySelector("#display-date");
h2.innerHTML = formatDate(new Date());

let form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("London");
