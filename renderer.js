import CustomDropdown from './components/custom-dropdown.js';

document.addEventListener('DOMContentLoaded', async () => {
    console.log('DOM fully loaded and parsed');

    // Check which page is loaded
    if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
        await populateDropdownOptions();
        addRadioEventListeners();

        // Add event listener for "Make the Magic" button
        const parseButton = document.getElementById('parseButton');
        if (parseButton) {
            parseButton.addEventListener('click', handleMagicButtonClick);
        }
    }

    // Display selected options if on parser.html
    if (window.location.pathname.endsWith('parser.html')) {
        displaySelectedOptions();
    }
});

async function populateDropdownOptions() {
    const formatSelect = document.getElementById('formatSelect');
    if (!formatSelect) {
        console.error('Dropdown element not found');
        return;
    }
    console.log('Requesting dropdown options');
    try {
        const options = await window.electron.getDropdownOptions();
        console.log('Received dropdown options:', options);

        options.forEach(option => {
            const opt = document.createElement('option');
            opt.value = option.value;
            opt.textContent = option.label;
            formatSelect.appendChild(opt);
        });

        console.log('Dropdown options populated');
        initializeCustomDropdown(); // Initialize only after options are populated
    } catch (error) {
        console.error('Error fetching dropdown options:', error);
    }
}

function initializeCustomDropdown() {
    document.querySelectorAll('.custom-select').forEach(select => {
        if (!select.classList.contains('initialized')) {
            new CustomDropdown(select);
            select.classList.add('initialized');
            console.log('Custom dropdown initialized for:', select);
        }
    });
}

function addRadioEventListeners() {
    const radioButtons = document.querySelectorAll('input[name="loadFrom"]');
    radioButtons.forEach(radio => {
        radio.addEventListener('change', handleRadioChange);
    });
}

function handleRadioChange(event) {
    const inputContainer = document.getElementById('inputContainer');
    const selectedValue = event.target.value;
    console.log('Selected radio button:', selectedValue);

    // Clear the current input container content
    inputContainer.innerHTML = '';

    // Add new content based on selected radio button
    if (selectedValue === 'url') {
        const input = document.createElement('input');
        input.type = 'text';
        input.id = 'sourceInput';
        input.placeholder = 'Insert your URL here...';
        input.className = 'dynamic-input'; // Add class for consistent styling
        inputContainer.appendChild(input);
    } else if (selectedValue === 'file') {
        const label = document.createElement('label');
        label.className = 'file-input-label';
        label.setAttribute('data-text', 'No file chosen');

        const inputText = document.createElement('span');
        inputText.className = 'file-text';
        inputText.textContent = 'No file chosen';

        const browseButton = document.createElement('span');
        browseButton.className = 'browse-button';
        browseButton.textContent = 'Browse';

        const input = document.createElement('input');
        input.type = 'file';
        input.id = 'sourceInput';
        input.className = 'dynamic-input'; // Add class for consistent styling
        input.addEventListener('change', function () {
            inputText.textContent = input.files[0] ? input.files[0].name : 'No file chosen';
        });

        label.appendChild(input);
        label.appendChild(inputText);
        label.appendChild(browseButton);
        inputContainer.appendChild(label);
    } else if (selectedValue === 'text') {
        const textarea = document.createElement('textarea');
        textarea.id = 'sourceInput';
        textarea.placeholder = 'Paste your text log here...';
        textarea.className = 'dynamic-textarea'; // Add class for consistent styling
        inputContainer.appendChild(textarea);
    }
}

// Function to handle the "Make the Magic" button click
function handleMagicButtonClick() {
    const loadFrom = document.querySelector('input[name="loadFrom"]:checked').value;
    const sourceInputElement = document.getElementById('sourceInput');
    const sourceInput = sourceInputElement ? sourceInputElement.value : '';
    const formatSelect = document.getElementById('formatSelect').value;

    const selectedOptions = {
        loadFrom,
        sourceInput,
        formatSelect
    };

    localStorage.setItem('selectedOptions', JSON.stringify(selectedOptions));
    window.location.href = 'parser.html';
}

// Function to display selected options on parser.html
function displaySelectedOptions() {
    const selectedOptionsContainer = document.getElementById('selectedOptionsContainer');
    const selectedOptions = JSON.parse(localStorage.getItem('selectedOptions'));

    if (selectedOptions) {
        const loadFromText = document.createElement('p');
        loadFromText.textContent = `Load From: ${selectedOptions.loadFrom}`;
        selectedOptionsContainer.appendChild(loadFromText);

        const sourceInputText = document.createElement('p');
        sourceInputText.textContent = `Source Input: ${selectedOptions.sourceInput}`;
        selectedOptionsContainer.appendChild(sourceInputText);

        const formatSelectText = document.createElement('p');
        formatSelectText.textContent = `Format: ${selectedOptions.formatSelect}`;
        selectedOptionsContainer.appendChild(formatSelectText);
    }
}
