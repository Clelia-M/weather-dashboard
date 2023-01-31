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

    // jQuery to send GET request to OpenWeather API
    // Data returned from the API to be passed in a function as parameter data
    $.getJSON(todayUrl, function (todayData) {
        // Declare var and assign the value of data
        var today = todayData;
        // Create an URL for the weather icon, using the icon code from the API data stored in a var
        var todayIcon =
            "https://openweathermap.org/img/wn/" +
            today.weather[0].icon +
            "@2x.png";
        // Create a string of HTML that will be used to display the weather data on the page
        var todayHtml =
            // City name
            "<h2>" + today.name + " - " +
            // Date of today
            moment().format("MMMM Do YYYY") + "</h2>" +
            // Weather icon
            "<img src='" + todayIcon + "'>" +
            // Temperature
            "<p>Temperature: " + (today.main.temp).toFixed(2) + "°C</p>" +
            // Humidity
            "<p>Humidity: " + today.main.humidity + "%</p>" +
            // Wind Speed
            "<p>Wind: " + today.wind.speed + "mph </p>";

        // Update the content of an HTML element with the ID "today" with the HTML string created
        $("#today").html(todayHtml);
    });
}


// Get the geographical coordinates of the city
$("#search-form").submit(function (event) {
    event.preventDefault();
    var city = $("#search-input").val();
    getForecast(city);
});

// Function to get weather for the next 5 days
function getForecast(city) {
    var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey + "&units=metric";

    // jQuery to send GET request to OpenWeatherMap API
    // Data returned from the API is passed in a function as the parameter "data"
    $.getJSON(forecastUrl, function (forecastData) {

        // var for the card deck next 5 days with bootstrap card styile
        var forecastDiv = $("<div>").addClass("card-deck p-3");
        // var to loop trough the array of days
        var forecastArray = forecastData.list;
        // var to set the current date
        var currentDate = new Date();
        // var to start from tomorrow
        var tomorrow = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
        var count = 0;

        // for loop to go through the array of days and count the next 5 excluding today
        for (var i = 0; i < forecastArray.length; i += 8) {
            var forecast = forecastArray[i];
            var forecastDate = new Date(forecast.dt * 1000);
            if (forecastDate < tomorrow) {
                continue;
            }
            if (count >= 5) {
                break;
            }

            // date
            var formattedDate = forecastDate.toLocaleDateString();
            // temperature
            var forecastTemp = "Temp: " + forecast.main.temp + " °C";
            // humidity
            var forecastHumidity = "Humidity: " + forecast.main.humidity + " %";
            // wind
            var forecastWind = "Wind: " + forecast.wind.speed + " mph";

            // var to append pieces of info 
            var forecastRow = $("<div>").addClass("forecast-row card text-left p-3");
            // date append
            forecastRow.append($("<h6>").addClass("card-title text-left p-2").text(formattedDate));
            // temperature append
            forecastRow.append($("<p>").addClass("card-text text-left p-2").text(forecastTemp));
            // wind append
            forecastRow.append($("<p>").addClass("card-title text-left p-2").text(forecastWind));
            // humidity append
            forecastRow.append($("<p>").addClass("card-text text-left p-2").text(forecastHumidity));
            forecastDiv.append(forecastRow);
            // count++;
        }

        var forecastTitle = "<h2>5 Days-Forecast:</h2>";
        $("#forecast").prepend(forecastTitle);
        $("#forecast").append(forecastDiv);
    });
};