"use strict";

let $ = require('jquery'),
    firebase = require("./firebaseConfig");

function getCurrent(callback) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: 'http://api.openweathermap.org/data/2.5/weather?zip={zip code},us&units=imperial&',
    }).done(function (currentWeather) {
      resolve(currentWeather);
    });
  });
}

function getThree(callback) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: 'https://music-history-54c84.firebaseio.com/songs.json',
    }).done(function (threeWeather) {
      resolve(threeWeather);
    });
  });
}

function getSeven(callback) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: 'https://music-history-54c84.firebaseio.com/songs.json',
    }).done(function (sevenWeather) {
      resolve(sevenWeather);
    });
  });
}

function addWeather(songFormObj) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: 'https://music-history-54c84.firebaseio.com/songs.json',
      type: 'POST',  // used for first time posting to DB
      data: JSON.stringify(songFormObj),
      dataType: 'json'
    }).done(function (forecast) {
      resolve(forecast);
    });
  });
}

function deleteWeather(songId) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: `https://music-history-54c84.firebaseio.com/songs/${songId}.json`,
      type: 'DELETE'
    }).done(function (forecast) {
      resolve(forecast);
    });
  });
}

module.exports = {
  getCurrent,
  getThree,
  getSeven,
  deleteWeather,
  addWeather
};
