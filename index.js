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
        yourWeatherContainer.classList.remove('active');
        yourWeatherContainer = newTab;
        yourWeatherContainer.classList.add('active');

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


yourLocationTab.addEventListener('click' , ()=>{
    switchTab(yourLocationTab);
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