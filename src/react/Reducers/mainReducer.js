import React from 'react'
import actionTypes from '../Actions/actionTypes'

const MainReducer = (initialState, action) => {
  switch (action.type) {
    case actionTypes.FILE_LIST_RECEIVED:
      console.log('in mainReducer payload', action.payload)
      return { ...initialState, fileLists: action.payload};
    default:
      console.log('mainReducer initial state', initialState)
      return initialState
  }
};

export default MainReducer