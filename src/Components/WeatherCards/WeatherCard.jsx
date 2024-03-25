import { useState, useEffect } from "react";
import Weather from "./Weathers/Weather";
import FutureWeather from "./Weathers/FutureWeather";

function WeatherCard() {
    const [weatherData, setWeatherData] = useState(null);
    const [locationData, setLocationData] = useState([]);
    const [search, setSearch] = useState('');
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [bodyBgColor, setBodyBgColor] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (latitude !== null && longitude !== null) {
            getWeatherInfo();
        }
    }, [latitude, longitude]);

    function getLocationData() {
        fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${search}&count=1`)
            .then(response => response.json())
            .then(data => {
                setLocationData(data.results);
                // Extract latitude and longitude from the first search result
                if (data.results.length > 0) {
                    const newLatitude = data.results[0].latitude;
                    const newLongitude = data.results[0].longitude;
                    if (newLatitude !== latitude || newLongitude !== longitude) {
                        // Latitude or longitude has changed, fetch weather data
                        setLatitude(newLatitude);
                        setLongitude(newLongitude);
                        setError('');
                        getWeatherInfo(); // Fetch weather data
                    } else {
                        // Latitude and longitude are the same, no need to fetch weather data
                        setError('');
                    }
                } else {
                    setLatitude(0);
                    setLongitude(0);
                    setError('Location not found. Please enter a valid location');
                    setWeatherData(null); // Remove the currently loaded weather data
                }
            })
            .catch(error => {
                console.error('Error fetching location data:', error);
                setError('An error occurred retrieving location data.');
                setWeatherData(null); // Remove the currently loaded weather data
            });
    }

    function clickHandler(e) {
        e.preventDefault();
        if (search !== '') {
            getLocationData();
        } else {
            setError('Please enter a location.')
            setWeatherData(null)
            setLocationData(null);
        };
    }

    function getWeatherInfo() {
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum&timezone=Europe%2FLondon&forecast_days=5`)
            .then(response => response.json())
            .then(data => {
                console.log(data.daily);
                setWeatherData(data.daily);
                setBodyBgColor(getBodyBgColor(data.daily.weather_code[0]));
            })
            .catch(error => console.error('Error fetching weather data:', error));
    }

    function getBodyBgColor(weatherCode) {
        // Define color mappings based on weather code
        switch (weatherCode) {
            case 0:
                return '#F2E205'; // Clear sky
            case 1:
            case 2:
            case 3:
                return '#F2A057'; // Mainly clear, partly cloudy, overcast
            case 45:
            case 48:
                return '#63706D'; // Fog
            case 51:
            case 53:
            case 55:
            case 56:
            case 57:
            case 61:
            case 63:
            case 65:
                return '#89C1F5'; // Drizzle / rain
            case 66:
            case 67:
            case 77:
            case 85:
            case 86:
                return '#F2EAE4'; // Snow / sleet
            case 71:
            case 73:
            case 75:
            case 80:
            case 81:
            case 82:
            case 95:
            case 96:
            case 99:
                return '#3C3D40'; // Heavy-rain / thunder
            default:
                return '#F2EAE4'; // Default color
        }
    }

    useEffect(() => {
        // Apply background color to body
        document.body.style.backgroundColor = bodyBgColor;
    }, [bodyBgColor]);

    return (
        <div>
            <form className="form-container" onSubmit={clickHandler}>
                <input
                    className="city"
                    type="text"
                    placeholder="Enter: City, Town"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{ backgroundColor: bodyBgColor }}
                />
                <input className="button" type="submit" value="Search" style={{ backgroundColor: bodyBgColor }}/>
            </form>

            {error && <small className="error">{error}</small>}

            {weatherData && (
                <div>
                    <Weather
                        date={weatherData.time[0]}
                        maxTemp={weatherData.temperature_2m_max[0]}
                        minTemp={weatherData.temperature_2m_min[0]}
                        weatherCode={weatherData.weather_code[0]}
                    />
                </div>
            )}
            <div className="location">
                <small>
                {Array.isArray(locationData) && locationData.map((location, index) => (
                    <small key={index}>{location.name}, {location.country}</small>
                ))}
                </small>
            </div>

            {weatherData && (
                <div className="future-daily-card">
                    {weatherData.time.slice(1).map((date, index) => (
                        <FutureWeather
                            key={index}
                            date={date}
                            maxTemp={weatherData.temperature_2m_max[index + 1]}
                            minTemp={weatherData.temperature_2m_min[index + 1]}
                            weatherCode={weatherData.weather_code[index + 1]}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default WeatherCard;
