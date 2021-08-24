export const openScanner = (dispatch) => {
  const url = 'ws://127.0.0.1:17777/GetDevicesList'
  const ws = new WebSocket(url, 'webfxscan')
  ws.onopen = () => console.log('ws opened')
  ws.onmessage = async message => {
    const scannerName = message.data.split(' ')[1]
    await dispatch({ type: 'GET_SCAN_DEVICE', payload: scannerName })
  }
  ws.onclose = () => {
    ws.close()
  }
}

export const scan = (dispatch, deviceName) => {
  console.log('scan() deviceName', deviceName)
  //filePath:C:\Users\bda60\AppData\Local\Temp\WebFXScan
  const paramJson = {
    'device-name': deviceName,
    'scanmode': 'scan',
    'paper-size': 'A4',
    'source': 'ADF-Back',
    'resolution': 300,
    'mode': 'color',
    'imagefmt': 'jpg',
    'brightness': 15,
    'contrast': 35,
    'quality': 100,
    'swcrop': true,
    'swdeskew': false,
    'front-eject': false,
    'manual-eject': false,
    'duplexmerge': false,
    'remove-blank-page': false,
    'multifeed-detect': false,
    'denoise': false,
    'remove-blackedges': false,
    'recognize-type': 'none',
    'recognize-lang': 'default'
  }

  const url = 'ws://127.0.0.1:17777/SetParams?' + new URLSearchParams(paramJson).toString()
  console.log(url)
  const ws = new WebSocket(url, 'webfxscan')
  ws.onopen = () => console.log('ws opened')
  ws.onmessage = async (message) => {
    console.log('scan() message', message)
  }
  ws.onclose = () => {
    ws.close()
  }
}