import {
  SIGNUP_USER,
  SIGNUP_FAILED,
  USER_LOADED,
  SIGNIN_USER,
  SIGNIN_FAILED,
  LOGOUT_USER
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  user: null,
  loading: true
};

export default function(state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        user: payload,
        isAuthenticated: true,
        loading: false
      };
    case SIGNUP_USER:
    case SIGNIN_USER:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };
    case SIGNUP_FAILED:
    case SIGNIN_FAILED:
    case LOGOUT_USER:
      localStorage.removeItem('token', payload);
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        token: null
      };
    default:
      return state;
  }
}
