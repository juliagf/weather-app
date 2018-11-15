import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import PropTypes from 'prop-types';
import ForecastItem from './ForecastItem';
import './styles.css';

const renderForecastItemDays = (forecastData) => {
    return forecastData.map(forecast => (
        <ForecastItem 
            key={`${forecast.weekDay}${forecast.hour}`}
            weekDay={forecast.weekDay}
            hour={forecast.hour} 
            data={forecast.data}
        ></ForecastItem>
    ));
}

const renderProgress = () => {
    return (
        <div>
            <h2 className='forecast-loading'>Loading forecast extended</h2>
            <LinearProgress size={50} color='secondary'></LinearProgress>
        </div>
    );
}

const ForecastExtended = ({city, forecastData}) => (
  
    <div>
        <h2 className='forecast-title'>Forecast extended for: {city}</h2>
            {
                forecastData ? 
                    renderForecastItemDays(forecastData) :
                    renderProgress()
            }
    </div>
        
);

ForecastExtended.propTypes = {
    city: PropTypes.string.isRequired,
    forecastData: PropTypes.array,
}

export default ForecastExtended;