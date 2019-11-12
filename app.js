$(document).ready(function() {
  // database
  var citySearch = $("#searchBox");
  var searchBtn = $("#searchBtn");
  var currFore = $("#currentForecast");
  var fiveDay = $("#5DayForecast");
  var history = $("#searchHistory");
  // raw weather object from API

  // search button event
  searchBtn.on("click", function() {
    // enter city name
    citySearch = $("#searchBox").val();
    $("#searchBox").val("");

    getWeather(citySearch);
  });
  // on click event using the history function
  history.on("click", "li", function() {
    getWeather($(this).text());
  });
  // creates a new div to display the history
  function newDiv(text) {
    var cityList = $("<ul>")
      .text(text)
      .addClass("list-group-item list-group-item-action");
    history.append(cityList);
  }

  // get weather function
  function getWeather(citySearch) {
    $.ajax({
      url:
        "https://openweathermap.org/data/2.5/weather?q=" +
        citySearch +
        "&units=imperial&appid=b6907d289e10d714a6e88b30761fae22",
      method: "GET"
    }).then(function(response) {
      if (history.index(citySearch) === -1) {
        history.push(citySearch);
        window.localStorage.setItem("history", JSON.stringify(history));
        newDiv(citySearch);
      }
      currFore.empty();
      // create content based on city search
      var city = $("<h2>")
        .text(response.name + " (" + new Date().toLocaleDateString() + ")")
        .addClass("card-title");
      var content = $("<div>").addClass("card");
      var temp = $("<div>")
        .text("Temperature: " + response.main.temp + " F")
        .addClass("card-text");
      var humidity = $("<div>")
        .text("Humidity: " + response.main.humidity + "%")
        .addClass("card-text");
      var windSpd = $("<div>")
        .text("Wind Speed: " + response.wind.speed + " MPH")
        .addClass("card-text");
      var container = $("<div>").addClass("card-body");
      var img = $("<img>").attr(
        "src",
        "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png"
      );
      // append content to HTML
      city.append(img);
      container.append(city, temp, humidity, windSpd);
      content.append(container);
      currFore.append(container);

      getFiveDay(citySearch);
    });
  }
  // check local storage for city history
  var localHistory = JSON.parse(window.localStorage.getItem("history")) || [];

  if (localHistory.length > 0) {
    getWeather(localHistory[localHistory.length - 1]);
  }

  // Five day forecast function
  function getFiveDay(citySearch) {
    $.ajax({
      type: "GET",
      URL:
        "https://api.openweathermap.org/data/2.5/forecast?q=" +
        citySearch +
        "&units=imperial&appid=b6907d289e10d714a6e88b30761fae22"
    }).then(function(response) {
      console.log(response);
    });
  }

  // utility functions
  // get raw data
  // parse raw data
  // render parsed data

  // event functions
  // search button click
  // have city name
  // send city name to openweather API
  // set weather info to the object return (see raw data)

  // init
});
