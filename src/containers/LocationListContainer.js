import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from './../actions'; // * = vamos a tomar todo lo que esté dentro del fichero 'actions'
import {getWeatherCities, getCity} from './../reducers';
import LocationList from './../components/LocationList';
import PropTypes from 'prop-types';

class LocationListContainer extends Component {

    componentDidMount() {
        const {setWeather, setSelectedCity, cities, city} = this.props;

        setWeather(cities);

        setSelectedCity(city);
    }
    
    handleSelectedLocation = city => {
        this.props.setSelectedCity(city);
    }
    
    render() {
        return (          
            <LocationList cities={this.props.citiesWeather}
                onSelectedLocation={this.handleSelectedLocation}
            ></LocationList>

        );
    }
}

LocationListContainer.propTypes = {
    setSelectedCity: PropTypes.func.isRequired,
    setWeather: PropTypes.func.isRequired,
    cities: PropTypes.array.isRequired,
    citiesWeather:PropTypes.array,
    city: PropTypes.string.isRequired,
};

// Aquí estamos inyectando la propiedad mapDispatchToProps al componente App
// Esta propiedad es una función que crea un objeto con una propiedad llamada setCity
// Dicha propiedad es una función que despacha (dispatch) la acción que crea setCity.
// La función creadora de acciones y la propiedad en este caso se llaman igual, pero no tiene por qué.
// ES DECIR:
// dispatch() es una función que despacha las acciones, que se pueden crear con
// una función creadora de acciones, en nuestro caso setCity.

//Versión que hicimos al principio
/*const mapDispatchToProps = dispatch => ({
    setCity: value => dispatch(setSelectedCity(value)),
    setWeather: cities => dispatch(setWeather(cities)),
});*/

//Nueva versión con el uso de bindActionCreators de Redux:
//se usa para simplificar código
//INVOCAMOS AL ACTION CREATOR
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

const mapStateToProps = state => ({
    citiesWeather: getWeatherCities(state),
    city: getCity(state),
});

 // connect() (high order component) es una función que recibe dos funciones y a la vez retorna una función.
 // La función que retorna, recibe un parámetro, que es un componente,
 // y  retorna otro componente "conectado". Se trata de un componente 'mejorado'
 // ya que está conectado con las funciones que recibe connect().
export default connect(mapStateToProps, mapDispatchToProps)(LocationListContainer);