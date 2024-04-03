import React, { useState } from "react";
import './Weather.css';
import SunImage from './img/sol.png';
import MoonImage from './img/icons8-lua-brilhante-16.png';
import CloudSunImage from './img/icons8-sol-e-nuvem-48.png';
import CloudMoonImage from './img/icons8-nuvem-e-lua-100.png';
import CloudImage from './img/icons8-nuvem-48.png';

import Video from './img/fundo-video.mp4';

const API_KEY = "2b7ecd77cb5c7164d356c5e26164f0c3";

const Weather = () => {
    const [city, setCity] = useState("");
    const [location, setLocation] = useState("");
    const [temperature, setTemperature] = useState("");
    const [description, setDescription] = useState("");
    const [weatherIcon, setWeatherIcon] = useState(null);

    const imageMap = {
        '01d': SunImage,
        '01n': MoonImage,
        '02d': CloudSunImage,
        '02n': CloudMoonImage,
        '03d': CloudImage, 
        '04d': CloudImage, 
        '04n': CloudImage,
    };

    const updateWeather = (iconCode) => {
        if (imageMap[iconCode]) {
            setWeatherIcon(imageMap[iconCode]);
        } else {
            setWeatherIcon(null); 
        }
    };

    const handleSearch = () => {
        if (city) {
            fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
            )
            .then((response) => {
                if (!response.ok) {
                    throw new Error("cidade não encontrada!");
                }
                return response.json();
            })
            .then((data) => {
                const cityName = data.name;
                const temp = data.main.temp;
                const desc = data.weather[0].description;
                const icon = data.weather[0].icon;

                setLocation(`Cidade: ${cityName}`);
                setTemperature(`temperatura: ${temp.toFixed(1)} °C`);
                setDescription(`Descrição: ${desc}`);
                updateWeather(icon);
            })
            .catch((error) => {
                console.error("erro ao buscar a previsão do tempo:", error)
                setLocation("erro ao verificar a previsão do tempo, verifique sua cidade.");
                setTemperature("");
                setDescription("");
                setWeatherIcon(null);
            });
        } else {
            setLocation("");
            setTemperature("");
            setDescription("");
            setWeatherIcon(null);
        }
    };

    return (
        <div className="weather-container">
            <video autoPlay loop muted className="video-background"> 
                <source src={Video} type="video/mp4" />
            </video>
            <div className="weather-content">
                <h1>PREVISÃO  TEMPO</h1>
                <input
                    type="text"
                    placeholder="Digite uma localidade aqui"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <button onClick={handleSearch}>Buscar..</button>
                <div id="weather-info">
                    <div id="location">{location}</div>
                    <div id="temperature">{temperature}</div>
                    <div id="description">{description}</div>
                    <div id="weather-icon">
                        {weatherIcon && <img src={weatherIcon} alt="Weather Icon" />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Weather;
