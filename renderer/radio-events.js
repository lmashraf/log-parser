export function addRadioEventListeners() {
    const radioButtons = document.querySelectorAll('input[name="loadFrom"]');
    radioButtons.forEach(radio => {
        radio.addEventListener('change', handleRadioChange);
    });
}

function handleRadioChange(event) {
    const inputContainer = document.getElementById('inputContainer');
    const selectedValue = event.target.value;
    inputContainer.innerHTML = '';

    const input = createInputElement(selectedValue);
    if (input) {
        inputContainer.appendChild(input);
    }
}

function createInputElement(selectedValue) {
    let element;
    switch (selectedValue) {
        case 'url':
            element = createTextInput('Insert your URL here...');
            break;
        case 'file':
            element = createFileInput('Click here to browse your file..');
            break;
        case 'text':
            element = createTextArea('Paste your text log here...');
            break;
    }
    return element;
}

function createTextInput(placeholder) {
    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'sourceInput';
    input.placeholder = placeholder;
    input.className = 'dynamic-input';
    return input;
}

function createFileInput(placeholder) {
    const label = document.createElement('label');
    label.className = 'file-input-label';
    label.setAttribute('data-text', placeholder);

    const inputText = document.createElement('span');
    inputText.className = 'file-text';
    inputText.textContent = placeholder;

    const browseButton = document.createElement('span');
    browseButton.className = 'browse-button';
    browseButton.textContent = 'Browse';

    const input = document.createElement('input');
    input.type = 'file';
    input.id = 'sourceInput';
    input.className = 'dynamic-input';
    input.addEventListener('change', function () {
        inputText.textContent = input.files[0] ? input.files[0].name : placeholder;
    });

    label.appendChild(input);
    label.appendChild(inputText);
    label.appendChild(browseButton);
    return label;
}

function createTextArea(placeholder) {
    const textarea = document.createElement('textarea');
    textarea.id = 'sourceInput';
    textarea.placeholder = placeholder;
    textarea.className = 'dynamic-textarea';
    return textarea;
}
