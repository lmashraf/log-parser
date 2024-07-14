export function addRadioEventListeners() {
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
