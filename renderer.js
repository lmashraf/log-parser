import { populateDropdownOptions } from './renderer/dropdown-options.js';
import { addRadioEventListeners } from './renderer/radio-events.js';
import { addMagicButtonEventListener, addReloadButtonEventListener } from './renderer/button-events.js';
import { forwardSelectedOptions, forwardParsedLogs } from './renderer/process-data.js';
import './components/tag.js';
import './components/chart.js';

document.addEventListener('DOMContentLoaded', async () => {
    const isMainPage = window.location.pathname.endsWith('index.html') || window.location.pathname === '/';
    const isViewerPage = window.location.pathname.endsWith('viewer.html');

    try {
        if (isMainPage) {
            await populateDropdownOptions();
            addRadioEventListeners();
            addMagicButtonEventListener();
        }

        if (isViewerPage) {
            forwardSelectedOptions();
            forwardParsedLogs();
            addReloadButtonEventListener();
        }
    } catch (error) {
        console.error('An error occurred while initialising the application. Please try again.');
        console.error('Error during initialisation:', error);
    }
});
