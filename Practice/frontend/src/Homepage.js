import React from 'react'
import  { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = 'bab23b21341ec217fb8b7b481202a896'; 
const CITY = 'Faridabad'; 
const Homepage = () => {
    const [weatherData, setWeatherData] = useState(null);
    useEffect(() => {
        const fetchWeather = async () => {
          try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}`);
            setWeatherData(response.data);
          } catch (error) {
            console.error('Error fetching weather data:', error);
          }
        };
    
        fetchWeather();
      }, []);
  return (
    <>
     <h1>Weather Information</h1>
      {weatherData ? (
        <div>
          <h2>{weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </>
  )
}

export default Homepage