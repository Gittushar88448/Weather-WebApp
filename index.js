const yourWeatherTab = document.querySelector("[your-Weather]");
const searchWeatherTab = document.querySelector('[search-Weather]');
const yourWeatherContainer = document.querySelector("default-Container");
const searchWeatherForm = document.querySelector("search-Form");
const grantAccessSection = document.getElementsByClassName("grantAccess");
const loadingGif = document.querySelector("loading-gif");
const inputSubmitButton  = document.querySelector("submit-Button");
const grantAccessButton = document.querySelector("grant-Access-button");



let yourLocationTab = yourWeatherTab;
const API_KEY = "d1845658f92b31c64bd94f06f7188c9c";
yourLocationTab.classList.add("current-tab");