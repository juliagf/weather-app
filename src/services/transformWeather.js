import convert from 'convert-units';
import {
    CLOUD,
    SUN,
    RAIN,
    SNOW,
    THUNDER,
    DRIZZLE,
} from './../constants/weathers';

const getTemp = kelvin => {
    return convert(kelvin).from("K").to("C").toFixed(0);
};

const getWeatherState = weather => {
    const {id} = weather;
    // Independizamos los iconos de OpenWeather
    // Consultar documentacion
    if (id < 300){
        return THUNDER;
    }else if (id < 400){
        return DRIZZLE;
    }else if (id < 500){
        return RAIN;
    }else if (id < 700){
        return SNOW;
    }else if (id === 800){
        return SUN;
    }else {
        return CLOUD;
    }
};

const transformWeather = weather_data => {
    const {humidity, temp} = weather_data.main;
    const {speed} = weather_data.wind;
    const weatherState = getWeatherState(weather_data.weather[0]);
    const temperature = getTemp(temp);

    const data = {
        humidity,
        temperature, //short-hand property object literals
        weatherState,
        wind: `${speed} m/s`,
    }
    return data;
};

export default transformWeather;