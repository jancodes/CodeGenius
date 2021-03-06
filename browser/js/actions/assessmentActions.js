'use strict'

import axios from 'axios'

export const LOAD_ASSESSMENTS_REQUEST = 'LOAD_ASSESSMENTS_REQUEST'
export const LOAD_ASSESSMENTS_SUCCESS = 'LOAD_ASSESSMENTS_SUCCESS'
export const LOAD_ASSESSMENTS_FAILURE = 'LOAD_ASSESSMENTS_FAILURE'
export const CREATE_ASSESSMENT_REQUEST = 'CREATE_ASSESSMENT_REQUEST'
export const CREATE_ASSESSMENT_SUCCESS = 'CREATE_ASSESSMENT_SUCCESS'
export const CREATE_ASSESSMENT_FAILURE = 'CREATE_ASSESSMENT_FAILURE'

const API_URL = '/api/v1'
const USER_URL = `${API_URL}/users`
const ASSESSMENT_URL = `${API_URL}/assessments`

export const getUserAssessments = (id) => (dispatch) => {
  dispatch({ type: LOAD_ASSESSMENTS_REQUEST })

  return axios.get(`${USER_URL}/${id}/assessments`).then(res => res.data)
  .then(resData => dispatch({
    type: LOAD_ASSESSMENTS_SUCCESS,
    assessments: resData
  }))
  .catch(error => dispatch({ type: LOAD_ASSESSMENTS_FAILURE, error }))
}

export const createAssessment = (assessment) => (dispatch, getState) => {
  dispatch({ type: CREATE_ASSESSMENT_REQUEST })

  assessment.instructorId = getState().session.user.id

  return axios.post(ASSESSMENT_URL, assessment).then(res => res.data)
  .then(resData => dispatch({
    type: CREATE_ASSESSMENT_SUCCESS,
    assessment: resData
  }))
  .catch(error => dispatch({ type: CREATE_ASSESSMENT_FAILURE, error }))
}
