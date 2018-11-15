import {SET_FORECAST_DATA, GET_WEATHER_CITY, SET_WEATHER_CITY} from './../actions';
import toPairs from 'lodash.topairs';
import {createSelector} from 'reselect';

// Aquí el state no se refiere al estado global de la aplicación, si no al estado
// concreto manejado por esete reducer, que en este caso es la parte que maneja el
// el cambio de ciudad.
export const cities = (state = {}, action) => {
    switch (action.type){
        case SET_FORECAST_DATA: {
            const {city, forecastData} = action.payload; //destructuring
            return {...state, [city]: {...state[city], forecastData, forecastDataDate: new Date()}}; //forecastData: forecastData
            // [city] nos viene el nombre de la ciudad, con esto estamos estableciendo
            // ese nombre como'clave' (key) del diccionario de ciudades
            // usamos el spread operator para no eliminar los datos que teniamos antes
            // (weather), porque si no lo usamos, solo vamos a tener el forecastData pero
            // no el weather.
            // si la city no contenía el forecastData, se añade
            // si ya tenía uno, se refresca
        }
        case GET_WEATHER_CITY: {
            const city = action.payload;
            return {...state, [city]: {...state[city], weather: null}};
            // Establcemos weather a null para que nos aparezca la barra de loading
            // mientras el servidor nos da la info
        }
        case SET_WEATHER_CITY: {
            const {city, weather} = action.payload;
            return {...state, [city]: {...state[city], weather}};
        }
        default:
            return state;
    }
};

//Esto son SELECTORs: no modifica parámetros si estos no han sido cambiados = +eficiencia.
export const getForecastDataFromCities = 
    createSelector((state, city) => state[city] && state[city].forecastData, forecastData => forecastData);
// "Dame el state de la city que se está seleccionando si su valor es nulo, y si no lo es,
// dame directamente su forecastData".
// con state[city] lo que estamos haciendo es acceder al valor del diccionario cuyo identificador
// es el nombre de la ciudad.

// con la librería 'lodash' obtenemos la función 'toPairs' que nos va a permitir
// pasar de una estructura en objeto a un array. La función toma las propiedades
// un objeto y crea un array que en cada posición vuelve a tener arrays. Cada uno
// de estos arrays contiene la(s) propiedad(es) (key) y el valor de esa propiedad (o valores)
const fromObjectToArray = cities => (toPairs(cities).map(([key, value]) => ({key, name: key, data: value.weather})));

export const getWeatherCities =
    createSelector(state => fromObjectToArray(state), cities => cities);