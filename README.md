# Weather Dashboard
 
A responsive, real-time weather application that provides current weather conditions and a 5-day forecast for cities worldwide. Built with HTML5, Bootstrap 5, and the OpenWeatherMap API.

## Features

* **Real-Time Weather Data:** Fetches and displays current temperature, weather conditions, humidity, wind speed, pressure, and "feels like" temperature.
* **5-Day Forecast:** Shows a daily forecast including the date, weather icon, description, and high/low temperatures.
* **Search Functionality:** Allows users to search for weather data by city name.
* **Responsive Design:** Fully responsive layout that adapts to mobile, tablet, and desktop screens using Bootstrap 5.
* **Error Handling:** User-friendly error messages for invalid city names or network issues.
* **Visual Feedback:** Loading spinners and dynamic weather icons.

## Technologies Used

* **HTML5:** Structure and markup.
* **CSS3:** Custom styling and animations.
* **Bootstrap 5:** Responsive grid system and UI components (cards, forms, alerts).
* **JavaScript (ES6+):** Async/await for API fetching, DOM manipulation.
* **Font Awesome:** Scalable vector icons.
* **OpenWeatherMap API:** Third-party service for weather data.

## Project Structure

```text
/
├── index.html    # Main HTML structure (contains current inline styles/scripts)
├── style.css     # Custom CSS styles
└── app.js        # JavaScript logic and API handling
Note: The provided index.html currently contains the CSS and JS inline. To use the separate style.css and app.js files, ensure you link them in your HTML head and body respectively.

Setup & Installation
Clone or Download the Repository Save the provided files into a local directory.

Get an API Key This project uses the OpenWeatherMap API.

Sign up for a free account at OpenWeatherMap.

Navigate to your API keys tab and generate a new key.

Configure the API Key Open app.js (or the <script> section in index.html) and replace the placeholder or existing key with your own:

JavaScript

// In app.js
const API_KEY = 'YOUR_NEW_API_KEY_HERE';
Run the Application

Simply open index.html in any modern web browser.

(Optional) For better performance or to avoid CORS issues in some environments, consider running it via a local server (e.g., Live Server in VS Code).

Usage
Enter a city name in the search bar (e.g., "London", "New York", "Tokyo").

Click the Search button or press Enter.

View the current weather details and the 5-day forecast cards below.

License

This project is open-source and available for personal and educational use.
