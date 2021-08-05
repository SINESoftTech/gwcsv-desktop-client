import {gwAxios as axios} from "./axios";
import actionTypes from '../Actions/actionTypes'

const ROOT_URL = 'http://test.gwis.com.tw:8596'

export async function loginUser(dispatch, loginPayload) {
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(loginPayload),
  };

  try {
    dispatch({type: 'REQUEST_LOGIN'});
    let response = await axios.post('/auth/login', JSON.stringify(loginPayload)) //await fetch(`${ROOT_URL}/auth/login`, requestOptions);
    let data = response.data
    let user = {taxId: loginPayload.taxId, username: loginPayload.username}
    if (data.token) {
      user.token = data.token
      dispatch({type: 'LOGIN_SUCCESS', payload: user});
      localStorage.setItem('currentUser', JSON.stringify(user));
      return user;
    }

    dispatch({type: 'LOGIN_ERROR', error: response.data});
    console.log('error response', response.data);
    return;
  } catch (error) {
    dispatch({type: 'LOGIN_ERROR', error: error.response.data});
    console.log(error);
  }
}

export async function logout(dispatch) {
  dispatch({type: 'LOGOUT'});
  localStorage.removeItem('currentUser');
  localStorage.removeItem('token');
}

export async function uploadToGw(dispatch, payload) {
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload),
  };

  try {
    dispatch({type: 'REQUEST_LOGIN'});
    dispatch({type: 'LOGIN_SUCCESS', payload: ''});
    return;
  } catch (error) {
    dispatch({type: 'LOGIN_ERROR', error: error});
    console.log(error);
  }
}

export const getAllClientList = async (dispatch, username, taxId, token) => {
  const requestOptions = {
    headers: {'Content-Type': 'application/json', 'Authorization': token, taxId: taxId},
  };
  const result = await axios.get(`/businessEntity/${taxId}`, requestOptions).catch((error) => {
    // TODO Error handling, logout or re-login?
    console.log('getAllClientList error', error)
    dispatch({type: actionTypes.GET_CLIENT_LIST_FAILED, payload: error})
  })
  if(result) {
    dispatch({type: actionTypes.GET_CLIENT_LIST_SUCCESS, payload: result.data})
  }
}
