$(document).ready(function() {
  localStorage.clear();
  // database
  var citySearch = $("#searchBox");
  var searchBtn = $("#searchBtn");
  var currFore = $("#currentForecast");
  var fiveDay = $("#5DayForecast");
  var history = $("#searchHistory");

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
      url:
        "http://api.openweathermap.org/data/2.5/forecast?q=" +
        citySearch +
        "&appid=7ba67ac190f85fdba2e2dc6b9d32e93c&units=imperial",
      dataType: "json",
      success: function(data) {
        // overwrite any existing content with title and empty row
        $("#5DayForecast")
          .html('<h4 class="mt-3">5-Day Forecast:</h4>')
          .append('<div class="row">');
        // loop over all forecasts (by 3-hour increments)
        for (var i = 0; i < data.list.length; i++) {
          // only look at forecasts around 3:00pm
          if (data.list[i].dt_txt.indexOf("15:00:00") !== -1) {
            // create html elements for a bootstrap card
            var col = $("<div>").addClass("col-md-2");
            var card = $("<div>").addClass("card bg-primary text-white");
            var body = $("<div>").addClass("card-body p-2");
            var title = $("<h5>")
              .addClass("card-title")
              .text(new Date(data.list[i].dt_txt).toLocaleDateString());
            var img = $("<img>").attr(
              "src",
              "http://openweathermap.org/img/w/" +
                data.list[i].weather[0].icon +
                ".png"
            );
            var p1 = $("<p>")
              .addClass("card-text")
              .text("Temp: " + data.list[i].main.temp_max + " °F");
            var p2 = $("<p>")
              .addClass("card-text")
              .text("Humidity: " + data.list[i].main.humidity + "%");
            // merge together and put on page
            col.append(card.append(body.append(title, img, p1, p2)));
            $("#5DayForecast .row").append(col);
          }
        }
      }
    });
  }
});
