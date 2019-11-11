$(document).ready(function() {
  // database
  var city = $("#searchBox");
  var searchBtn = $("#searchBtn");
  var currentForecast = $("#currentForecast");
  var fiveDay = $("#5DayForecast");
  var history = $("#searchHistory");
  // raw weather object from API

  // search button event
  searchBtn.on("click", function() {
    // enter city name
    city = $("#searchBox").val();
    $("#searchBox").val("");

    getWeather(city);
  });

  // get weather function
  function getWeather(city) {
    $.ajax({
      url:
        "https://openweathermap.org/data/2.5/weather?q=" +
        city +
        "&appid=b6907d289e10d714a6e88b30761fae22",
      method: "GET"
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

  // check local storage for city history
});
