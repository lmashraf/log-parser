const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    getDropdownOptions: async () => {
        console.log('Requesting dropdown options from main process');
        const options = await ipcRenderer.invoke('get-dropdown-options');
        console.log('Received options in preload:', options);
        return options;
    },
    send: (channel, data) => {
        ipcRenderer.send(channel, data);
    }
});
