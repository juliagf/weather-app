import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import {PropTypes} from 'prop-types';
import Location from './Location';
import WeatherData from './WeatherData';
import './styles.css';


const WeatherLocation = ({onWeatherLocationClick, city, data}) => (
    <div className="weatherLocationCont" onClick={onWeatherLocationClick}>
        <Location city = {city}></Location>
        {data ? <WeatherData data = {data} ></WeatherData> : 
        <LinearProgress size={50}></LinearProgress>}
    </div>
);

WeatherLocation.propTypes = {
    city: PropTypes.string,
    onWeatherLocationClick: PropTypes.func,
    data: PropTypes.shape(
        {
           temperature: PropTypes.isRequired,
           weatherState: PropTypes.string.isRequired,
           humidity: PropTypes.number.isRequired,
           wind: PropTypes.string.isRequired,
        }),
}

export default WeatherLocation;