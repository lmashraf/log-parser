import DropdownBox from './components/dropdownbox.js';

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
        forwardSelectedOptions();

        // Add event listener for "LOAD AFRESH" button
        const loadAfreshButton = document.getElementById('loadAfreshButton');
        if (loadAfreshButton) {
            loadAfreshButton.addEventListener('click', () => {
                window.location.href = 'index.html';
            });
        }
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

        console.log('Dropdown Box options populated');
        initialiseDropdownBox(); // Initialize only after options are populated
    } catch (error) {
        console.error('Error fetching dropdown options:', error);
    }
}

function initialiseDropdownBox() {
    document.querySelectorAll('.custom-select').forEach(select => {
        if (!select.classList.contains('initialised')) {
            new DropdownBox(select);
            select.classList.add('initialised');
            console.log('Dropdown Box initialised for:', select);
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
    const sourceInputElement = document.getElementById('sourceInput');
    const sourceInput = sourceInputElement ? sourceInputElement.value : '';
    const formatSelectElement = document.getElementById('formatSelect');
    const formatSelectLabel = formatSelectElement.options[formatSelectElement.selectedIndex].text;

    const selectedOptions = {
        sourceInput,
        formatSelectLabel
    };

    localStorage.setItem('selectedOptions', JSON.stringify(selectedOptions));
    window.location.href = 'parser.html';
}

// Function to display selected options on parser.html
function forwardSelectedOptions() {
    const selectedOptions = JSON.parse(localStorage.getItem('selectedOptions'));

    if (selectedOptions) {
        document.getElementById('dateSource').value = selectedOptions.sourceInput;
        document.getElementById('sourceFormat').value = selectedOptions.formatSelectLabel;
    }
}