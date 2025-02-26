const url = "https://api.openweathermap.org/data/2.5/weather?";
const apiKey = "effdca22cfff455436b22d647b280280";


//Accessing all the required element: 
const start = document.querySelector(".start"); 
const searchBox = document.querySelector("#inputField")
const searchIcon = document.querySelector("#searchIcon")
const desc = document.querySelector('#desc')
const tempName = document.querySelector("#temp")
const cityName = document.querySelector("#city")
const wind = document.querySelector("#windSpeed")
const humidity = document.querySelector("#humiditySpeed")
const goHome = document.querySelector(".homebtn"); 
const icon = document.querySelector("#icon");
const mainBox1 = document.querySelector(".mainBox1"); 
const mainBox2 = document.querySelector(".mainBox2"); 
const mainBox3 = document.querySelector(".mainBox3"); 


//start btn:
start.addEventListener('click', () =>{
    mainBox1.classList.add('inactive')
    mainBox2.classList.remove('inactive'); 
})

//Go Home btn:
goHome.addEventListener('click', () => {
    mainBox3.classList.add('inactive'); 
    mainBox1.classList.remove('inactive'); 
})

//searchIcon fucntionality: 
searchIcon.addEventListener('click', () =>{
    getWeatherData(searchBox.value);
})

//searchBox working: Whenever user press enter then also our functinality work. 
searchBox.addEventListener('keypress', (e) => {
    if(e.key === "Enter"){ 
        getWeatherData(searchBox.value);
    }
})

//changeIcon: 

function changeIcon(weatherMain){
    let icons = {
        Clouds: "images/cloud.jpg",
        Rains: "images/rain.jpg",
        Mist: "images/mist.jpg",
        Haze: "images/haze.jpg",
        Snow: "images/snow.jpg",
        Clear: "images/clear.jpg"
    }
    icon.src = icons[weatherMain] || "images/clear.jpg";
}

//API fetching Part: 
async function getWeatherData(city) {
    let finalUrl = `${url}q=${city}&appid=${apiKey}`
    let weatherData = await fetch(finalUrl).then(res => res.json())
    console.log(weatherData);

    if(weatherData.cod == 404){
        mainBox2.classList.add('inactive')
        mainBox3.classList.remove('inactive'); 
        desc.innerHTML = "Description"; 
        tempName.innerHTML = "0°C"
        cityName.innerHTML = "New York";
        wind.innerHTML = '0Km/h'
        humidity.innerHTML = "0%";
        searchBox.value = ""; 
        icon.src = "images/clear.jpg"
    }

    desc.innerHTML = (weatherData.weather[0].description).toUpperCase(); 
    tempName.innerHTML = Math.round(weatherData.main.temp-273.15) + "°C"
    cityName.innerHTML = weatherData.name;
    wind.innerHTML = weatherData.wind.speed+'Km/h'
    humidity.innerHTML = weatherData.main.humidity+"%"; 

    changeIcon(weatherData.weather[0].main);
}