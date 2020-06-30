import * as types from './types';
import { RSAA, createAction } from 'redux-api-middleware';

export const createPost = (formData, token) =>
  createAction({
    endpoint: 'http://localhost:3001/v1/post/createPost',
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

export const fetchAllUserPosts = (username) =>
  createAction({
    endpoint: `http://localhost:3001/v1/post/getAllUserPostsByUsername/${username}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    types: [
      types.SINGLE_USER_POSTS_REQUEST,
      types.SINGLE_USER_POSTS_SUCCESS,
      types.SINGLE_USER_POSTS_FAILURE,
    ],
  });
