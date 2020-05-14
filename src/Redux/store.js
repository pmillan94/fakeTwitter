import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

//import reducers
import userReducer from './reducers/userReducer';
import dataReducer from './reducers/dataReducer';
import uiReducer from './reducers/uiReducer';

//create empty object
const initialState = {};

//create array of thunk type
const middleware = [thunk];

//func to combine reducer var into one object
const reducers = combineReducers({
  user: userReducer,
  data: dataReducer,
  UI: uiReducer
});


const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

//create enhancer
const enhancer = composeEnhancers(applyMiddleware(...middleware));

//create store
const store = createStore(reducers, initialState, enhancer);

export default store;