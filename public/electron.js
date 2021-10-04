const electron = require('electron')
const fse = require('fs-extra')
const path = require('path')
const R = require('ramda')
// Module to control application life.
const app = electron.app
const ipcMain = electron.ipcMain
const isDev = require('electron-is-dev')
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
const userHomedir = require('os').homedir()
const url = require('url')
const process = require('process')
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
let config = {
  rootFolder: path.join(userHomedir, '/.gwapp'),
  fileFolder: path.join(userHomedir, '/.gwapp')
}

function initApp() {
  initFileStructure()
  loadConfig()
  createWindow()
}

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
function initFileStructure() {
  console.log(config)
  if (!fse.existsSync(config.rootFolder)) {
    fse.mkdirSync(config.rootFolder)
  }

  if (!fse.existsSync(config.fileFolder)) {
    fse.mkdirSync(config.fileFolder)
  }

  Object.keys(stageFolders).forEach(key => {
    const stageFolderItem = stageFolders[key]
    const folderPath = path.join(config.fileFolder, stageFolderItem.folder)
    if (!fse.existsSync(folderPath)) {
      fse.mkdirSync(folderPath)
    }
  })
}

function loadConfig() {
  var configPath = path.join(config.rootFolder, 'appSetting.conf')
  if (!fse.existsSync(configPath)) {
    fse.writeFileSync(configPath, JSON.stringify(config))
  }
  config = fse.readJSONSync(configPath)
}

function createWindow() {
  // Create the browser window.
  // console.log(path.join(__dirname, 'preload.js'))
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: false
    }
  })
  mainWindow.maximize()
  // and load the index.html of the app.
  var fileLocation = `file://${path.join(__dirname, '../build/index.html')}`
  var devServerUrl = 'http://localhost:3000'
  mainWindow.loadURL(isDev ? devServerUrl : fileLocation)
  // mainWindow.loadURL(fileLocation)
  // Open the DevTools.
  if (isDev) {
    mainWindow.webContents.openDevTools()
  }
  //
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    return {
      action: 'allow',
      overrideBrowserWindowOptions: {
        webPreferences: {
          preload: path.join(__dirname, 'image_preload.js'),
          contextIsolation: true
        }
      }
    }
  })

  mainWindow.webContents.on('did-create-window', (childWindow) => {
    // For example...
    if (isDev) {
      childWindow.webContents.openDevTools()
    }
    // 
    var fileLocation = `file://${path.join(__dirname, '../public/image.html')}`
    //todo
    childWindow.loadURL(fileLocation)
    childWindow.webContents.on('will-navigate', (e) => {
      e.preventDefault()
    })
  })
  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', initApp)

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function() {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

const stageFolders = {
  'scanned': { step: '01', folder: '01' },
  'identifySent': { step: '02', folder: '02' },
  'identifyResultReceived': { step: '03', folder: '03' },
  'evidenceSaved': { step: '04', folder: '04' },
  'evidenceUploaded': { step: '05', folder: '05' }
}


function getAllFileLists() {
  var fileLists = {}
  Object.keys(stageFolders).filter(stageKey => {
    return stageFolders[stageKey].step !== '05'
  }).forEach(key => {
    const stageFolderItem = stageFolders[key]
    fileLists[stageFolderItem.step] = openFile(path.join(config.fileFolder, stageFolderItem.folder))
  })

  return fileLists
}

function openFile(directory) {
  var fileInfo = fse.readdirSync(directory)
  // console.log('fileInfo', fileInfo)

  var fileResult = fileInfo.filter(filename => {
    return filename !== '.DS_Store'
  }).map(filename => {
    let fileObj = {
      filename: filename,
      fullPath: path.join(directory, filename)
    }

    return fileObj
  })
  return fileResult
}

function getFileContent(fullPath) {
  if (R.endsWith('.png', fullPath)) {
    return fse.readFileSync(fullPath)
  }
  if (R.endsWith('.jpg', fullPath)) {
    return fse.readFileSync(fullPath)
  }
  if (R.endsWith('.json', fullPath)) {
    return fse.readJSONSync(fullPath)
  }
  if (R.endsWith('.js', fullPath) || R.endsWith('.txt', fullPath)) {
    return fse.readFileSync(fullPath, 'utf-8')
  }

}

ipcMain.handle('evidence:saveAssign', (event, payload) => {
  const targetFilePath = config.fileFolder + '/' + 'assign.json'
  fse.writeJSONSync(targetFilePath, payload, { encoding: 'utf8', flag: 'w' })
})

ipcMain.handle('evidence:getImageFileContent', (event, fullPath) => {
  console.log(fullPath)
  return getFileContent(fullPath)
})

ipcMain.handle('evidence:getFileLists', (event, ...args) => {
  const fileList = getAllFileLists()
  return fileList
})

ipcMain.handle('evidence:getImageFileContentBase64', (event, fullPath) => {
  // console.log(event)
  // console.log(fullPath)
  // return '1'
  return fse.readFileSync(fullPath, { encoding: 'base64' })
})

ipcMain.handle('evidence:updateSigoutourData', (event, ticketId, deductionType, period, gwEvidenceType, json) => {
  //json remove old and save
  console.log('ticketId', ticketId)
  console.log('deductionType', deductionType)
  console.log('period', period)
  console.log('gwEvidenceType', gwEvidenceType)

  const fileList03 = getAllFileLists()['03']
  const filterFileList = fileList03.filter(obj => {
    const fileName = obj.filename
    const id = fileName.split('.')[0].split('_')[6]
    return id === ticketId
  })

  const targetFolderPath = path.join(config.fileFolder, stageFolders.identifyResultReceived.folder)
  filterFileList.map(file => {
    const fileName = file.filename
    const splitFileName = fileName.split('_')
    splitFileName[2] = period
    splitFileName[3] = deductionType
    const targetFileName = splitFileName.join('_')
    const targetFilePath = path.join(targetFolderPath, targetFileName)
    if (getFileExt(fileName) === 'json') {
      fse.removeSync(file.fullPath)
      fse.writeJSONSync(targetFilePath, json)
    } else {
      if (targetFileName !== fileName) {
        fse.copySync(file.fullPath, targetFilePath, { overwrite: true })
        fse.removeSync(file.fullPath)
      }
    }
  })
  return getAllFileLists()
})


ipcMain.handle('evidence:deleteSigoutourData', (event, eventName, ticketId) => {

  let folderId = '03'
  if (eventName === 'evidenceSaved') {
    folderId = '04'
  }
  if (eventName === 'scanned') {
    folderId = '01'
  }
  const fileList = getAllFileLists()[folderId]
  const filterFileList = fileList.filter(obj => {
    const fileName = obj.filename
    const id = fileName.split('.')[0].split('_')[6]
    return id === ticketId
  })
  for (let i = 0; i < filterFileList.length; i++) {
    const data = filterFileList[i]
    fse.removeSync(data.fullPath)
  }
  return getAllFileLists()
})

ipcMain.handle('evidence:scanImages', (event, fullPath, username, declareProperties) => {
  const sourceFileExt = fullPath.split('.')[1]
  const targetFolderPath = path.join(config.fileFolder, stageFolders.scanned.folder)
  const targetFilePath = targetFolderPath + '/' + username + '_' + declareProperties.clientTaxId + '_' + declareProperties.reportingPeriod + '_' + '1' + '_' + declareProperties.isDeclareBusinessTax + '_' + Date.now() + '.' + sourceFileExt
  fse.copySync(fullPath, targetFilePath)
  return getAllFileLists(fullPath)
})


ipcMain.handle('evidence:identifyResultConfirmed', (event, payload) => {
  console.log('identifyResultConfirmed', payload)
  Object.keys(payload).forEach(period => {
    const data = payload[period]
    for (let i = 0; i < data.length; i++) {
      const sourceImageFullPath = data[i].fullPath
      const targetImageFullName = path.join(config.fileFolder, stageFolders.evidenceSaved.folder, data[i].filename)
      fse.moveSync(sourceImageFullPath, targetImageFullName)
    }
  })
  return getAllFileLists()
})

ipcMain.handle('evidence:getJsonFileData', (event, fullPathList) => {
  const jsonDataList = fullPathList.map(filePath => {
    return {
      'filePath': filePath,
      'data': fse.readJSONSync(filePath)
    }
  })
  return jsonDataList
})

ipcMain.handle('evidence:identifySent', (event, sentIdentifyResult) => {
  const username = sentIdentifyResult['user']
  const identifyResult = sentIdentifyResult['result']
  for (let i = 0; i < identifyResult.length; i++) {
    const data = identifyResult[i]
    if (data['result']) {
      const fileExt = data['sourceFileName'].split('.')[1]
      const reportingPeriod = data['sourceFileName'].split('_')[2]
      const isDeclareBusinessTax = data['sourceFileName'].split('_')[4]
      const targetFileName = `${username}_${data['businessEntityTaxId']}_${reportingPeriod}_1_${isDeclareBusinessTax}_${data['type']}_${data['ticketId']}.${fileExt}`
      const targetFullName = path.join(config.fileFolder, stageFolders.identifySent.folder, targetFileName)
      fse.moveSync(data.sourceFullPath, targetFullName)
    }
  }
  return getAllFileLists()
})

ipcMain.handle('evidence:identifyResultReceived', (event, identifyResult) => {
  for (let i = 0; i < identifyResult.length; i++) {
    const data = identifyResult[i]
    if (data['status'] === 'completed') {
      const targetFolder = path.join(config.fileFolder, stageFolders.identifyResultReceived.folder)
      const fileNameWithoutExt = data.sourceFileName.split('.')[0]
      fse.moveSync(data.sourceFullPath, path.join(targetFolder, data.sourceFileName))
      fse.writeJSONSync(path.join(targetFolder, fileNameWithoutExt + '_sightour_result.json'), data.data)
    }
  }
  return getAllFileLists()
})


ipcMain.handle('evidence:evidenceSaved', (event, imageFileObj, sightourFileObj, savedResult) => {
  let targetFolder = path.join(config.fileFolder, stageFolders.evidenceSaved.folder)
  let imageFileObjObj = JSON.parse(imageFileObj)
  let sightourResultFileObjObj = JSON.parse(sightourFileObj)
  let resultObj = savedResult ? JSON.parse(savedResult) : null
  const filenameWithoutExt = imageFileObjObj.filename.split('.').slice(0, -1).join('.')
  const imageFileExt = imageFileObjObj.filename.split('.').slice(-1)[0]

  if (resultObj) {
    // console.log('result exists')
    fse.writeJSONSync(path.join(targetFolder, filenameWithoutExt + '_saved_result.txt'), resultObj)
  } else {
    // console.log('copyFile')
    fse.copySync(sightourResultFileObjObj.fullPath, path.join(targetFolder, filenameWithoutExt + '_saved_result.txt'))
  }
  fse.moveSync(imageFileObjObj.fullPath, path.join(targetFolder, imageFileObjObj.filename))
  fse.moveSync(sightourResultFileObjObj.fullPath, path.join(targetFolder, sightourResultFileObjObj.filename))
  return getAllFileLists()
})

ipcMain.handle('evidence:uploaded', (event, payload) => {
  console.log('evidence:uploaded payload', payload)
  payload.map(data => {
    let imagePath = ''
    let jsonPath = ''
    const isWin = process.platform === 'win32'
    if (isWin) {
      imagePath = data['imageFullPath'].split('04\\')[1]
      jsonPath = data['jsonFullPath'].split('04\\')[1]
    } else {
      imagePath = data['imageFullPath'].split('04/')[1]
      jsonPath = data['jsonFullPath'].split('04/')[1]
    }
    if (data.status) {
      const targetFolder = path.join(config.fileFolder, stageFolders.evidenceUploaded.folder)
      const targetImagePath = targetFolder + '/' + imagePath
      const targetJsonPath = targetFolder + '/' + jsonPath
      fse.moveSync(data['imageFullPath'], targetImagePath)
      fse.moveSync(data['jsonFullPath'], targetJsonPath)
    } else {
      const json = fse.readJSONSync(data['jsonFullPath'])
      json['errorMsg'] = data['json']['errorMsg']
      fse.writeJSONSync(data['jsonFullPath'], json)
    }
  })
  return getAllFileLists()
})
const getFileExt = (fileName) => {
  if (fileName.endsWith('jpg') || fileName.endsWith('png')) {
    return 'image'
  }
  return 'json'
}

ipcMain.handle('evidence:getRawDataWithImage', (event, fullPathList) => {
  console.log('getRawDataWithImage', fullPathList)
  return fullPathList.map(d => {
    const key = R.keys(d)[0]
    const r = d[key].map(fileObj => {
      const fileExt = getFileExt(fileObj.filename.split('.')[1])
      const value = getFileContent(fileObj.fullPath)
      let json = {}
      json[fileExt] = value
      const filePathKey = fileExt + 'FullPath'
      json[filePathKey] = fileObj.fullPath
      return json
    })
    const byTicketId = R.groupBy(function(data) {
      let ticketId = ''
      if (data['image'] === undefined) {
        ticketId = data['json']['ticket']
      } else {
        ticketId = data['imageFullPath'].split('_')[6].split('.')[0]
      }
      return ticketId
    })
    return byTicketId(r)
  })
})

ipcMain.handle('evidence:getAssign', (event) => {
  const targetFilePath = config.fileFolder + '/' + 'assign.json'
  return fse.readJSONSync(targetFilePath)
})
