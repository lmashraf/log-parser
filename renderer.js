import { populateDropdownOptions } from './renderer/dropdown-options.js';
import { addRadioEventListeners } from './renderer/radio-events.js';
import { addMagicButtonEventListener, addReloadButtonEventListener } from './renderer/button-events.js';
import { forwardSelectedOptions, forwardParsedLogs } from './renderer/process-data.js';


document.addEventListener('DOMContentLoaded', async () => {
    const isMainPage = window.location.pathname.endsWith('index.html') || window.location.pathname === '/';
    const isViewerPage = window.location.pathname.endsWith('viewer.html');

    console.log('DOMContentLoaded event fired');

    try {
        if (isMainPage) {
            console.log('Initializing main page');
            await populateDropdownOptions();
            addRadioEventListeners();
            addMagicButtonEventListener();
        }

        if (isViewerPage) {
            console.log('Initializing viewer page');
            forwardSelectedOptions();
            forwardParsedLogs();
            addReloadButtonEventListener();

            // Conditionally load chart.js only for viewer.html
            import('./components/chart.js').then(module => {
                const Chart = module.default;
                const chartContainerElement = document.getElementById('chartContainer');
                if (chartContainerElement) {
                    new Chart('chartContainer');
                } else {
                    console.error('chartContainer element not found.');
                }
            }).catch(error => {
                console.error('Error loading chart.js:', error);
            });
        }
    } catch (error) {
        console.error('Error during initialization:', error);
    }
});
