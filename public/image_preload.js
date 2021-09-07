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
      console.log('getImage', fullPath)
      const result = await getImageFromIPC(fullPath)
      console.log('getImage', result)
      const blob = new Blob([result])
      return URL.createObjectURL(blob)
    }
    // send: (channel) => {
    //   // whitelist channels
    //   console.log('send channel', channel)
    //   console.log('send image', imageJson)
    //   if (channel === 'getImageJson') {
    //     ipcRenderer.send('sendImageJson', imageJson)
    //   }
    // },
    // receive: (channel, data) => {
    //   console.log('receive channel', channel)
    //   console.log('receive data', data)
    //   // let validChannels = ['fromMain']
    //
    //   if ('getImageJson' === channel) {
    //     console.log('send2 image', imageJson)
    //     ipcRenderer.on(channel, (event, ...args) => console.log('on', args))
    //   }
    //
    //   // ipcRenderer.on(channel, (event, ...args) => console.log('on', args))
    //   // if (validChannels.includes(channel)) {
    //   //   // Deliberately strip event as it includes `sender`
    //   //
    //   // }
    // }
  }
)