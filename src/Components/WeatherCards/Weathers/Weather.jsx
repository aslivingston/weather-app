function getWeatherDescription(code) {
    switch (code) {
        case 0:
            return {
                description: "Clear sky",
                image: "https://github.com/aslivingston/weather-app/blob/main/src/assets/sun-128.png?raw=true"
            };
        case 1:
        case 2:
        case 3:
            return {
                description: "Mainly clear, partly cloudy, and overcast",
                image: "https://github.com/aslivingston/weather-app/blob/main/src/assets/partly-cloudy-day-128.png?raw=true"
            };
        case 45:
        case 48:
            return {
                description: "Fog and depositing rime fog",
                image: "https://github.com/aslivingston/weather-app/blob/main/src/assets/fog-day-128.png?raw=true"
            };
        case 51:
        case 53:
        case 55:
            return {
                description: "Drizzle: Light, moderate, and dense intensity",
                image: "https://github.com/aslivingston/weather-app/blob/main/src/assets/little-rain-128.png?raw=true"
            };
        case 56:
        case 57:
            return {
                description: "Freezing Drizzle: Light and dense intensity",
                image: ""
            };
        case 61:
        case 63:
        case 65:
            return {
                description: "Rain: Slight, moderate and heavy intensity",
                image: "https://github.com/aslivingston/weather-app/blob/main/src/assets/rain-128.png?raw=true",
                bgColour: "#82dcff"
            };
        case 66:
        case 67:
            return {
                description: "Freezing Rain: Light and heavy intensity",
                image: "https://github.com/aslivingston/weather-app/blob/main/src/assets/sleet-128.png?raw=true"
            };
        case 71:
        case 73:
        case 75:
            return {
                description: "Snow fall: Slight, moderate, and heavy intensity",
                image: "https://github.com/aslivingston/weather-app/blob/main/src/assets/little-snow-128.png?raw=true"
            };
        case 77:
            return {
                description: "Snow grains",
                image: "https://github.com/aslivingston/weather-app/blob/main/src/assets/snow-128.png?raw=true"
            };
        case 80:
        case 81:
        case 82:
            return {
                description: "Rain showers: Slight, moderate, and violent",
                image: "https://github.com/aslivingston/weather-app/blob/main/src/assets/rain-128.png?raw=true"
            };
        case 85:
        case 86:
            return {
                description: "Snow showers slight and heavy",
                image: "https://github.com/aslivingston/weather-app/blob/main/src/assets/snow-storm-128.png?raw=true"
            };
        case 95:
            return {
                description: "Thunderstorm: Slight or moderate",
                image: "https://github.com/aslivingston/weather-app/blob/main/src/assets/storm-128.png?raw=true"
            };
        case 96:
        case 99:
            return {
                description: "Thunderstorm with slight and heavy hail",
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
            <div>
                {date}
            </div>
            <div>
                {maxTemp}°C,{" "}
            </div>
            <div>
                {minTemp}°C
            </div>
            <div>
                {description}
            </div>
            <img src={image} alt={description} />
            <br></br>
        </div>
    );
}

export default Weather;