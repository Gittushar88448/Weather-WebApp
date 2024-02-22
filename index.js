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


function switchTab(newTab){
    if(newTab != yourLocationTab){
        yourLocationTab.classList.remove('current-tab');
        yourLocationTab = newTab;
        yourLocationTab.classList.add('current-tab');

        if(!searchWeatherForm.classList.contains('active')){
            searchWeatherForm.classList.add('active');
            yourWeatherContainer.classList.remove('active');
            grantAccessSection.classList.remove('active');

        }

        else{
            searchWeatherForm.classList.add('active');
            yourWeatherContainer.classList.remove('active');
            getSessionStorage();
        }
    }
}


yourWeatherTab.addEventListener('click' , ()=>{
    switchTab(yourWeatherTab);
});


searchWeatherTab.addEventListener('click' , ()=>{
    switchTab(searchWeatherTab);
});



function getSessionStorage(){
    let localCoordinates = sessionStorage.getItem('user-Coordinates');
    if(!localCoordinates){
        grantAccessSection.classList.add('active');
    }
    else{
        const coordinates = JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);
    }
}

async function fetchUserWeatherInfo(coordinates){
    const {lat , lon} = coordinates;
    grantAccessSection.classList.remove('active');
    loadingGif.classList.add('active');

    try{
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        let data = await response.json();
        loadingGif.classList.remove('active');
        yourWeatherContainer.classList.add('active');
        renderInfo(data);
    }
    catch(e){
        // after css implimentation w'll solve the catch block
        console.error(e);
    }
}

function renderInfo(data){

    const locationName = document.querySelector('Your-Location');
    const flagImage = document.querySelector('flag-Img');
    const weatherDescription = document.querySelector('weather-Status');
    const weatherDescriptionIcon = document.querySelector('weather-Icon');
    const temperature = document.querySelector('temperature-Celsius');
    const windSpeed = document.querySelector('speedOfWind');
    const humidity = document.querySelector('Humidity');
    const clouds = document.querySelector('cloud');

    locationName.innerText = data?.name;
    flagImage.src =  `https://flagcdn.com/144x108/${data?.sys?.country.toLowerCase()}.png`;
    weatherDescription.innerText = data?.weather?.[0]?.description;
    weatherDescriptionIcon.src = `https://flagcdn.com/144x108/${data?.weather?.[0]?.icon}.png`;
    temperature.innerText = data?.main?.temp;
    windSpeed.innerText = data?.wind?.speed;
    humidity.innerText = data?.main?.humidity;
    clouds.innerText = data?.cloud?.all;
}   

grantAccessButton.addEventListener('click' , getLocation);

function getLocation(){
    if(nevigator.geolocation){
        nevigator.geolocation.getCurrentPosition(showPosition)
    }
    else{
        //later write else condition
    }
}

function showPosition(position){
    let userCurrentLoc = {
        lat : position.coords.latitude,
        lon : position.coords.longitude,
    };

    sessionStorage.setItem("user-Coordinates" , JSON.stringify(userCurrentLoc));
    fetchUserWeatherInfo(userCurrentLoc);
}