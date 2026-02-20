// OpenWeatherMap API Configuration
// IMPORTANT: Replace 'YOUR_API_KEY_HERE' with your actual API key from OpenWeatherMap
// app.js
const API_KEY = 'f72543f551291f550858f0c0fb6c9cbf'; 
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5';

// DOM Elements
const searchForm = document.getElementById('searchForm');
const cityInput = document.getElementById('cityInput');
const errorMessage = document.getElementById('errorMessage');
const errorText = document.getElementById('errorText');
const loadingSpinner = document.getElementById('loadingSpinner');
const currentWeatherSection = document.getElementById('currentWeather');
const forecastSection = document.getElementById('forecastSection');

// Current Weather Elements
const cityName = document.getElementById('cityName');
const currentDate = document.getElementById('currentDate');
const weatherIcon = document.getElementById('weatherIcon');
const currentTemp = document.getElementById('currentTemp');
const weatherDescription = document.getElementById('weatherDescription');
const feelsLike = document.getElementById('feelsLike');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');
const pressure = document.getElementById('pressure');

// Forecast Elements
const forecastCards = document.getElementById('forecastCards');

// Event Listeners
searchForm.addEventListener('submit', handleSearch);

// Handle Search Form Submission
function handleSearch(e) {
    e.preventDefault();
    const city = cityInput.value.trim();
    
    if (city) {
        getWeatherData(city);
    }
}

// Fetch Weather Data
async function getWeatherData(city) {
    try {
        showLoading();
        hideError();
        hideWeatherSections();
        
        // Fetch current weather
        const currentWeatherUrl = `${API_BASE_URL}/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`;
        const currentResponse = await fetch(currentWeatherUrl);
        
        if (!currentResponse.ok) {
            throw new Error(currentResponse.status === 404 ? 'City not found. Please try again.' : 'Failed to fetch weather data.');
        }
        
        const currentData = await currentResponse.json();
        
        // Fetch 5-day forecast
        const forecastUrl = `${API_BASE_URL}/forecast?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`;
        const forecastResponse = await fetch(forecastUrl);
        
        if (!forecastResponse.ok) {
            throw new Error('Failed to fetch forecast data.');
        }
        
        const forecastData = await forecastResponse.json();
        
        // Display weather data
        displayCurrentWeather(currentData);
        displayForecast(forecastData);
        
        hideLoading();
        showWeatherSections();
        
    } catch (error) {
        hideLoading();
        showError(error.message);
    }
}

// Display Current Weather
function displayCurrentWeather(data) {
    // City name and country
    cityName.textContent = `${data.name}, ${data.sys.country}`;
    
    // Current date
    const date = new Date();
    currentDate.textContent = formatDate(date);
    
    // Weather icon
    const iconCode = data.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
    weatherIcon.alt = data.weather[0].description;
    
    // Temperature
    currentTemp.textContent = Math.round(data.main.temp);
    
    // Weather description
    weatherDescription.textContent = data.weather[0].description;
    
    // Feels like
    feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;
    
    // Humidity
    humidity.textContent = `${data.main.humidity}%`;
    
    // Wind speed
    windSpeed.textContent = `${(data.wind.speed * 3.6).toFixed(1)} km/h`;
    
    // Pressure
    pressure.textContent = `${data.main.pressure} hPa`;
}

// Display 5-Day Forecast
function displayForecast(data) {
    // Clear previous forecast cards
    forecastCards.innerHTML = '';
    
    // Filter forecast data to get one entry per day (at 12:00 PM)
    const dailyForecasts = data.list.filter(item => {
        return item.dt_txt.includes('12:00:00');
    });
    
    // Take only 5 days
    const fiveDayForecasts = dailyForecasts.slice(0, 5);
    
    // Create forecast cards
    fiveDayForecasts.forEach(forecast => {
        const card = createForecastCard(forecast);
        forecastCards.innerHTML += card;
    });
}

// Create Forecast Card HTML
function createForecastCard(forecast) {
    const date = new Date(forecast.dt * 1000);
    const dayName = getDayName(date);
    const dateStr = formatShortDate(date);
    const iconCode = forecast.weather[0].icon;
    const tempMax = Math.round(forecast.main.temp_max);
    const tempMin = Math.round(forecast.main.temp_min);
    const description = forecast.weather[0].description;
    
    return `
        <div class="col-md-6 col-lg">
            <div class="card forecast-card shadow-sm">
                <div class="card-body">
                    <div class="forecast-day">${dayName}</div>
                    <div class="forecast-date">${dateStr}</div>
                    <img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" 
                         alt="${description}" 
                         class="forecast-icon">
                    <div class="forecast-description">${description}</div>
                    <div class="forecast-temps">
                        <span class="temp-max">
                            <i class="fas fa-arrow-up"></i> ${tempMax}°
                        </span>
                        <span class="temp-min">
                            <i class="fas fa-arrow-down"></i> ${tempMin}°
                        </span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Utility Functions
function formatDate(date) {
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
}

function formatShortDate(date) {
    const options = { month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function getDayName(date) {
    const options = { weekday: 'long' };
    return date.toLocaleDateString('en-US', options);
}

function showLoading() {
    loadingSpinner.classList.remove('d-none');
}

function hideLoading() {
    loadingSpinner.classList.add('d-none');
}

function showError(message) {
    errorText.textContent = message;
    errorMessage.classList.remove('d-none');
    
    // Auto-hide error after 5 seconds
    setTimeout(() => {
        hideError();
    }, 5000);
}

function hideError() {
    errorMessage.classList.add('d-none');
}

function showWeatherSections() {
    currentWeatherSection.classList.remove('d-none');
    forecastSection.classList.remove('d-none');
}

function hideWeatherSections() {
    currentWeatherSection.classList.add('d-none');
    forecastSection.classList.add('d-none');
}

// Optional: Load default city on page load
// Uncomment the line below to load a default city when the page loads
// window.addEventListener('DOMContentLoaded', () => getWeatherData('London'));
