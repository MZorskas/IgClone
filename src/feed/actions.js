import * as types from './types';
import { RSAA, createAction } from 'redux-api-middleware';

export const createPost = (formData, token) =>
  createAction({
    endpoint: 'http://localhost:3001/v1/user/changeProfilePicture',
    method: 'POST',
    headers: {
      'x-auth-IG': token,
    },
    body: formData,
    types: [
      types.CREATE_POST_REQUEST,
      types.CREATE_POST_SUCCESS,
      types.CREATE_POST_FAILURE,
    ],
  });
