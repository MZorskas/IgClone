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

export const fetchAllUsersPosts = (token, currentPage) =>
  createAction({
    endpoint: `http://localhost:3001/v1/post/getAllPosts/${currentPage}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-auth-IG': token,
    },
    types: [
      types.USERS_POSTS_REQUEST,
      types.USERS_POSTS_SUCCESS,
      types.USERS_POSTS_FAILURE,
    ],
  });

// export const fetchAllUsersPosts = (token) =>
// createAction({
//   endpoint: 'http://localhost:3001/v1/post/getAllUsersPosts',
//   method: 'GET',
//   headers: {
//     'Content-Type': 'application/json',
//     'x-auth-IG': token,
//   },
//   types: [
//     types.USERS_POSTS_REQUEST,
//     types.USERS_POSTS_SUCCESS,
//     types.USERS_POSTS_FAILURE,
//   ],
// });

export const fetchSinglePost = (postId) =>
  createAction({
    endpoint: `http://localhost:3001/v1/post/getSinglePost/${postId}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    types: [
      types.SINGLE_POST_REQUEST,
      types.SINGLE_POST_SUCCESS,
      types.SINGLE_POST_FAILURE,
    ],
  });

export const createComment = (postId, token, text) =>
  createAction({
    endpoint: `http://localhost:3001/v1/post/postNewComment/${postId}`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-auth-IG': token,
    },
    body: JSON.stringify({ text: text }),
    types: [
      types.CREATE_COMMENT_REQUEST,
      types.CREATE_COMMENT_SUCCESS,
      types.CREATE_COMMENT_FAILURE,
    ],
  });

export const deleteComment = (commentId, token) =>
  createAction({
    endpoint: `http://localhost:3001/v1/post/deleteComment/${commentId}`,
    method: 'POST',
    headers: {
      'x-auth-IG': token,
    },
    types: [
      types.DELETE_COMMENT_REQUEST,
      types.DELETE_COMMENT_SUCCESS,
      types.DELETE_COMMENT_FAILURE,
    ],
  });

export const deletePost = (postId, token) =>
  createAction({
    endpoint: `http://localhost:3001/v1/post/deletePost/${postId}`,
    method: 'POST',
    headers: {
      'x-auth-IG': token,
    },
    types: [
      types.DELETE_POST_REQUEST,
      types.DELETE_POST_SUCCESS,
      types.DELETE_POST_FAILURE,
    ],
  });

export const toggleSavePost = (postId, token) =>
  createAction({
    endpoint: `http://localhost:3001/v1/post/toggleSave/${postId}`,
    method: 'POST',
    headers: {
      'x-auth-IG': token,
    },
    types: [
      types.TOGGLE_SAVE_POST_REQUEST,
      types.TOGGLE_SAVE_POST_SUCCESS,
      types.TOGGLE_SAVE_POST_FAILURE,
    ],
  });
