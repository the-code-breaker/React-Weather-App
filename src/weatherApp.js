import React, { useEffect, useState } from 'react'
import "./CSS/style.css"


const getTime = (date) => {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  let newDate = new Date()
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();




const WeatherApp = () => {

    const[err, seterr] = useState(false);
    const [currcity, setCity] = useState("mandi");
    const [currWind, setWind] = useState("");
    const [pressure, setPressure] = useState("");
    const [humidity, setHumidity] = useState("");
    const [temperature, setTemperature] = useState("");
    const [sunset, setSunset] = useState("");
    const [weather, setWeather] = useState("");
    const [country, setCountry] = useState("");
    const [weathermood, setWeathermood] = useState("");

    const[info, setInfo] = useState(true);

    const getWeather = async() => {
        try{
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${currcity}&appid=0c51b41a2798c6ee9a72b5d5eb54eae5`;
            const res = await fetch(url);
            const data = await res.json();
            setWind(data.wind.speed);
            setPressure(data.main.pressure);
            setHumidity(data.main.humidity);
            let temp = data.main.temp - 273.15;
            setTemperature(Math.round(temp));
            let sec = data.sys.sunset;
            let date = new Date(sec * 1000);
            
            let timeStr = `${Math.abs(date.getHours()-12)} : ${date.getMinutes()}`
            setSunset(timeStr);
            
            setWeather(data.weather[0].description);
            let sky = data.weather[0].main;
            switch(sky){
                case "Clouds":  
                setWeathermood("fa-solid fa-cloud");
                break;
                case "Clear":  
                setWeathermood("fa-solid fa-cloud-sun");
                break;
                case "Haze":  
                setWeathermood("fa-solid fa-smog");
                break;
                case "Rain":  
                setWeathermood("fa-solid fa-cloud-rain");
                break;
                default:
                setWeathermood("")
            }
            console.log(data.weather[0].main)
            setCountry(data.sys.country);
            seterr(false)
        }
        catch(error){
            seterr(true)
        }
    }
    const date = new Date().toDateString();

    const handleKeyDown = (e) => {
        if(e.key == 'Enter'){
            getWeather();
        }
    }


    useEffect(()=>{
        getWeather();
    }, [])
    
    return (
        <>
        <h1 id='headline'>Find Your City Weather</h1>
            
        <div className="container">
            <div className="search-container">
                <input type="text" onKeyDown={handleKeyDown} className='search' placeholder='search your city here...' onChange={(e)=> setCity(e.target.value)} />
                <i class="fa-solid fa-magnifying-glass" onClick={getWeather}></i>
            </div>

      
    {err ? <span style={{fontSize:"1.4rem"}}>City Not Found!</span> :
     <>
    
     <span><span>Today</span> <br></br><span style={{fontSize:"2rem", fontWeight:"bold", textTransform:"capitalize"}} >{currcity}</span> <span style={{fontSize:"1.3rem"}}> {country} <i class="fa-solid fa-location-dot"></i></span><br></br>Weather Report, <br></br><span style={{textTransform:"capitalize", fontSize:"1.3rem"}}>{weather}</span> </span> 
     
    <div className="info-container">

    <div className="temp-container">
    <div className="timeDay-container">
    
    <i id='weathermood' class={weathermood} style={{fontSize:"5rem"}}></i> 
  
                     <div className="insideTime">
            <span>{getTime(new Date)}</span>
            <span style={{fontWeight:"bold"}}>{date}</span>
        </div>
    </div>
    <p id='temp' style={{fontSize:"4rem", fontWeight: "bold"}}>{temperature}&deg;C</p>
    
    </div>
    


    <div className="completeForecast">
        <div className="sunset forecast">
            <h3>SUNSET</h3>
            <i class="fa-regular fa-sun"></i>
            <p>{sunset} PM</p>
        </div>
    <div className="humidity forecast">
    <h3>HUMIDITY</h3>
        <i class="fa-solid fa-droplet"></i>
        <p>{humidity}</p>
    </div>
    <div className="pressure forecast">
    <h3>Pressure</h3>
        <i class="fa-solid fa-cloud-showers-heavy"></i>
        <p>{pressure}</p>
    </div>
    <div className="wind forecast">
    <h3>WIND</h3>
        <i class="fa-solid fa-wind"></i>
        <p>{currWind}</p>
    </div>
    </div>
    </div>  
    </> 
    }
    

        </div>
    </>
  )
}

export default WeatherApp;