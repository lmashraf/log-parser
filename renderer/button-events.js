import parseLog from '../parsers/log-parser.js';

export function handleMagicButtonClick() {
    const sourceInputElement = document.getElementById('sourceInput');
    const formatSelectElement = document.getElementById('formatSelect');
    const formatSelectLabel = formatSelectElement.options[formatSelectElement.selectedIndex].value; // Use value instead of text
    const loadFrom = document.querySelector('input[name="loadFrom"]:checked').value;

    if (loadFrom === 'url') {
        fetch(sourceInputElement.value)
            .then(response => response.text())
            .then(data => processLogData(data, formatSelectLabel, sourceInputElement.value))
            .catch(error => {
                console.error('Error fetching log file:', error);
                alert('Failed to fetch log file. Please check the URL and try again.');
            });
    } else if (loadFrom === 'file') {
        const file = sourceInputElement.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const data = event.target.result;
                processLogData(data, formatSelectLabel, file.name);
            };
            reader.onerror = (error) => {
                console.error('Error reading file:', error);
                alert('Failed to read log file. Please try again.');
            };
            reader.readAsText(file);
        } else {
            alert('No file selected. Please choose a log file.');
        }
    } else if (loadFrom === 'text') {
        const logData = sourceInputElement.value;
        processLogData(logData, formatSelectLabel, 'Text Log');
    }
}

function processLogData(data, format, source) {
    const logLines = data.split('\n');
    const parsedLogs = logLines.map(line => parseLog(line, format)).filter(log => log !== null);

    const selectedOptions = {
        sourceInput: source,
        formatSelectLabel: format
    };

    localStorage.setItem('selectedOptions', JSON.stringify(selectedOptions));
    localStorage.setItem('parsedLogs', JSON.stringify(parsedLogs));

    // Display parsed logs in console for verification
    console.log('Selected Option:', selectedOptions);
    console.log('Parsed Logs:', parsedLogs);

    // Redirect to viewer.html if needed for future steps
    window.location.href = 'viewer.html';
}

export function addMagicButtonEventListener() {
    const parseButton = document.getElementById('parseButton');
    if (parseButton) {
        parseButton.addEventListener('click', handleMagicButtonClick);
    }
}

export function addReloadButtonEventListener() {
    const reloadButton = document.getElementById('reloadButton');
    if (reloadButton) {
        reloadButton.addEventListener('click', () => {
            window.location.href = 'main.html';
        });
    }
}
