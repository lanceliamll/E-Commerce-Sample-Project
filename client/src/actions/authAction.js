import axios from 'axios';
import setAuthToken from '../helpers/setAuthToken';
import {
  SIGNUP_USER,
  SIGNUP_FAILED,
  SIGNIN_USER,
  SIGNIN_FAILED,
  USER_LOADED
} from './types';

//LOAD THE AUTHENTICATED USER IF THERE IS TOKEN
export const loadUser = () => async dispatchEvent => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('http://localhost:5000/api/users');

    dispatchEvent({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (error) {
    dispatchEvent({
      type: SIGNUP_FAILED
    });
  }
};

//REGISTER A USER
export const signupUser = userData => async dispatchEvent => {
  try {
    const res = await axios.post(
      'http://localhost:5000/api/users/register',
      userData
    );

    dispatchEvent({
      type: SIGNUP_USER,
      payload: res.data
    });
  } catch (error) {
    dispatchEvent({
      type: SIGNUP_FAILED
    });
  }
};

//LOGIN A USER
export const signinUser = userData => async dispatchEvent => {
  try {
    const res = await axios.post(
      'http://localhost:5000/api/users/login',
      userData
    );

    dispatchEvent({
      type: SIGNIN_USER,
      payload: res.data
    });
  } catch (error) {
    dispatchEvent({
      type: SIGNIN_FAILED
    });
  }
};
