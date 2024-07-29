import parseLog from '../parsers/log-parser.js';

function navigateToViewer() {
    window.location.href = 'viewer.html';
}

function navigateToMain() {
    window.location.href = 'index.html';
}

async function fetchLogData(url, formatLabel, source) {
    try {
        const response = await fetch(url);
        const data = await response.text();
        processLogData(data, formatLabel, source);
        setTimeout(navigateToViewer, 100);
    } catch (error) {
        console.error('Error fetching log file:', error);
        console.error('Failed to fetch log file. Please check the URL and try again.');
    }
}

function handleFileRead(reader, file, formatLabel) {
    reader.onload = (event) => {
        processLogData(event.target.result, formatLabel, file.name);
        setTimeout(navigateToViewer, 100);
    };
    reader.onerror = (error) => {
        console.error('Error reading file:', error);
        console.error('Failed to read log file. Please try again.');
    };
}

function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

export function handleMagicButtonClick() {
    const sourceInputElement = document.getElementById('sourceInput');
    const formatSelectElement = document.getElementById('formatSelect');
    const formatLabel = formatSelectElement.value;
    const loadFrom = document.querySelector('input[name="loadFrom"]:checked').value;

    if (loadFrom === 'url') {
        const url = sourceInputElement.value;
        if (isValidUrl(url)) {
            fetchLogData(url, formatLabel, url);
        } else {
            console.error('Invalid URL. Please enter a valid URL.');
        }
    } else if (loadFrom === 'file') {
        const file = sourceInputElement.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const fileContent = event.target.result;
                console.log('File content:', fileContent);

                // Normalize line endings
                const normalizedContent = fileContent.replace(/\r\n/g, '\n');
                processLogData(normalizedContent, formatLabel, file.name);
                navigateToViewer();  // Ensure navigation is inside onload
            };
            reader.onerror = (error) => {
                console.error('Error reading file:', error);
            };
            reader.readAsText(file);
        } else {
            console.error('No file selected. Please choose a log file.');
        }
    } else if (loadFrom === 'text') {
        const logData = sourceInputElement.value.trim();
        if (logData) {
            processLogData(logData, formatLabel, 'Text Log');
            navigateToViewer();  // Ensure this happens after processing
        } else {
            console.error('Text input cannot be empty.');
        }
    }
}


function processLogData(data, format, source) {
    const logLines = data.split('\n');
    const parsedLogs = logLines.map(line => parseLog(line, format)).filter(log => log !== null);

    console.log('Parsed Logs:', parsedLogs);

    const selectedOptions = {
        sourceInput: source,
        formatSelectLabel: format
    };

    localStorage.setItem('selectedOptions', JSON.stringify(selectedOptions));
    localStorage.setItem('parsedLogs', JSON.stringify(parsedLogs));

    // Log the stored data
    console.log('Stored selectedOptions:', JSON.parse(localStorage.getItem('selectedOptions')));
    console.log('Stored parsedLogs:', JSON.parse(localStorage.getItem('parsedLogs')));
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
            navigateToMain();
        });
    }
}
