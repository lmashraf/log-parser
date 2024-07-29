let filteredLogsLength = 0;
let totalLogsLength = 0;

export function forwardSelectedOptions() {
    const selectedOptions = JSON.parse(localStorage.getItem('selectedOptions'));

    if (selectedOptions) {
        document.getElementById('dataSource').value = selectedOptions.sourceInput;
        document.getElementById('sourceFormat').value = selectedOptions.formatSelectLabel;
    }
}

export function forwardParsedLogs() {
    const parsedLogs = JSON.parse(localStorage.getItem('parsedLogs'));
    console.log('Forwarding parsed logs to the viewer. Total logs:', parsedLogs ? parsedLogs.length : 0);

    if (parsedLogs) {
        localStorage.setItem('forwardedLogs', JSON.stringify(parsedLogs));
        totalLogsLength = parsedLogs.length;
        filteredLogsLength = parsedLogs.length;
    }

    processLogs(parsedLogs);
}

function processLogs(logs) {
    if (logs && Array.isArray(logs)) {
        updateTooltipData(logs);

        filteredLogsLength = updateTable();
        totalLogsLength = logs.length;

        // Update tooltip with the correct log counts
        const logsFromSelectedTags = document.getElementById('logsFromSelectedTags');
        const logsInFile = document.getElementById('logsInFile');
        if (logsFromSelectedTags) {
            logsFromSelectedTags.textContent = filteredLogsLength;
        }
        if (logsInFile) {
            logsInFile.textContent = totalLogsLength;
        }
    } else {
        console.error('No logs provided to processLogs');
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
export function updateTooltipData(logs) {
    const occurrences = calculateOccurrences(logs);
    const percentages = calculatePercentages(occurrences, logs.length);

    // Store occurrences and percentages in localStorage for tooltip.js to use
    localStorage.setItem('occurrences', JSON.stringify(occurrences));
    localStorage.setItem('percentages', JSON.stringify(percentages));
}

// Function to update the table based on the current state of the tags
export function updateTable() {
    const logTableBody = document.getElementById('logTableBody');
    logTableBody.innerHTML = ''; // Clear any existing rows

    const parsedLogs = getParsedLogs();
    const disabledTags = Array.from(document.querySelectorAll('.tag-item.disabled')).map(tag => tag.dataset.tag.toUpperCase());

    // Remove duplicate tags in the disabledTags array
    const uniqueDisabledTags = [...new Set(disabledTags)];

    console.log('Unique disabled tags:', uniqueDisabledTags);

    const filteredLogs = parsedLogs.filter(log => !uniqueDisabledTags.includes(log.logLevel.toUpperCase()));

    filteredLogs.forEach(log => {
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

    filteredLogsLength = filteredLogs.length;

    return filteredLogsLength;
}
