import { combineReducers } from 'redux';

const initialState = {customerId: undefined, name: undefined, email: undefined};

const user = ( state = initialState, action) => {
    switch(action.type){
        case 'LOGIN':
            state = action.payload;
            return state;
        case 'LOGOUT':
            state = {customerId: undefined, name: undefined, email: undefined}
            return state;
        default :
            return state;
    }
};


const allReducers = combineReducers({
    user,
});

export default allReducers;