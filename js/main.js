"use strict";

let $ = require('jquery'),
    db = require("./db-interaction"),
    login = require("./user");

var userId = "";

$("#zipButton").click(function () {
  console.log("clicked submit")

  var zipCode = $("#inputZip").val();
  console.log(zipCode)

      $.ajax({
        url: "http://api.openweathermap.org/data/2.5/weather?zip="+zipCode+",us&units=imperial&appid=5d7f032279d8bc6257354baea46f3877"
      }).done(function (currentWeather) {
        console.log(currentWeather);
        // resolve(currentWeather);
        loadWeather(currentWeather);
      });
    });


var loadWeather = function (currentWeather) {
  console.log(currentWeather);
  $("#weatherOutput").append(
    `
    <div class="col-md-3"></div>
    <div class="col-md-6 content">
      <h2>You are here: ${currentWeather.name}</h2>
      <h3>Temperature:<h4> ${currentWeather.main.temp} Farenheit</h4></h3>
      <h3>Conditions:<h4> ${currentWeather.weather[0].description}</h4></h3>
      <h3>Air Pressure:<h4> ${currentWeather.main.pressure}</h4></h3>
      <h3>Wind Speed:<h4> ${currentWeather.wind.speed} mph</h4></h3>
    </div>
    <div class="col-md-3"></div>`
    )
};


//***************************************************************
// User login section. Should ideally be in its own module
$("#auth-btn").click(function() {
  console.log("clicked auth");
  login()
  .then(function (result) {
    // var token = result.credential.accessToken;
    let user = result.user;
    console.log("logged in user", user.uid);
    userId = user.uid;
    loadSongsToDOM();
  });
});
//****************************************************************
