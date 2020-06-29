import * as types from './types';
import { RSAA, createAction } from 'redux-api-middleware';

export const fetchSingleUser = (username) =>
  createAction({
    endpoint: `http://localhost:3001/v1/user/getSingleUserByUsername/${username}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    types: [
      types.SINGLE_USER_REQUEST,
      types.SINGLE_USER_SUCCESS,
      types.SINGLE_USER_FAILURE,
    ],
  });
