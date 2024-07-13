const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1400,
        height: 900,
        autoHideMenuBar: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            enableRemoteModule: false,
        }
    });

    mainWindow.loadFile('index.html');
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
    const options = [
        { value: 'custom', label: 'Custom Format (User-Defined)' },
        { value: 'apache', label: 'Apache Log Format' },
        { value: 'nginx', label: 'Nginx Log Format' },
        { value: 'json', label: 'JSON Log Format' },
        { value: 'xml', label: 'XML Log Format' },
        { value: 'csv', label: 'CSV Log Format' },
        { value: 'syslog', label: 'Syslog Format' },
        { value: 'common', label: 'Common Log Format' }
    ];
    return options;
});
