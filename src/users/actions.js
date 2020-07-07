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

export const fetchFollowers = (token, username) =>
  createAction({
    endpoint: `http://localhost:3001/v1/user/getAllFollowers/${username}`,
    method: 'GET',
    headers: {
      'x-auth-IG': token,
    },
    types: [
      types.FOLLOWERS_REQUEST,
      types.FOLLOWERS_SUCCESS,
      types.FOLLOWERS_FAILURE,
    ],
  });

export const fetchFollowingUsers = (token, username) =>
  createAction({
    endpoint: `http://localhost:3001/v1/user/getAllFollowingUsers/${username}`,
    method: 'GET',
    headers: {
      'x-auth-IG': token,
    },
    types: [
      types.FOLLOWING_USERS_REQUEST,
      types.FOLLOWING_USERS_SUCCESS,
      types.FOLLOWING_USERS_FAILURE,
    ],
  });

export const fetchNotFollowedUsers = (token) =>
  createAction({
    endpoint: `http://localhost:3001/v1/user/getAllUsersExceptFollowing/`,
    method: 'GET',
    headers: {
      'x-auth-IG': token,
    },
    types: [
      types.NOT_FOLLOWED_USERS_REQUEST,
      types.NOT_FOLLOWED_USERS_SUCCESS,
      types.NOT_FOLLOWED_USERS_FAILURE,
    ],
  });

export const toggleFollowUser = (profileId, token) =>
  createAction({
    endpoint: `http://localhost:3001/v1/user/toggleFollow/${profileId}`,
    method: 'POST',
    headers: {
      'x-auth-IG': token,
    },
    types: [
      types.TOGGLE_FOLLOW_USER_REQUEST,
      types.TOGGLE_FOLLOW_USER_SUCCESS,
      types.TOGGLE_FOLLOW_USER_FAILURE,
    ],
  });
