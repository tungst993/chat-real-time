import { createStore, combineReducers } from 'redux';
import username from './reducers/username';

const reducers = combineReducers({
    username,
})

export default createStore(reducers)