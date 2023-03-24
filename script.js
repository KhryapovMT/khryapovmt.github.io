const apiKey = '793a1cd72c1b51c1050e'; // replace with your OpenWeatherMap API key

const form = document.querySelector('form');
const input = document.querySelector('input');
const currentWeatherSection = document.querySelector('#current-weather');
const forecastSection = document.querySelector('#forecast');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = input.value;
    getCurrentWeather(location);
    getForecast(location);
    form.reset();
});

async function getCurrentWeather(location) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`);
        const data = await response.json();
        displayCurrentWeather(data);
    } catch (error) {
        console.log(error);
    }
}

async function getForecast(location) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${apiKey}`);
        const data = await response.json();
        displayForecast(data);
    } catch (error) {
        console.log(error);
    }
}

function displayCurrentWeather(data) {
    const temperature = data.main.temp;
    const conditions = data.weather[0].description;
    const windSpeed = data.wind.speed;
    currentWeatherSection.innerHTML = `
        <h2>Current Weather</h2>
        <p>Temperature: ${temperature}°C</p>
        <p>Conditions: ${conditions}</p>
        <p>Wind Speed: ${windSpeed} km/h</p>
    `;
}

function displayForecast(data) {
    const days = data.list.filter((item) => item.dt_txt.includes('12:00:00'));
    const forecastHTML = days.map((day) => {
        const date = new Date(day.dt * 1000).toLocaleDateString();
        const temperature = day.main.temp;
        const conditions = day.weather[0].description;
        return `<li>${date}: ${conditions}, ${temperature}°C</li>`;
    }).join('');
    forecastSection.innerHTML = `
        <h2>5-Day Forecast</h2>
        <ul>
            ${forecastHTML}
        </ul>
    `;
}
