import React from 'react';
import PropTypes from 'prop-types';
import WeatherLocation from './WeatherLocation';
import './styles.css';
 //Añadimos key para mas eficiencia
 //Cuando algo cambie, se añada una ciudad,
 //las que ya estan renderizadas no volveran
 //a hacerlo

const LocationList = ({cities, onSelectedLocation}) => {
    const handleWeatherLocationClick = city => {
        onSelectedLocation(city);
    };
    //Llaves porque voy a escribir en JavaScript
    //Con llaves SIEMPRE return
    const strToComponents = cities => (
        cities.map(city => 
            
             (<WeatherLocation 
                key={city.key} 
                city={city.name}
                onWeatherLocationClick = {() => handleWeatherLocationClick(city.name)}
                data={city.data}
             ></WeatherLocation>))
            
    );

    return (
    <div className ="locationList">
        {strToComponents(cities)}
    </div>
    );
};


LocationList.propTypes = {
    cities: PropTypes.array.isRequired,
    onSelectedLocation: PropTypes.func,
};

export default LocationList;