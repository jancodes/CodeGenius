'use strict'

import {
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT_SUCCESS,
  AUTH_ERROR,
  AUTH_SESSION_TIMEOUT,
  RECEIVED_LOGGED_IN_USER,
  NO_USER
} from '../actions/AuthActions'

const session_initialState = {
  id: null,
  user: null,
  error: null
}

export default function sessionReducer (state = session_initialState, action) {
  switch (action.type) {
    case RECEIVED_LOGGED_IN_USER:
    case AUTH_LOGIN_SUCCESS:
      return Object.assign({}, state, {
        id: action.id,
        user: action.user
      })
    case NO_USER:
    case AUTH_LOGOUT_SUCCESS:
    case AUTH_SESSION_TIMEOUT:
      return Object.assign({}, state, {
        id: null,
        user: null
      })
    case AUTH_ERROR:
      return Object.assign({}, state, {
        error: action.error
      })
    default:
      return state
  }
}