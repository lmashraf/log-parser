import { populateDropdownOptions } from './renderer/dropdown-options.js';
import { addRadioEventListeners } from './renderer/radio-events.js';
import { addMagicButtonEventListener, addReloadButtonEventListener } from './renderer/button-events.js';
import { forwardSelectedOptions } from './renderer/navigation.js';
import './components/tag.js';

document.addEventListener('DOMContentLoaded', async () => {
    console.log('DOM fully loaded and parsed');

    try {
        // Check which page is loaded
        if (window.location.pathname.endsWith('main.html') || window.location.pathname === '/') {
            await populateDropdownOptions();
            addRadioEventListeners();
            addMagicButtonEventListener();
        }

        // Display selected options if on viewer.html
        if (window.location.pathname.endsWith('viewer.html')) {
            forwardSelectedOptions();
            addReloadButtonEventListener();
        }
    } catch (error) {
        console.error('Error during initialization:', error);
        alert('An error occurred while initialising the application. Please try again.');
    }
});
