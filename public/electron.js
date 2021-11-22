const electron = require('electron')
const fse = require('fs-extra')
const path = require('path')
const R = require('ramda')
const app = electron.app
const ipcMain = electron.ipcMain
const isDev = require('electron-is-dev')
const BrowserWindow = electron.BrowserWindow
const userHomedir = require('os').homedir()
const process = require('process')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const {globalShortcut} = electron
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
    if (!fse.existsSync(config.rootFolder)) {
        fse.mkdirSync(config.rootFolder)
    }
    if (!fse.existsSync(config.fileFolder)) {
        fse.mkdirSync(config.fileFolder)
    }
    Object.keys(persistenceFolder).forEach(key => {
        const folderPath = path.join(config.fileFolder, key)
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
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: false,
            autoHideMenuBar: true,
        }
    })
    mainWindow.setAutoHideMenuBar(true)
    mainWindow.setMenu(null)
    mainWindow.maximize()
    // and load the index.html of the app.
    var fileLocation = `file://${path.join(__dirname, '../build/index.html')}`
    var devServerUrl = 'http://localhost:3000'
    mainWindow.loadURL(!isDev ? devServerUrl : fileLocation)
    // Open the DevTools.
    if (isDev) {
        mainWindow.webContents.openDevTools()
    }

    mainWindow.webContents.setWindowOpenHandler(({url}) => {
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
        const fileLocation = `file://${path.join(__dirname, '../public/image.html')}`
        //todo
        childWindow.loadURL(fileLocation)
        childWindow.webContents.on('will-navigate', (e) => {
            e.preventDefault()
        })
    })
    mainWindow.on("closed", () => (mainWindow = null));

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', initApp)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
})


app.on('browser-window-focus', function () {
    globalShortcut.register("CommandOrControl+R", () => {
        console.log("CommandOrControl+R is pressed: Shortcut Disabled");
    });
    globalShortcut.register("F5", () => {
        console.log("F5 is pressed: Shortcut Disabled");
    });
});
app.on('browser-window-blur', function () {
    globalShortcut.unregister('CommandOrControl+R');
    globalShortcut.unregister('F5');
});

const persistenceFolder = {
    'image': 'image',
    'db': 'db',
    'backup': 'backup'
}

function openFile(directory) {
    let fileInfo = fse.readdirSync(directory)
    let fileResult = fileInfo.filter(filename => {
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
    if (R.endsWith('.jpg', fullPath)) {
        return fse.readFileSync(fullPath)
    }
    if (R.endsWith('.jpeg', fullPath)) {
        return fse.readFileSync(fullPath)
    }
}


function getDbContext(businessEntityTaxId) {
    const filePath = config.fileFolder + '/' + persistenceFolder.db + '/' + businessEntityTaxId + '.json'
    const adapter = new FileSync(filePath)
    const db = low(adapter)
    db.defaults({'01': {}, '02': {}, '03': {}, '04': {}, '05': {}})
        .write()
    return db
}

//todo remove but not now
ipcMain.handle('evidence:saveAssign', (event, payload) => {
    const targetFilePath = config.fileFolder + '/' + 'assign.json'
    fse.writeJSONSync(targetFilePath, payload, {encoding: 'utf8', flag: 'w'})
})

ipcMain.handle('evidence:getImageFileContent', (event, fullPath) => {
    return getFileContent(fullPath)
})


ipcMain.handle('evidence:getChooseBusinessEntityData', (event, taxId) => {
    return getDbContext(taxId).read().value()
})

ipcMain.handle('evidence:updateData', (event, businessEntityTaxId, payload) => {
    const ticketId = payload['ticketId'].result
    const db = getDbContext(businessEntityTaxId)
    db.get('03')
        .assign({[ticketId]: payload})
        .write()
    return db.read().value()

})
ipcMain.handle('evidence:deleteData', (event, businessEntityTaxId, step, id) => {
    const db = getDbContext(businessEntityTaxId)
    const data = db.get(step)
        .value()
    delete data[id]
    db.get(step)
        .assign(data)
        .write()
    const targetFolderPath = path.join(config.fileFolder, persistenceFolder.image)
    const imageFileList = openFile(targetFolderPath)
    imageFileList.filter(obj => {
        return obj.filename.split('_')[2].split('.')[0] === id
    }).forEach(obj => {
        fse.removeSync(obj.fullPath)
    })
    return db.read().value()
})

ipcMain.handle('evidence:scanImages', (event, fullPath, username, declareProperties) => {
    console.log('scanImages', declareProperties)
    const sourceFileExt = getFileExt(fullPath)
    const targetFolderPath = path.join(config.fileFolder, persistenceFolder.image)
    const id = Date.now()
    const targetFilePath = path.join(targetFolderPath, username.username + '_' + username.taxId + '_' + id + '.' + sourceFileExt)
    console.log(targetFilePath)
    fse.copySync(fullPath, targetFilePath)
    const data = {
        [id]: {
            reportingPeriod: {result: declareProperties.reportingPeriod, score: [-1]},
            deductionType: {result: '1', score: [-1]},
            isDeclareBusinessTax: {result: declareProperties.isDeclareBusinessTax, score: [-1]},
            gwEvidenceType: {result: declareProperties.evidenceType, score: [-1]},
            fullPath: {result: targetFilePath, score: [-1]}
        }
    }
    const db = getDbContext(username.taxId)
    db.get('01')
        .assign(data)
        .write()
    return db.read().value()
})

ipcMain.handle('evidence:identifyResultConfirmed', (event, businessEntityTaxId, payload) => {
    const db = getDbContext(businessEntityTaxId)
    for (let i = 0; i < payload.length; i++) {
        const data03List = db.get('03').value()
        const data = {
            [payload[i]]: data03List[payload[i]]
        }
        db.get('04')
            .assign(data)
            .write()
        delete data03List[payload[i]]
        db.get('03')
            .assign(data03List)
            .write()
    }
    return db.read().value()
})

ipcMain.handle('evidence:getJsonFileData', (event, ticketId, businessEntityTaxId) => {
    return getDbContext(businessEntityTaxId)
        .get('03')
        .get(ticketId)
        .value()
})

ipcMain.handle('evidence:identifySent', (event, sentIdentifyResult) => {
    //
    const username = sentIdentifyResult['user']
    const identifyResult = sentIdentifyResult['result']
    const businessEntityTaxId = identifyResult[0].businessEntityTaxId
    const db = getDbContext(businessEntityTaxId)
    for (let i = 0; i < identifyResult.length; i++) {
        const data = identifyResult[i]
        if (data['result']) {
            const fileExt = data['sourceFullPath'].split('_')[2].split('.')[1]
            const targetFileName = username + '_' + data['businessEntityTaxId'] + '_' + data['ticketId'] + '.' + fileExt
            const targetFullName = path.join(config.fileFolder, persistenceFolder.image, targetFileName)
            fse.moveSync(data.sourceFullPath, targetFullName)
            const id = data['sourceFileName'].split('_')[1].split('.')[0]
            const data01List = db.get('01').value()
            data01List[id].fullPath.result = targetFullName
            const data02 = {
                [data['ticketId']]: data01List[id]
            }
            db.get('02')
                .assign(data02)
                .write()
            delete data01List[id]
            db.get('01')
                .assign(data01List)
                .write()
        }
    }
    return db.read().value()
})
ipcMain.handle('evidence:identifyResultReceived', (event, businessEntityTaxId, identifyResult) => {
    const db = getDbContext(businessEntityTaxId)
    for (let i = 0; i < identifyResult.length; i++) {
        const data = identifyResult[i]
        const data02List = db.get('02').value()
        const data03 = {
            [data['ticketId'].result]: data
        }
        db.get('03')
            .assign(data03)
            .write()
        delete data02List[data['ticketId'].result]
        db.get('02')
            .assign(data02List)
            .write()
    }
    return db.read().value()
})


ipcMain.handle('evidence:uploaded', (event, businessEntityTaxId, payload) => {

    const db = getDbContext(businessEntityTaxId)
    payload.map(data => {
        const ticketId = data.json['ticketId']
        if (data.status) {
            //move image
            const targetFolder = path.join(config.fileFolder, persistenceFolder.backup)
            const targetImagePath = path.join(targetFolder, ticketId + '.' + getFileExt(data.json.fullPath))
            fse.moveSync(data.json.fullPath, targetImagePath)
            const db04 = db.get('04').value()
            const data05 = {
                [ticketId]: db04[data.json[ticketId]]
            }
            db.get('05')
                .assign(data05)
                .write()
            delete db04[ticketId]
            db.get('04')
                .assign(db04)
                .write()
            //save data to 05
        } else {
            console.log('BB')
            const db04 = db.get('04').value()
            db04[data.json['ticketId']]['errorMsg'].result = data.json['errorMsg']
            db.get('04')
                .assign(db04)
                .write()
        }
    })
    return db.read().value()
})
const getFileExt = (fileName) => {
    if (fileName.endsWith('jpg')) {
        return 'jpg'
    }
    if (fileName.endsWith('png')) {
        return 'png'
    }
    return 'json'
}


ipcMain.handle('evidence:getAssign', (event) => {
    const targetFilePath = config.fileFolder + '/' + 'assign.json'
    return fse.readJSONSync(targetFilePath)
})
