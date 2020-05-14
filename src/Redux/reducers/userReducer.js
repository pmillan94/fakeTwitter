//Import types
import { SET_USER, SET_AUTHENTICATED, SET_UNAUTHENTICATED, LOADING_USER, LIKE_SCREAM, UNLIKE_SCREAM, MARK_NOTIFICATIONS_READ } from '../types';
  
  //create object of state
  const initialState = {
    authenticated: false,
    loading: false,
    credentials: {},
    likes: [],
    notifications: []
  };
  
  //func to handle userState
  export default function(state = initialState, action) {
      //if authenticated
    switch (action.type) {
      case SET_AUTHENTICATED:
        return {
          ...state,
          authenticated: true
        };
        //if not authenticated
      case SET_UNAUTHENTICATED:
        return initialState;
        //if set_user action called, set auth to true and get data
      case SET_USER:
        return {
          authenticated: true,
          loading: false,
          ...action.payload
        };
        //if loading_user return state, and loading = true
      case LOADING_USER:
        return {
          ...state,
          loading: true
        };
        //if like_scream action is called
      case LIKE_SCREAM:
          //return the array of likes in post
        return {
          ...state,
          likes: [
            ...state.likes,
            {
              //add new like
              userHandle: state.credentials.handle,
              screamId: action.payload.screamId
            }
          ]
        };
      case UNLIKE_SCREAM:
        return {
          ...state,
          likes: state.likes.filter(
            (like) => like.screamId !== action.payload.screamId
          )
        };
      case MARK_NOTIFICATIONS_READ:
        state.notifications.forEach((not) => (not.read = true));
        return {
          ...state
        };
      default:
        return state;
    }
  }