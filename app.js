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

  // get weather function
  function getWeather(citySearch) {
    $.ajax({
      url:
        "https://openweathermap.org/data/2.5/weather?q=" +
        citySearch +
        "&appid=b6907d289e10d714a6e88b30761fae22",
      method: "GET"
    }).then(function(response) {
      currFore.empty();
      // create content based on city search
      var city = $("<h2>")
        .addClass("card-title")
        .text(response.name + " (" + new Date().toLocaleDateString() + ")");
      var content = $("<div>").addClass("card");
      var temp = $("<div>")
        .addClass("card-text")
        .text("Temperature: " + response.main.temp + " F");
      var humidity = $("<div>")
        .addClass("card-text")
        .text("Humidity: " + response.main.humidity + "%");
      var windSpd = $("<div>")
        .addClass("card-text")
        .text("Wind Speed: " + response.wind.speed + " MPH");
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

  // check local storage for city history
});
