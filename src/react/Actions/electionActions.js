import isElectron from 'is-electron'
import actionTypes from './actionTypes'

const electron = isElectron() ? window.electron : null
const remote = isElectron() ? window.remote : null
const ipcRenderer = isElectron() ? electron.ipcRenderer : null

const getFileList = async () => {

}

export async function getFileLists(dispatch) {
  try {
    console.log('in action getFileLists')
    if (ipcRenderer) {
      console.log('in action getFileLists')
      const result = await ipcRenderer.invoke('evidence:getFileLists')
      dispatch({ type: actionTypes.FILE_LIST_RECEIVED, payload: result })
      return result
    }
  } catch (error) {
    dispatch({ type: actionTypes.GET_FILE_LIST_ERROR, payload: error })
  }
}

export async function getImageFile(dispatch, payload) {
  dispatch({ type: 'LOGOUT' })
}

export async function scanImages(dispatch, payload) {
  dispatch({ type: 'LOGOUT' })
}

export async function fileScanned(dispatch, payload) {
  dispatch({ type: 'LOGOUT' })
}

export async function identifySent(dispatch, payload) {
  // console.log('identifySent dispatch', dispatch)
  console.log('identifySent payload', payload)
  try {
    if (ipcRenderer) {
      //TODO
      const result = await ipcRenderer.invoke('evidence:identifySent', payload)
      // dispatch({ type: actionTypes.FILE_LIST_RECEIVED, payload: result })
      // return result
    }
  } catch (error) {
    //todo handle
  }
}

export async function identifyResultReceived(dispatch, payload) {
  dispatch({ type: 'LOGOUT' })
}

export async function identifyResultConfirmed(dispatch, payload) {
  dispatch({ type: 'LOGOUT' })
}

export async function gwUploaded(dispatch, payload) {
  dispatch({ type: 'LOGOUT' })
}