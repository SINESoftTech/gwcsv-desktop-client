import React from 'react'
import actionTypes from '../Actions/actionTypes'

export const initialMainState = {
  fileLists: {},
  clientLists: [],
  scannerName: '',
  tempFilePath: []
}

export const MainReducer = (state = initialMainState, action) => {
  console.log('MainReducer initialState', state)
  console.log('MainReducer action', action)
  switch (action.type) {
    case actionTypes.FILE_LIST_RECEIVED:
      console.log('in mainReducer payload', action.payload)
      return { ...state, fileLists: action.payload }
    case actionTypes.GET_CLIENT_LIST_SUCCESS:
      return { ...state, clientLists: action.payload }
    case actionTypes.GET_SCAN_DEVICE:
      return { ...state, scannerName: action.payload }
    case actionTypes.SCAN_IMAGE_FILE:
      return { ...state, tempFilePath: [...state.tempFilePath, action.payload] }
    default:
      console.log('mainReducer initial state', state)
      return state
  }
}
