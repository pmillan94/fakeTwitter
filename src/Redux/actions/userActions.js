//import types of actions
import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED, LOADING_USER, MARK_NOTIFICATIONS_READ } from '../types';
import axios from 'axios';


//func to loginUser
export const loginUser = (userData, history) => (dispatch) => {
//dispatch loading, (send and action)
dispatch({ type: LOADING_UI });

axios
    .post('/login', userData)
    .then((res) => {
    //if successful, set Auth Header
    setAuthorizationHeader(res.data.token);
    //getUser
    dispatch(getUserData());

    //clear any errors in form
    dispatch({ type: CLEAR_ERRORS });

    //redirect user to home page
    history.push('/');
    })
    .catch((err) => {
        //if errors, log error and set loading to false
    dispatch({
        type: SET_ERRORS,
        payload: err.response.data
    });
    });
};

//func to signUp
export const signupUser = (newUserData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
      .post('/signup', newUserData)
      .then((res) => {
        //authorize user, passing the token
        setAuthorizationHeader(res.data.token);
        dispatch(getUserData());
        dispatch({ type: CLEAR_ERRORS });
        history.push('/');
      })
      .catch((err) => {
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data
        });
      });
  };


//func to logout
export const logoutUser = () => (dispatch) => {
  //delete token
  localStorage.removeItem('FBIdToken');
  //delete header
  delete axios.defaults.headers.common['Authorization'];
  //set action to unauthenticated
  dispatch({ type: SET_UNAUTHENTICATED });
};


//func to getUserData
export const getUserData = () => (dispatch) => {
  //set action to loading
  dispatch({ type: LOADING_USER });
    //trigger axios
    axios
      .get('/user')
      .then((res) => {
      dispatch({
          type: SET_USER,
          //data sent to reducer
          payload: res.data
      });
    })
    .catch((err) => console.log(err));
};

//func to upload image
export const uploadImage = (formData) => (dispatch) => {
  //dispatch action of type 
  dispatch({ type: LOADING_USER });
  //send req to upload image
  axios
    .post('/user/image', formData)
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => console.log(err));
};

//func to edit user details
export const editUserDetails = (userDetails) => (dispatch) => {
  //dispatch action of type
  dispatch({ type: LOADING_USER });
  //send req to editUserDetails
  axios
    .post('/user', userDetails)
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => console.log(err));
};

//FUNC to get user Notifications
export const markNotificationsRead = (notificationIds) => (dispatch) => {
  axios
    .post('/notifications', notificationIds)
    .then((res) => {
      dispatch({
        type: MARK_NOTIFICATIONS_READ
      });
    })
    .catch((err) => console.log(err));
};


//func to setAuthorizationHeader
const setAuthorizationHeader = (token) => {
    const FBIdToken = `Bearer ${token}`;
    localStorage.setItem('FBIdToken', FBIdToken);
    axios.defaults.headers.common['Authorization'] = FBIdToken;
};