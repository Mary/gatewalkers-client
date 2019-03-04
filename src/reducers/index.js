
import { combineReducers } from 'redux';
import userReducer from './userReducer';
import authReducer from './authReducer';
import newsletterReducer from './newsletterReducer';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
    authReducer,
    userReducer,
    newsletterReducer,
    form : formReducer
})

export default rootReducer