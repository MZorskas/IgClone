import * as types from './types';
import { RSAA, createAction } from 'redux-api-middleware';

export const loginUser = (body) =>
  createAction({
    endpoint: 'http://localhost:3001/v1/user/login',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    types: [
      types.USER_LOGIN_REQUEST,
      types.USER_LOGIN_SUCCESS,
      types.USER_LOGIN_FAILURE,
    ],
  });

export const logoutUser = (token) =>
  createAction({
    endpoint: 'http://localhost:3001/v1/user/logout',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-auth-IG': token,
    },
    types: [
      types.USER_LOGOUT_REQUEST,
      types.USER_LOGOUT_SUCCESS,
      types.USER_LOGOUT_FAILURE,
    ],
  });

export const registerUser = (body) =>
  createAction({
    endpoint: 'http://localhost:3001/v1/user/register',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    types: [
      types.USER_REGISTER_REQUEST,
      types.USER_REGISTER_SUCCESS,
      types.USER_REGISTER_FAILURE,
    ],
  });
