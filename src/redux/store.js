/* eslint-disable prettier/prettier */
import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import homeReducer from './reducer';

const rootReducer = combineReducers({homeReducer});

export const Store = createStore(rootReducer, applyMiddleware(thunk));
