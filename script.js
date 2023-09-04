// API key for OpenWeatherMap
const apiKey = "a95fcdd824f2d88905588b8fb171a049";

// Base URL for the OpenWeatherMap API
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// DOM elements for various parts of the weather display
const searchBox = document.querySelector(".search input"); // Input field for city search
const searchBtn = document.querySelector(".search button"); // Button to trigger the search
const weatherIcon = document.querySelector(".weather-icon"); // Weather icon
const toggleBtn = document.querySelector(".toggle-btn"); // Toggle button

// Asynchronous function to fetch and display weather data for a given city
async function checkWeather(city) { 
    // Construct the API request URL with the provided city and API key
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    var data = await response.json(); // Parse the JSON response from the API
    responseErrorCheck(response); // Check for and handle API response errors

    // Update DOM elements with weather data
    document.querySelector(".city").innerHTML = data.name; // Display city name
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c"; // Display temperature
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%"; // Display humidity
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h"; // Display wind speed

    // Determine the weather description and update the weather icon accordingly
    weatherDescription = data.weather[0].main;
    toggleImageBasedOnDescription(weatherDescription);

    // Display the weather information container
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".toggle-btn").style.display = "block"
}

// Function to handle API response errors
function responseErrorCheck(response) {
    if (response.status == 400 || response.status == 404) {
        // Display an error message if the API response indicates a client or city not found error
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none"; // Hide weather data
        document.querySelector(".toggle-btn").style.display = "none"

    } else if (response.status == 200) {
        // Hide the error message and show weather data if the API response is successful
        document.querySelector(".error").style.display = "none";
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".toggle-btn").style.display = "block"
    
    }
}

// Function to toggle the weather icon based on the weather description
function toggleImageBasedOnDescription(weatherDescription) {
    if (weatherDescription == "Clouds") {
        weatherIcon.src = "images/clouds.png"; // Set the icon to a cloud image
    } else if (weatherDescription == "Clear") {
        weatherIcon.src = "images/clear.png"; // Set the icon to a clear sky image
    } else if (weatherDescription == "Rain") {
        weatherIcon.src = "images/rain.png"; // Set the icon to a rain image
    } else if (weatherDescription == "Drizzle") {
        weatherIcon.src = "images/drizzle.png"; // Set the icon to a drizzle image
    } else if (weatherDescription == "Mist") {
        weatherIcon.src = "images/mist.png"; // Set the icon to a mist image
    }
}

// Add a click event listener to the search button to trigger weather data retrieval
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value); // Call the checkWeather function with the city entered in the input field
});

let isCelsius = true; // Track the current unit (Celsius by default)

// Function to toggle temperature units between Celsius and Fahrenheit
function toggleTemperatureUnit() {
    isCelsius = !isCelsius; // Toggle the unit flag

    // Update the temperature display based on the current unit
    const temperatureElement = document.querySelector(".temp");
    const currentTemperature = parseFloat(temperatureElement.textContent); // Get the current temperature

    if (isCelsius) {
        // If Celsius is selected, convert from Fahrenheit to Celsius
        const celsiusTemperature = ((currentTemperature - 32) * 5) / 9;
        temperatureElement.textContent = Math.round(celsiusTemperature) + "°C";
    } else {
        // If Fahrenheit is selected, convert from Celsius to Fahrenheit
        const fahrenheitTemperature = (currentTemperature * 9) / 5 + 32;
        temperatureElement.textContent = Math.round(fahrenheitTemperature) + "°F";
    }
}

// Add a click event listener to the toggle button
toggleBtn.addEventListener("click", toggleTemperatureUnit);
