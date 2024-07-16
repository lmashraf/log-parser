const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

// Electron Reload
require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
});

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1400,
        height: 900,
        autoHideMenuBar: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            enableRemoteModule: false,
        }
    });

    mainWindow.loadFile('main.html');
    // debug
    mainWindow.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

ipcMain.handle('get-dropdown-options', async () => {
    const configPath = path.join(__dirname, './properties/log-formats.json');
    const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    return config.dropdownOptions;
});

// Add the new IPC listener for resizing the window
ipcMain.on('resize-window', (event, { width, height }) => {
    if (mainWindow) {
        mainWindow.setBounds({ x: 0, y: 0, width, height });
    }
});
