import {SET_CITY} from './../actions';
// ESTO ES UN REDUCER:

// Si la accion indica una ciudad distinta a la del estado inicial,
// el reducer city devuelve el nuevo estado que será el estado anterior,
// con el valor de la acción. El estado inicial no se sobreescribe,
// se crea un nuevo estado.
export const city = (state = {}, action) => {
    switch (action.type) {
        case SET_CITY:
            return action.payload;
    
        default:
            return state;
    }
}

// ** Con state = {} nos aseguramos que si el estado viene indefinido, se
// le asigne un estado inicial, en este caso un objeto vacío.

// ** Con el spread operator (...) se desglosa el objeto state y, si existe
// la propiedad city, le asigna el valor action.payload. Si no existiera esta
// propiedad, la crea en dicho objeto.