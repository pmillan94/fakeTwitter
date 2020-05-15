import { SET_SCREAMS, LIKE_SCREAM, UNLIKE_SCREAM, LOADING_DATA,
    DELETE_SCREAM, POST_SCREAM, SET_SCREAM, SUBMIT_COMMENT } from '../types';
  
//create empty object
  const initialState = {
    screams: [],
    scream: {},
    loading: false
  };
  

//create a switch func to store different values to object depending on action called
  export default function(state = initialState, action) {
    switch (action.type) {
      case LOADING_DATA:
        return {
          ...state,
          loading: true
        };
      case SET_SCREAMS:
        return {
          ...state,
          screams: action.payload,
          loading: false
        };
      case SET_SCREAM:
        return {
          ...state,
          scream: action.payload
        };
      case LIKE_SCREAM:
      case UNLIKE_SCREAM:
        //create a var to get the index of that scream
        let index = state.screams.findIndex(
          (scream) => scream.screamId === action.payload.screamId
        );
        //once you have the index scream, replace the action payload with it
        state.screams[index] = action.payload;
        
        //if screamId value is the same as in the payload, update the value of it from the payload 
        if (state.scream.screamId === action.payload.screamId) {
          state.scream = action.payload;
        }
        return {
          ...state
        };
      case DELETE_SCREAM:
        //find index of scream
        index = state.screams.findIndex(
          (scream) => scream.screamId === action.payload
        );
        //updated state
        state.screams.splice(index, 1);
        //return state
        return {
          ...state
        };
      case POST_SCREAM:
        return {
          ...state,
          screams: [action.payload, ...state.screams]
        };
      case SUBMIT_COMMENT:
        return {
          ...state,
          scream: {
            ...state.scream,
            comments: [action.payload, ...state.scream.comments]
          }
        };
      default:
        return state;
    }
  }