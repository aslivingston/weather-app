function getWeatherDescription(code) {
    switch (code) {
        case 0:
            return {
                description: "Clear sky",
                image: "https://github.com/aslivingston/weather-app/blob/main/src/assets/sun-128.png?raw=true",
                bgColour: "#f8fc03"
            };
        case 1:
            return {
                description: "Mainly clear",
                image: "https://github.com/aslivingston/weather-app/blob/main/src/assets/partly-cloudy-day-128.png?raw=true"
            };
        case 2:
            return {
                description: "Partly cloudy",
                image: "https://github.com/aslivingston/weather-app/blob/main/src/assets/partly-cloudy-day-128.png?raw=true"
            };
        case 3:
            return {
                description: "Overcast",
                image: "https://github.com/aslivingston/weather-app/blob/main/src/assets/partly-cloudy-day-128.png?raw=true"
            };
        case 45:
        case 48:
            return {
                description: "Fog",
                image: "https://github.com/aslivingston/weather-app/blob/main/src/assets/fog-day-128.png?raw=true"
            };
        case 51:
            return {
                description: "Drizzle: Light intensity",
                image: "https://github.com/aslivingston/weather-app/blob/main/src/assets/little-rain-128.png?raw=true"
            };
        case 53:
            return {
                description: "Drizzle: Moderate intensity",
                image: "https://github.com/aslivingston/weather-app/blob/main/src/assets/little-rain-128.png?raw=true"
            };
        case 55:
            return {
                description: "Drizzle: Dense intensity",
                image: "https://github.com/aslivingston/weather-app/blob/main/src/assets/little-rain-128.png?raw=true"
            };
        case 56:
            return {
                description: "Freezing Drizzle: Light intensity",
                image: ""
            };
        case 57:
            return {
                description: "Freezing Drizzle: Dense intensity",
                image: ""
            };
        case 61:
            return {
                description: "Rain: Slight intensity",
                image: "https://github.com/aslivingston/weather-app/blob/main/src/assets/rain-128.png?raw=true",
                bgColour: "#82dcff"
            };
        case 63:
            return {
                description: "Rain: Moderate intensity",
                image: "https://github.com/aslivingston/weather-app/blob/main/src/assets/rain-128.png?raw=true",
                bgColour: "#82dcff"
            };
        case 65:
            return {
                description: "Rain: Heavy intensity",
                image: "https://github.com/aslivingston/weather-app/blob/main/src/assets/rain-128.png?raw=true",
                bgColour: "#82dcff"
            };
        case 66:
            return {
                description: "Freezing Rain: Light intensity",
                image: "https://github.com/aslivingston/weather-app/blob/main/src/assets/sleet-128.png?raw=true"
            };
        case 67:
            return {
                description: "Freezing Rain: Heavy intensity",
                image: "https://github.com/aslivingston/weather-app/blob/main/src/assets/sleet-128.png?raw=true"
            };
        case 71:
            return {
                description: "Snow fall: Slight intensity",
                image: "https://github.com/aslivingston/weather-app/blob/main/src/assets/little-snow-128.png?raw=true"
            };
        case 73:
            return {
                description: "Snow fall: Moderate intensity",
                image: "https://github.com/aslivingston/weather-app/blob/main/src/assets/little-snow-128.png?raw=true"
            };
        case 75:
            return {
                description: "Snow fall: Heavy intensity",
                image: "https://github.com/aslivingston/weather-app/blob/main/src/assets/little-snow-128.png?raw=true"
            };
        case 77:
            return {
                description: "Snow grains",
                image: "https://github.com/aslivingston/weather-app/blob/main/src/assets/snow-128.png?raw=true"
            };
        case 80:
            return {
                description: "Rain showers: Slight",
                image: "https://github.com/aslivingston/weather-app/blob/main/src/assets/rain-128.png?raw=true"
            };
        case 81:
            return {
                description: "Rain showers: Moderate",
                image: "https://github.com/aslivingston/weather-app/blob/main/src/assets/rain-128.png?raw=true"
            };
        case 82:
            return {
                description: "Rain showers: Violent",
                image: "https://github.com/aslivingston/weather-app/blob/main/src/assets/rain-128.png?raw=true"
            };
        case 85:
            return {
                description: "Snow showers: Slight",
                image: "https://github.com/aslivingston/weather-app/blob/main/src/assets/snow-storm-128.png?raw=true"
            };
        case 86:
            return {
                description: "Snow showers: Heavy",
                image: "https://github.com/aslivingston/weather-app/blob/main/src/assets/snow-storm-128.png?raw=true"
            };
        case 95:
            return {
                description: "Thunderstorms",
                image: "https://github.com/aslivingston/weather-app/blob/main/src/assets/storm-128.png?raw=true"
            };
        case 96:
            return {
                description: "Thunderstorm with slight hail",
                image: "https://github.com/aslivingston/weather-app/blob/main/src/assets/cloud-lighting-128.png?raw=true"
            };
        case 99:
            return {
                description: "Thunderstorm with heavy hail",
                image: "https://github.com/aslivingston/weather-app/blob/main/src/assets/cloud-lighting-128.png?raw=true"
            };
        default:
            return "Unknown weather code";
    }
}


function Weather({ date, maxTemp, minTemp, weatherCode }) {
    const {description, image, bgColour} = getWeatherDescription(weatherCode);

    return (
        <div className="weather-card" style={{ backgroundColor: bgColour }}>
            <img src={image} alt={description} />
            <div>
                {date}
            </div>
            <div>
                {minTemp} - {maxTemp}°C
            </div>
            <div>
                {description}
            </div>
            <br></br>
        </div>
    );
}

export default Weather;