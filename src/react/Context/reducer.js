import React, { useState, useReducer } from 'react';
import AuthReducer from "./authReducer";
import MainReducer from "../Reducers/mainReducer";

let user = localStorage.getItem('currentUser')
  ? JSON.parse(localStorage.getItem('currentUser')).user
  : '';
let token = localStorage.getItem('currentUser')
  ? JSON.parse(localStorage.getItem('currentUser')).token
  : '';
const authInitState = {
  user: '' || user,
  token: '' || token,
  loading: false,
  errorMessage: null,
}
export const initialState = {
  auth: authInitState,
  fileLists: []
};

const combineDispatch = (...dispatches) => (action) =>
  dispatches.forEach((dispatch) => dispatch(action));

const combineReducers = (slices) => (state, action) =>
  Object.keys(slices).reduce( // use for..in loop, if you prefer it
    (acc, prop) => ({
      ...acc,
      [prop]: slices[prop](acc[prop], action),
    }),
    state
  );


export const rootReducer = combineReducers(AuthReducer, MainReducer)


