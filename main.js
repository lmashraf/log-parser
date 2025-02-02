const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

// Electron Reload - Only in Development Mode
if (process.env.NODE_ENV !== 'production') {
    try {
        require('electron-reload')(__dirname, {
            electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
        });
    } catch (err) {
        console.log('Failed to load electron-reload:', err);
    }
}

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 720,
        autoHideMenuBar: true,
        title: "Log Parser",
        thickFrame: true,
        frame: false,
        transparent: true,
        show: true,
        roundedCorners: true,
        fullscreenable: false,
        resizable: false,
        icon: path.join(__dirname, 'assets/logparser_icon.png'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            enableRemoteModule: false,
        }
    });

    initialBounds = mainWindow.getBounds();

    mainWindow.loadFile('main.html');
    // debug
    if (process.env.NODE_ENV !== 'production') {
        mainWindow.webContents.openDevTools();
    }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

ipcMain.handle('get-dropdown-options', async () => {
    const configPath = path.resolve(__dirname, './properties/log-formats.json');
    try {
        const config = JSON.parse(await fs.promises.readFile(configPath, 'utf-8'));
        return config.dropdownOptions;
    } catch (error) {
        console.error('Error reading config file', error);
        throw error;
    }
});

// Add the new IPC listener for resizing the window
ipcMain.on('resize-window', (event, { width, height }) => {
    if (mainWindow) {
        const [x, y] = mainWindow.getPosition();
        mainWindow.setBounds({ x, y: 20, width, height });
    }
});

ipcMain.on('restore-initial-size', (event) => {
    if (mainWindow) {
        mainWindow.setBounds(initialBounds);
    }
});
