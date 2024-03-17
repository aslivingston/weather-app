import { useState, useEffect } from "react";
import Weather from "./Weathers/Weather";

function WeatherCard() {
    const [weatherData, setWeatherData] = useState(null);
    const [locationData, setLocationData] = useState([]);
    const [search, setSearch] = useState('');
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);

    useEffect(() => {
        if (latitude !== null && longitude !== null) {
            getWeatherInfo();
        }
    }, [latitude, longitude]);

    function getLocationData() {
        fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${search}&count=1`)
            .then(response => response.json())
            .then(data => {
                console.log(data.results);
                setLocationData(data.results);
                // Extract latitude and longitude from the first search result
                if (data.results.length > 0) {
                    setLatitude(data.results[0].latitude);
                    setLongitude(data.results[0].longitude);
                } else {
                    setLatitude(null);
                    setLongitude(null);
                }
            })
            .catch(error => console.error('Error fetching location data:', error));
    }

    function clickHandler(e) {
        e.preventDefault();
        getLocationData();
    }

    function getWeatherInfo() {
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum&timezone=Europe%2FLondon&forecast_days=1`)
            .then(response => response.json())
            .then(data => {
                console.log(data.daily);
                setWeatherData(data.daily);
            })
            .catch(error => console.error('Error fetching weather data:', error));
    }

    return (
        <div>
            <h1>Weather App</h1>
            <h2>Find the weather forecast in your area:</h2>
            <form onSubmit={clickHandler}>
                <input
                    className="w-[30rem] md:w-[43rem] rounded placeholder:pl-2"
                    type="text"
                    placeholder="Enter: City, Town"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <input className="button" type="submit" value="Search" />
                <form>
                    <input type="number" min="1" max="7" placeholder="Select No. Forecast Days" />
                    <input className="button" type="submit" value="Filter" />
                </form>
                <h3>
                    {locationData.map((location, index) => (
                        <h3 key={index}>{location.name}, {location.country}</h3>
                    ))}
                </h3>
            </form>

            {weatherData && (
                <div className="daily-card">
                    {weatherData.time.map((date, index) => (
                        <Weather
                            key={index}
                            date={date}
                            maxTemp={weatherData.temperature_2m_max[index]}
                            minTemp={weatherData.temperature_2m_min[index]}
                            weatherCode={weatherData.weather_code[index]}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default WeatherCard;
