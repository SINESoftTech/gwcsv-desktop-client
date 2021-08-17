import React from 'react'
import actionTypes from '../Actions/actionTypes'

export const initialMainState = {
  fileLists: {},
  clientLists: []
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
    case actionTypes.SEND_TO_IDENTIFY:
      // state.fileLists.filter
      console.log('MainReducer1', state)

      console.log('MainReducer2', state.fileLists['02'])
      // console.log('MainReducer3', state)
      state.fileLists['02'] = state.fileLists['02'].concat(action.payload)
      console.log('MainReducer2', state)
      return state
    // state.fileLists[1].concat()
    // case actionTypes.GET_CLIENT_LIST_SUCCESS:
    //   return {...initialState, clientLists: action.payload}
    default:
      console.log('mainReducer initial state', state)
      return state
  }
}
