import isElectron from 'is-electron';
import actionTypes from './actionTypes';
import {electronCommand} from "./electronCommand";

const electron = isElectron() ? window.electron : null;
const ipcRenderer = isElectron() ? electron.ipcRenderer : null;
export const saveAssign = async (payload, yearAssignVersion) => {
  try {
    if (ipcRenderer) {
      const result = await ipcRenderer.invoke(electronCommand.SaveServerAssignLog, payload, yearAssignVersion);
      return result;
    }
  } catch (error) {
    console.log(error);
  }
};

export async function getYearAssignVersion() {
  try {
    if (ipcRenderer) {
      return await ipcRenderer.invoke(electronCommand.GetLocalAssignLogVersion);
    }
  } catch (error) {
    console.log('updateData', error);
  }
}

export async function updateData(businessEntityTaxId, payload) {
  try {
    if (ipcRenderer) {
      return await ipcRenderer.invoke('evidence:updateData', businessEntityTaxId, payload);
    }
  } catch (error) {
    console.log('updateData', error);
  }
}

export async function deleteData(dispatch, businessEntityTaxId, step, id) {
  try {
    if (ipcRenderer) {
      const result = await ipcRenderer.invoke('evidence:deleteData', businessEntityTaxId, step, id);
      dispatch({ type: actionTypes.FILE_LIST_RECEIVED, payload: result });
    }
  } catch (error) {
    console.log('deleteData', error);
  }
}

export async function importImage() {
  try {
    if (ipcRenderer) {
      const result = await ipcRenderer.invoke(electronCommand.ImportImage);
      // dispatch({ type: actionTypes.FILE_LIST_RECEIVED, payload: result });
    }
  } catch (error) {
    console.log('importImage', error);
  }
}

export async function deleteSigoutourData(dispatch, eventName, ticketId) {
//   try {
//     if (ipcRenderer) {
//       const result = await ipcRenderer.invoke('evidence:deleteSigoutourData', eventName, ticketId);
//       dispatch({ type: actionTypes.FILE_LIST_RECEIVED, payload: result });
//     }
//   } catch (error) {
//     console.log('deleteSigoutourData', error);
//   }
}

export async function getJsonRawData(ticketId, clientTaxId) {
  try {
    if (ipcRenderer) {
      return await ipcRenderer.invoke('evidence:getJsonFileData', ticketId, clientTaxId);
    }
  } catch (error) {
    console.log('getJsonRawData', error);
  }
}

export async function getChooseBusinessEntityData(dispatch, taxId) {
  try {
    if (ipcRenderer) {
      const result = await ipcRenderer.invoke('evidence:getChooseBusinessEntityData', taxId);
      dispatch({ type: actionTypes.FILE_LIST_RECEIVED, payload: result });
      return result;
    }
  } catch (error) {
    dispatch({ type: actionTypes.GET_FILE_LIST_ERROR, payload: error });
  }
}

export async function scanImages(dispatch, filePath, username, declareProperties) {
  try {
    if (ipcRenderer) {
      const result = await ipcRenderer.invoke('evidence:scanImages', filePath, username, declareProperties);
      dispatch({ type: actionTypes.FILE_LIST_RECEIVED, payload: result });
    }
  } catch (error) {
    console.log(error);
  }
}

export async function fileScanned(dispatch) {
  dispatch({ type: 'LOGOUT' });
}

export async function identifySent(dispatch, payload) {
  try {
    if (ipcRenderer) {
      const result = await ipcRenderer.invoke('evidence:identifySent', payload);
      dispatch({ type: actionTypes.FILE_LIST_RECEIVED, payload: result });
    }
  } catch (error) {
    console.log(error);
  }
}

export async function identifyResultReceived(dispatch, businessEntityTaxId, payload) {
  try {
    if (ipcRenderer) {
      const result = await ipcRenderer.invoke('evidence:identifyResultReceived', businessEntityTaxId, payload);
      dispatch({ type: actionTypes.FILE_LIST_RECEIVED, payload: result });
    }
  } catch (error) {
    console.log(error);
  }
}

export async function identifyResultConfirmed(dispatch, businessEntityTaxId, payload) {
  try {
    if (ipcRenderer) {
      const result = await ipcRenderer.invoke('evidence:identifyResultConfirmed', businessEntityTaxId, payload);
      dispatch({ type: actionTypes.FILE_LIST_RECEIVED, payload: result });
      return result;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function gwUploaded(dispatch, businessEntityTaxId, payload) {
  try {
    if (ipcRenderer) {
      const result = await ipcRenderer.invoke('evidence:uploaded', businessEntityTaxId, payload);
      dispatch({ type: actionTypes.FILE_LIST_RECEIVED, payload: result });
      return result;
    }
  } catch (error) {
    throw new Error(error);
  }
}

export async function getAssign() {
  try {
    if (ipcRenderer) {
      const result = await ipcRenderer.invoke('evidence:getAssign');
      return result;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getImageData(fullPath) {
  try {
    if (ipcRenderer) {
      const result = await ipcRenderer.invoke('evidence:getImageFileContent', fullPath);
      return result;
    }
  } catch (error) {
    console.log(error);
  }
}
