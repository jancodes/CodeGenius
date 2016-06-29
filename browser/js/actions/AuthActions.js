'use strict'

import axios from 'axios'

export const AUTH_LOGIN_REQUEST = 'AUTH_LOGIN_REQUEST'
export const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS'
export const AUTH_LOGIN_FAILURE = 'AUTH_LOGIN_FAILURE'
export const AUTH_LOGOUT_SUCCESS = 'AUTH_LOGOUT_SUCCESS'
export const AUTH_LOGOUT_FAILURE = 'AUTH_LOGOUT_FAILURE'
export const AUTH_SESSION_TIMEOUT = 'AUTH_SESSION_TIMEOUT'
export const AUTH_USER_REQUEST = 'AUTH_USER_REQUEST'
export const AUTH_USER_RECEIVED = 'AUTH_USER_RECEIVED'
export const AUTH_NO_USER = 'AUTH_NO_USER'

export function login (credentials) {
  dispatch({ type: AUTH_LOGIN_REQUEST })
  return dispatch => {
    return axios.post('/login', credentials)
    .then(res => res.data)
    .then(resData => {
      const user = resData.user
      dispatch({
        type: AUTH_LOGIN_SUCCESS,
        id: user.id,
        user
      })
    })
    .catch(err => dispatch({ type: AUTH_LOGIN_FAILURE, err }))
  }
}

export function getLoggedInUser () {
  return (dispatch, getState)  => {
    let user = getState().session.user
    if (user) {
      dispatch(userReceived(user))
    } else {
      dispatch({ type: AUTH_USER_REQUEST })
      return axios.get('/session')
      .then(res => res.data)
      .then(resData => dispatch(userReceived(resData.user)))
      .catch(() => dispatch({ type: AUTH_NO_USER }))
    }
  }
}

export function logout () {
  return dispatch => {
    return axios.get('/logout')
    .then(() => dispatch({ type: AUTH_LOGOUT_SUCCESS }))
    .catch(err => dispatch({ type: AUTH_LOGOUT_FAILURE }))
  }
}

export function userReceived (user) {
  return { type: AUTH_USER_RECEIVED, user }
}
