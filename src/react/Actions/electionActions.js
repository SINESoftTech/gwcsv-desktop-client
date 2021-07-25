import isElectron from "is-electron";
import actionTypes from './actionTypes'

const electron = isElectron() ? window.electron : null;
const remote = isElectron() ? window.remote : null;
const ipcRenderer = isElectron() ? electron.ipcRenderer : null

const getFileList = async ()=>{

}

export async function getFileLists() {
  try {
    if (ipcRenderer) {
      console.log('in action getFileLists')
      const result = await ipcRenderer.invoke('evidence:getFileLists')
      return result
    }
  } catch (error) {
  }
}

export async function getImageFile(dispatch, payload) {
  dispatch({ type: 'LOGOUT' });
}

export async function scanImages(dispatch, payload) {
  dispatch({ type: 'LOGOUT' });
}

export async function fileScanned(dispatch, payload) {
  dispatch({ type: 'LOGOUT' });
}

export async function identifySent(dispatch, payload) {
  dispatch({ type: 'LOGOUT' });
}

export async function identifyResultReceived(dispatch, payload) {
  dispatch({ type: 'LOGOUT' });
}

export async function identifyResultConfirmed(dispatch, payload) {
  dispatch({ type: 'LOGOUT' });
}

export async function gwUploaded(dispatch, payload) {
  dispatch({ type: 'LOGOUT' });
}