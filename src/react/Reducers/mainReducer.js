import React from 'react'
import actionTypes from '../Actions/actionTypes'

export const initialMainState = {
  fileLists: {},
  clientLists:[]
};

export const MainReducer = (initialState, action) => {
  switch (action.type) {
    case actionTypes.FILE_LIST_RECEIVED:
      console.log('in mainReducer payload', action.payload)
      return { ...initialState, fileLists: action.payload};
    case actionTypes.GET_CLIENT_LIST_SUCCESS:
      return {...initialState, clientLists: action.payload}
    default:
      console.log('mainReducer initial state', initialState)
      return initialState
  }
};
