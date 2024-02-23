const yourWeatherTab = document.querySelector('[your-Weather]');
const searchWeatherTab = document.querySelector('[search-Weather]');
const yourWeatherContainer = document.querySelector("[default-Container]");
const searchWeatherForm = document.querySelector("[search-Form]");
const grantAccessSection = document.querySelector("[grant-Section]");
const loadingGif = document.querySelector("[loading-gif]");
const inputSubmitButton  = document.querySelector("[submit-Button]");
const grantAccessButton = document.querySelector("[grant-Access-button]");



let yourLocationTab = yourWeatherTab;
const API_KEY = "23abca252a2453ad4065070cde4439da";
yourLocationTab.classList.add("current-tab");
getSessionStorage();


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
            searchWeatherForm.classList.remove('active');
            yourWeatherContainer.classList.remove('active');
            getSessionStorage();
        }
    }
}


yourWeatherTab.addEventListener("click" , ()=>{
    switchTab(yourWeatherTab);
});


searchWeatherTab.addEventListener("click" , ()=>{
    switchTab(searchWeatherTab);
});



function getSessionStorage(){
    const localCoordinates = sessionStorage.getItem('user-Coordinates');
    if(!localCoordinates){
        grantAccessSection.classList.add("active");
    }
    else{
        const coordinates = JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);
    }
}

async function fetchUserWeatherInfo(coordinate){
    const {lat , lon} = coordinate;
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
        loadingGif.classList.remove('active');
        // after css implimentation w'll solve the catch block
        console.error(e);
    }
}

function renderInfo(data){

    const locationName = document.querySelector('[Your-Location]');
    const flagImage = document.querySelector('[flag-Img]');
    const weatherDescription = document.querySelector('[weather-Status]');
    const weatherDescriptionIcon = document.querySelector('[weather-Icon]');
    const temperature = document.querySelector('[temperature-Celsius]');
    const windSpeed = document.querySelector('[speedOfWind]');
    const humidity = document.querySelector('[Humidity]');
    const clouds = document.querySelector('[cloud]');

    locationName.innerText = data?.name;
    flagImage.src =  `https://flagcdn.com/144x108/${data?.sys?.country.toLowerCase()}.png`;
    weatherDescription.innerText = data?.weather?.[0]?.description;
    weatherDescriptionIcon.src = `https://openweathermap.org/img/wn/${data?.weather?.[0]?.icon}.png`;
    temperature.innerText = `${data?.main?.temp +" °C"}`;
    windSpeed.innerText = `${data?.wind?.speed +"m/s"}`;
    humidity.innerText = `${data?.main?.humidity +"%"}`;
    clouds.innerText = `${data?.clouds?.all +"%"}`;
}   

grantAccessButton.addEventListener("click", getLocation);

function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{
        console.log('location is not rendering');
    }
}

function showPosition(position){
    const userCurrentLoc = {
        lat : position.coords.latitude,
        lon : position.coords.longitude,
    };

    sessionStorage.setItem("user-Coordinates" , JSON.stringify(userCurrentLoc));
    fetchUserWeatherInfo(userCurrentLoc);
}

const inputSearch = document.querySelector("[search-Field]");

searchWeatherForm.addEventListener("submit",(e) => {
    e.preventDefault();
    let getValue = inputSearch.value;
    if(getValue === ""){
        return;
    }
    else{
        fetchSearchWeatherInfo(getValue);
        inputSearch.value = "";
    }
});

const showingError = document.querySelector('[show-Error]');
 async function fetchSearchWeatherInfo(city){
    
    grantAccessSection.classList.remove('active');
    yourWeatherContainer.classList.remove('active');
    loadingGif.classList.add('active');


    try{
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        let data = await response.json();
        loadingGif.classList.remove('active');
        yourWeatherContainer.classList.add('active');
        renderInfo(data);
    }
    catch(e){
            let err = e.json()
            showErrorDisplay(err);
            console.log("ye tuune kya kiya");

     }


}

function showErrorDisplay(error){
    if(err?.cod == "404"){
        const newErrorMsg = document.createElement('p');
        newErrorMsg.innerText = `${e.message}`;
        showingError.appendChild(newErrorMsg);
        yourWeatherContainer.classList.remove('active');
        searchWeatherForm.classList.remove('active');
        showingError.classList.add('active');
    }
}