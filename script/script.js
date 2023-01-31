// API Key for OpenWeatherMap
var apiKey = "2e1ea90628f9fb67477f87ae9ccea177";

// Form submit event
$("#search-form").submit(function (event) {
    event.preventDefault();
    var city = $("#search-input").val();
    getWeather(city);
});

// Function to get weather for TODAY
function getWeather(city) {
    // Get weather data for a city for TODAY
    var todayUrl =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&appid=" +
        apiKey +
        // units = metric used to have Celsius instead of Kelvin that is the Openweather standard
        "&units=metric";

    //jQuery to send GET request to OpenWeather API
    // Data returned from the API to be passed in a function as parameter data
    $.getJSON(todayUrl, function (todayData) {
        // Declare var and assign the value of sata
        var today = todayData;
        // Create an URL for the weather icon, using the icon code from the API data stored in a var
        var todayIcon =
            "https://openweathermap.org/img/wn/" +
            today.weather[0].icon +
            "@2x.png";
        // Create a string of HTML that will be used to display the weather data on the page
        var todayHtml =
        // City name
        "<h2>" + today.name + "-" +
        // Date of today
        moment().format("MMMM Do YYYY") + "</h2>" +
        // Weather icon
        "<img src='" + todayIcon + "'>"

        // Update the content of an HTML element with the ID "today" with the HTML string created
    }


    )
}


// Get the gepgraphical ccordinates of the city

// Function to get weather for the next 5 days