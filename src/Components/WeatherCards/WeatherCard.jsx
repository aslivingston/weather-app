import { useEffect, useState } from "react"
import Weather from "./Weathers/Weather"

function WeatherCard() {

    const [weatherData, setWeatherData] = useState(null)

    useEffect(getWeatherInfo, [])

    function getWeatherInfo() {
        fetch('https://api.open-meteo.com/v1/forecast?latitude=51.5085&longitude=-0.1257&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum&timezone=Europe%2FLondon')
        .then(function (response) {
            return response.json()
        }) . then(function (data) {
            console.log(data.daily)
            setWeatherData(data.daily)
        })
    }

    return (

        <div>
            <h1>Weather</h1>
            <h2>Below is the weather for the next 7 days in London</h2>
            {weatherData && (
            <p className="daily-card">
             {weatherData.time.map((date, index) => (
                <Weather
                    key={index}
                    date={date}
                    maxTemp={weatherData.temperature_2m_max[index]}
                    minTemp={weatherData.temperature_2m_min[index]}
                    weatherCode={weatherData.weather_code[index]}
                />
                ))}
             </p>
            )}
      </div>


)

}

export default WeatherCard