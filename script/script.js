// API Key for OpenWeatherMap
var apiKey = "2e1ea90628f9fb67477f87ae9ccea177";

// Form submit event
$("#search-form").submit(function (event) {
    event.preventDefault();
    var city = $("#search-input").val();
    getWeather(city);
});

// Function to get weather for TODAY

// Get the gepgraphical ccordinates of the city

// Function to get weather for the next 5 days