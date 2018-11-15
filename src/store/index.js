import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import reducers from './../reducers/';

const initialState = {
    city: 'Granada,es',
};

//Esto es una herramienta de debugging:
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Esto está en la documentación de Redux Devtools en GitHub
// store = createStore (reducer, initialState, window.__REDUX....)
/*export const store = createStore(city, initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
*/
//Modificamos lo anterior para usar reduct-thunk, viene especificado
//en la documentación.

export const store = createStore(reducers, initialState, composeEnhancers(applyMiddleware(thunk)));
