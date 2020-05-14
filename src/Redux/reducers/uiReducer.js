//import types
import { SET_ERRORS, CLEAR_ERRORS, LOADING_UI, STOP_LOADING_UI } from '../types';
  
//creat an object
  const initialState = {
    loading: false,
    errors: null
  };
  
  //func that handles state of object
  export default function(state = initialState, action) {
    //create switch to handle different actions depending on types called
    switch (action.type) {
      //if set_errors called 
      case SET_ERRORS:
        return {
          ...state,
          loading: false,
          errors: action.payload
        };
        
      case CLEAR_ERRORS:
        return {
          ...state,
          loading: false,
          errors: null
        };
      case LOADING_UI:
        return {
          ...state,
          loading: true
        };
      case STOP_LOADING_UI:
        return {
          ...state,
          loading: false
        };
      default:
        return state;
    }
  }