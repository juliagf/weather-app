import transformForecast from './../services/transformForecast';
import transformWeather from './../services/transformWeather';
// Creamos esta constante que va a ser el identificador
// unívoco de esta acción, y lo hacemos así para evitar errores
// de typo, entre otras cosas...
export const SET_CITY = 'SET_CITY';
export const SET_FORECAST_DATA = 'SET_FORECAST_DATA'; 

export const GET_WEATHER_CITY = 'GET_WEATHER_CITY';
export const SET_WEATHER_CITY = 'SET_WEATHER_CITY';

const setCity = payload => ({type: SET_CITY, payload});
const setForecastData = payload => ({type: SET_FORECAST_DATA, payload});
// payload = value, por convención se le llama payload.
//payload=array con todas las cities

const getWeatherCity = payload => ({type: GET_WEATHER_CITY, payload});
const setWeatherCity = payload => ({type: SET_WEATHER_CITY, payload});


const api_key = "aaf0d0b7ec2d8825952459e2ec6213cc";
const url= "http://api.openweathermap.org/data/2.5/forecast";
const url_weather = "http://api.openweathermap.org/data/2.5/weather";

// Esto es una acción que a su vez llama a otras acciones para modificar el estado:
export const setSelectedCity = payload => {
    return (dispatch, getState) => { // estos dos parámetros nos los ofrece redux-thunk
        // en lugar de fetch podemos usar axios
        // que está en una librería y es más soportada
        // por navegadores más antiguos
        // payload = ciudad seleccionada
        const url_forecast = `${url}?q=${payload}&appid=${api_key}`;
        
        //Acción inicial: activar en el estado un indicador de búsqueda de datos.
        
        dispatch(setCity(payload)); // establecer ciudad actual
        // Vamos a hacer que si se pincha dos veces seguidas en la misma ciudad, no se
        // vuelva a pedir datos al servidor, porque no ha pasado el tiempo suficiente para
        // que cambien:
        const state = getState(); //esta función devuelve el estado global de la aplicación
        const date = state.cities[payload] && state.cities[payload].forecastDataDate;
        const now = new Date();

        if (date && ((now - date) < 1*60*1000)){
            return;
        } //Aqui, si no ha pasado 1 min (porque está en ms), no se hace fetch

        return fetch(url_forecast).then(
            data => (data.json())
        ).then( //Aquí ya tengo los datos.
            weather_data => {
                const forecastData = transformForecast(weather_data);

                //Aquí modifico el estado con el resultado de la promise (fetch).
                //Se establece el pronóstico extendido de la ciudad selccionada.
                dispatch(setForecastData({city: payload, forecastData}));
            }
        );
    };
};


export const setWeather = payload => {
    return dispatch => {
        payload.forEach(city => { 
            const api_weather = `${url_weather}?q=${city}&appid=${api_key}`;
            dispatch(getWeatherCity(city));

            //Solicito info al servidor
            fetch(api_weather).then(data => {
                return data.json();
            }).then(weather_data => {
                //El servidor me da la info y la transformo
                const weather = transformWeather(weather_data);
            
                dispatch(setWeatherCity({city, weather}));
            });
        });
    }
};