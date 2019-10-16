$(document).ready(function() {
  // database
  // raw weather object from API
  var cityWeather =
    "https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b6907d289e10d714a6e88b30761fae22";

  // variables
  // parsed weather data

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
  $.ajax({
    url: cityWeather,
    method: "GET"
  }).then(function(response) {
    console.log(response);
  });
});
