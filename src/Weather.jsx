import React, { useState } from "react";
import "./Weather.css";
import Sol from "./img/sol.svg";
import Lua from "./img/lua.svg";
import Nuvenscomsoldia from "./img/nuvenscomsoledispersasdia.svg";
import Nuvenscomluanoite from "./img/nuvenscomluaedispersasnoite.svg";
import Nuvensdispersasdia from "./img/nuvensdispersasdia.svg";
import Nuvensdispersasnoite from "./img/nuvensdispersasnooite.svg";
import Nuvensquebradasdia from "./img/nuvensquebradasdia.svg";
import Nuvensquebradasnoite from "./img/nuvensquebradasnoite.svg";
import Chuvadia from "./img/chuvadia.svg";
import Chuvanoite from "./img/chuvafortenoite.svg";
import Chuvafracadia from "./img/chuvadia.svg";
import Chuvafracanoite from "./img/chuvanoite.svg";
import Chuvatrovaodia from "./img/chuvatrovaodia.svg";

import Video from "./img/fundo-video.mp4";

const API_KEY = "2b7ecd77cb5c7164d356c5e26164f0c3";

const Weather = () => {
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [temperature, setTemperature] = useState("");
  const [description, setDescription] = useState("");
  const [weatherIcon, setWeatherIcon] = useState(null);

  const imageMap = {
    "01d": Sol,
    "01n": Lua,
    "02d": Nuvenscomsoldia,
    "02n": Nuvenscomluanoite,
    "03d": Nuvensdispersasdia,
    "03n": Nuvensdispersasnoite,
    "04d": Nuvensquebradasdia,
    "04n": Nuvensquebradasnoite,
    "09d": Chuvadia,
    "09n": Chuvanoite,
    "10d": Chuvafracadia,
    "10n": Chuvafracanoite,
    "11d": Chuvatrovaodia,
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
          const temp = Math.round(data.main.temp);
          const desc = data.weather[0].description;
          const icon = data.weather[0].icon;

          setLocation(`Cidade:  ${cityName}`);
          setTemperature(`temperatura: ${temp}°C`);
          setDescription(`Detalhes:  ${desc}`);
          updateWeather(icon);
        })

        .catch((error) => {
          console.error("erro ao buscar a previsão do tempo:",error);
          setLocation("erro, verifique sua cidade!.");
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
        <h1>PREVISÃO DO TEMPO</h1>
        <input
          type="text"
          placeholder="Digite uma cidade"
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
};

export default Weather;
