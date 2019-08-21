const { app, BrowserWindow } = require('electron')

function createWindow () {
  let win = new BrowserWindow({
    width: 1024,
    height: 768,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
    }
  })

  win.loadFile('index.html')
}

app.on('ready', createWindow)