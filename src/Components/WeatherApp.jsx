/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react'
import Search from '../assets/Search.png'
import Clear from '../assets/Clear.png'
import Cloud from '../assets/Cloud.png'
import Drizzle from '../assets/Drizzle.png'
import Humidity from '../assets/Humidity.png'
import Rain from '../assets/Rain.png'
import Snow from '../assets/Snow.png'
import Wind from '../assets/Wind.png'

const WeatherApp = () => {

  const inputRef = useRef();
  const [weatherInfo, setWeatherInfo] = useState(false);

  const allIcons = {
    "01d": Clear,
    "01n": Clear,
    "02d": Cloud,
    "02n": Clear,
    "03d": Clear,
    "03n": Clear,
    "04d": Drizzle,
    "04n": Drizzle,
    "09d": Rain,
    "09n": Rain,
    "10d": Rain,
    "10n": Rain,
    "13d": Snow,
    "13n": Snow,
  }

    const search = async (city) => {
      if(city === "") {
        alert("Please Enter City Name");
        return;
      }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

            const response = await fetch(url);
            const data = await response.json();

            if(!response.ok) {
              alert(data.message);
              return;
            }

            console.log(data);
            const icon = allIcons[data.weather[0].icon] || Clear;
            setWeatherInfo({
              humidity: data.main.humidity,
              wind: data.wind.speed,
              temperature: Math.floor(data.main.temp),
              location: data.name,
              icon:icon,
            })
        } catch (error) {
          setWeatherInfo(false);
          console.error("Error in Fetching Weather Data");
        }
    }

    useEffect(() => {
      search("Surat")
    },[])
    

  return (
    <div className='place-self-center p-6 md:p-8 bg-gradient-to-br from-[#0a192f] via-[#102a43] to-[#1f3c88] flex flex-col items-center rounded-3xl w-72 md:w-96 lg:w-[500px]'>

      {/* Search bar  */}
     <div className='flex items-center gap-3'>
        <input ref={inputRef} type="text" placeholder='Search here' className='h-[30px] md:h-[50px] text-base md:text-lg lg:text-xl font-medium border-none outline-none rounded-3xl pl-3 md:pl-6 text-[#626262] bg-[#ebfffc] w-48 md:w-auto lg:w-80' />
        <img src={Search} alt="" className='w-8 md:w-12 p-2 rounded-full cursor-pointer bg-[#ebfffc]'
        onClick={() => search(inputRef.current.value)} />
     </div>

     {weatherInfo ? <>
      {/* Weather Details */}
     <img src={weatherInfo.icon} alt="" className='w-20 md:w-28 lg:w-32 my-4 lg:my-7' />
     <p className='text-white text-3xl md:text-5xl lg:text-6xl font-semibold leading-tight'>{weatherInfo.temperature}°C</p>
     <p className='text-white text-xl md:text-2xl lg:text-3xl font-medium text-center'>{weatherInfo.location}</p>

      {/* Weather Data */}
     <div className='w-full mt-6 lg:mt-10 text-white flex justify-between'>
        <div className='flex items-start gap-3 text-xl mt-1'>
            <img src={Humidity} alt="" className='w-6 md:w-10 lg:w-14' />
            <div className=''>
                <p>{weatherInfo.humidity} %</p>
                <span className='block text-sm md:text-base lg:text-2xl'>Humidity</span>
            </div>
        </div>
        <div className='flex items-start gap-3 text-xl mt-1'>
            <img src={Wind} alt="" className='w-6 md:w-10 lg:w-14' /> 
            <div>
                <p>{weatherInfo.wind} Km/h</p>
                <span className='block text-sm md:text-base lg:text-2xl'>Wind Speed</span>
            </div>
        </div>
     </div>
     </> : <> </>}
    </div>
  )
}

export default WeatherApp
