"use strict";

// let $ = require('jquery'),
//     db = require("./db-interaction"),
//     templates = require("./dom-builder"),
//     login = require("./user");

var userId = "";

$("#zipButton").click(function () {
  console.log("clicked submit")

  var zipCode = $("#inputZip").val();
  console.log(zipCode)

    // function getCurrent(callback) {
    // return new Promise(function (resolve, reject) {
      $.ajax({
        url: "http://api.openweathermap.org/data/2.5/weather?zip="+zipCode+",us&units=imperial&appid=5d7f032279d8bc6257354baea46f3877"
      }).done(function (currentWeather) {
        console.log(currentWeather);
        // resolve(currentWeather);
        loadWeather(currentWeather);
      });
    });
  // }

// });

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







// // Using the REST API
// function currentWeather() {
//   $(".uiContainer--wrapper").html("");  // cleared the DOM before loading songs
//   db.getSongs()
//     .then(function(songData) {
//       var idArr = Object.keys(songData);   // Object.keys takes the keys for that object and puts them into an array
//       idArr.forEach(function(key) {
//         songData[key].id = key;           // using [] because it is a variable that we are passing in
//       });
//       console.log("songObject with ID added", songData);
//       templates.makeSongList(songData);
//     });
// }

// function threeDay() {
//   $(".uiContainer--wrapper").html("");  // cleared the DOM before loading songs
//   db.getSongs()
//     .then(function(songData) {
//       var idArr = Object.keys(songData);   // Object.keys takes the keys for that object and puts them into an array
//       idArr.forEach(function(key) {
//         songData[key].id = key;           // using [] because it is a variable that we are passing in
//       });
//       console.log("songObject with ID added", songData);
//       templates.makeSongList(songData);
//     });
// }

// function sevenDay() {
//   $(".uiContainer--wrapper").html("");  // cleared the DOM before loading songs
//   db.getSongs()
//     .then(function(songData) {
//       var idArr = Object.keys(songData);   // Object.keys takes the keys for that object and puts them into an array
//       idArr.forEach(function(key) {
//         songData[key].id = key;           // using [] because it is a variable that we are passing in
//       });
//       console.log("songObject with ID added", songData);
//       templates.makeSongList(songData);
//     });
// }


// // Send saved forecast data to db then reload DOM with current forecast
// $(document).on("click", ".save_new_btn", function() {
//   let songObj = buildSongObj();
//   db.addSong(songObj)
//   .then(function (songId) {
//     console.log("song saved", songId);
//     loadSongsToDOM();
//   });
// });


// //Save edited song to FB then reload DOM with updated song data
// $(document).on("click", ".save_edit_btn", function() {
//   let songObj = buildSongObj(),
//       songId = $(this).attr("id");
//   db.editSong(songObj, songId)
//   .then(function (data) {
//     loadSongsToDOM();
//   });
// });

// // Remove song then reload the DOM w/out new song
// $(document).on("click", ".delete-btn", function () {
//   let songId = $(this).data("delete-id");
//   db.deleteSong(songId)
//   .then(function (data) {
//     loadSongsToDOM();
//   });
// });

// // View songs from the list created in FB
// $(document).on("click", "#view-songs", function () {
//   loadSongsToDOM();
// });



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

// Helper functions for forms stuff. Nothing related to Firebase
// Build a song obj from form data.
function buildSongObj() {
    let songObj = {
    title: $("#form--title").val(),
    artist: $("#form--artist").val(),
    album: $("#form--album").val(),
    year: $("#form--year").val(),
    uid: userId
  };
  return songObj;
}

// Load the new song form
$("#add-song").click(function() {
  console.log("clicked add song");
  var songForm = templates.songForm()
  .then(function(songForm) {
    $(".uiContainer--wrapper").html(songForm);
  });
});
