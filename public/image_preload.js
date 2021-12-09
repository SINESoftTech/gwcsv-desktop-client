window.addEventListener('message', receiveMessage, false)
const electron = require('electron')

let imageJson = ''

async function receiveMessage(event) {
  imageJson = event.data
}

const getImageFromIPC = async (payload) => {
  console.log('getImageFromIPC', payload)
  try {
    if (ipcRenderer) {
      const result = await ipcRenderer.invoke('evidence:getImageFileContent', payload)
      return result
    }
  } catch (error) {
    console.log(error)
  }
}

window.addEventListener('message', receiveMessage, false)

const ipcRenderer = require('electron').ipcRenderer

const contextBridge = require('electron').contextBridge


contextBridge.exposeInMainWorld(
  'api',
  {
    image: () => {
      return imageJson
    },
    getImage: async (fullPath) => {
      return await getImageFromIPC(fullPath)
    }
  }
)