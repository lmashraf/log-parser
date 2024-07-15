export function forwardSelectedOptions() {
    const selectedOptions = JSON.parse(localStorage.getItem('selectedOptions'));

    if (selectedOptions) {
        document.getElementById('dataSource').value = selectedOptions.sourceInput;
        document.getElementById('sourceFormat').value = selectedOptions.formatSelectLabel;
    }
}

export function forwardParsedLogs() {
    const parsedLogs = JSON.parse(localStorage.getItem('parsedLogs'));

    if (parsedLogs) {
        console.log('Forwarding parsedLogs:', parsedLogs);
        localStorage.setItem('forwardedLogs', JSON.stringify(parsedLogs));
    }

    processLogs(parsedLogs);
}

function processLogs(logs) {
    console.log("Calling displayLogs with logs:", logs);

    if (logs) {
        renderChart(logs);
        updateTooltipData(logs);
        populateTable(logs);
    } else {
        console.error('No logs provided to displayLogs');
    }
}

export function getParsedLogs() {
    return JSON.parse(localStorage.getItem('parsedLogs'));
}

export function calculateOccurrences(logs) {
    const occurrences = {};
    logs.forEach(log => {
        const logLevel = log.logLevel.toUpperCase();
        if (occurrences[logLevel]) {
            occurrences[logLevel]++;
        } else {
            occurrences[logLevel] = 1;
        }
    });
    return occurrences;
}

export function calculatePercentages(occurrences, totalLogs) {
    const percentages = {};
    for (const logLevel in occurrences) {
        percentages[logLevel] = (occurrences[logLevel] / totalLogs) * 100;
    }
    return percentages;
}

// Updates the tooltip's data based on the parsed logs
function updateTooltipData(logs) {
    console.log("Updating the tooltip with logs:", logs);
    const occurrences = calculateOccurrences(logs);
    const percentages = calculatePercentages(occurrences, logs.length);

    // Store occurrences and percentages in localStorage for tooltip.js to use
    localStorage.setItem('occurrences', JSON.stringify(occurrences));
    localStorage.setItem('percentages', JSON.stringify(percentages));
}


// Renders the chart based on the parsed logs
function renderChart(logs) {
    console.log("Rendering the chart with logs:", logs);
}

// Populates the table and renders its content based on the parsed logs
function populateTable(logs) {
    const logTableBody = document.getElementById('logTableBody');
    logTableBody.innerHTML = ''; // Clear any existing rows

    logs.forEach(log => {
        const row = document.createElement('tr');

        // Create and append Timestamp cell
        const timestampCell = document.createElement('td');
        timestampCell.textContent = log.timestamp;
        row.appendChild(timestampCell);

        // Create and append Log Level cell with SVG icon
        const logLevelCell = document.createElement('td');
        const logLevelIcon = document.createElement('img');
        logLevelIcon.src = `assets/tag-${log.logLevel.toLowerCase()}.svg`;
        logLevelIcon.alt = log.logLevel;
        logLevelIcon.className = 'tag-icon';
        logLevelCell.appendChild(logLevelIcon);
        logLevelCell.appendChild(document.createTextNode(log.logLevel.toUpperCase()));
        row.appendChild(logLevelCell);

        // Create and append Message cell
        const messageCell = document.createElement('td');
        messageCell.textContent = log.message;
        row.appendChild(messageCell);

        // Append the row to the table body
        logTableBody.appendChild(row);
    });

    console.log("Populated the table with logs:", logs.length);
}
