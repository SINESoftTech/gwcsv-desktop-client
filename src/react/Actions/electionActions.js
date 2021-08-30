import isElectron from 'is-electron'
import actionTypes from './actionTypes'

const electron = isElectron() ? window.electron : null
const remote = isElectron() ? window.remote : null
const ipcRenderer = isElectron() ? electron.ipcRenderer : null

export async function updateSigoutourData(ticketId, period, json) {
  try {
    if (ipcRenderer) {
      return await ipcRenderer.invoke('evidence:updateSigoutourData', ticketId, period, json)
    }
  } catch (error) {
    console.log('updateSigoutourData' , error)
  }
}

export async function deleteSigoutourData(ticketId) {
  try {
    if (ipcRenderer) {
      return await ipcRenderer.invoke('evidence:deleteSigoutourData', ticketId)
    }
  } catch (error) {
    console.log('deleteSigoutourData', error)
  }
}

export async function getJsonRawData(data, clientTaxId) {
  try {
    const filterJsonDataFilePathList = data.filter(d => {
      return d.filename.endsWith('.json')
    }).filter(d => {
      const fileNameClientId = d.filename.split('_')[1]
      return fileNameClientId === clientTaxId
    }).map(d => {
      return d.fullPath
    })
    if (ipcRenderer) {
      return await ipcRenderer.invoke('evidence:getJsonFileData', filterJsonDataFilePathList)
    }
  } catch (error) {
    console.log('getJsonRawData', error)
  }
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

export async function scanImages(dispatch, filePath, username, declareProperties) {
  console.log('scanImages() filePath', filePath)
  try {
    if (ipcRenderer) {
      const result = await ipcRenderer.invoke('evidence:scanImages', filePath, username, declareProperties)
      console.log('scanImages result', result)
      dispatch({ type: actionTypes.FILE_LIST_RECEIVED, payload: result })
    }
  } catch (error) {
    console.log(error)
    // throw new Error(error)
  }
}

export async function fileScanned(dispatch, payload) {
  dispatch({ type: 'LOGOUT' })
}

export async function identifySent(dispatch, payload) {
  try {
    if (ipcRenderer) {
      const result = await ipcRenderer.invoke('evidence:identifySent', payload)
      dispatch({ type: actionTypes.FILE_LIST_RECEIVED, payload: result })
    }
  } catch (error) {
    console.log(error)
  }
}

export async function identifyResultReceived(dispatch, payload) {
  try {
    if (ipcRenderer) {
      const result = await ipcRenderer.invoke('evidence:identifyResultReceived', payload)
      dispatch({ type: actionTypes.FILE_LIST_RECEIVED, payload: result })
    }
  } catch (error) {
    console.log(error)
  }
}

export async function identifyResultConfirmed(dispatch, payload) {
  try {
    if (ipcRenderer) {
      const result = await ipcRenderer.invoke('evidence:identifyResultConfirmed', payload)
      dispatch({ type: actionTypes.FILE_LIST_RECEIVED, payload: result })
      return result
    }
  } catch (error) {
    console.log(error)
  }
}

export async function gwUploaded(dispatch, payload) {
  try {
    if (ipcRenderer) {
      const result = await ipcRenderer.invoke('evidence:uploaded', payload)
      dispatch({ type: actionTypes.FILE_LIST_RECEIVED, payload: result })
      return result
    }
  } catch (error) {
    throw new Error(error)
  }
}

export async function getRawDataWithImage(payload) {
  try {
    if (ipcRenderer) {
      const result = await ipcRenderer.invoke('evidence:getRawDataWithImage', payload)
      return result
    }
  } catch (error) {
    // throw new Error(error)
  }
}