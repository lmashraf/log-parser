let filteredLogsLength = 0;
let totalLogsLength = 0;

export function forwardSelectedOptions() {
    const selectedOptions = JSON.parse(localStorage.getItem('selectedOptions'));
    console.log('Forwarding selected options to the viewer:', selectedOptions);

    if (selectedOptions) {
        document.getElementById('dataSource').value = selectedOptions.sourceInput;
        document.getElementById('sourceFormat').value = selectedOptions.formatSelectLabel;
    }
}

export function forwardParsedLogs() {
    const parsedLogs = JSON.parse(localStorage.getItem('parsedLogs'));
    console.log('Forwarding parsed logs to the viewer. Total logs:', parsedLogs.length);

    if (parsedLogs) {
        localStorage.setItem('forwardedLogs', JSON.stringify(parsedLogs));
        totalLogsLength = parsedLogs.length; // Set totalLogsLength to the total logs length initially
        filteredLogsLength = parsedLogs.length; // Set filteredLogsLength to the total logs length initially
    }

    processLogs(parsedLogs);
}

function processLogs(logs) {
    if (logs) {
        console.log('Processing logs. Total logs:', logs.length);
        totalLogsLength = logs.length; // Ensure total number of logs is set
        renderChart(logs);
        updateTooltipData(logs);
        filteredLogsLength = updateTable(); // Ensure the table is populated

        // Ensure tooltip is updated with the correct log counts
        const logsFromSelectedTags = document.getElementById('logsFromSelectedTags');
        const logsInFile = document.getElementById('logsInFile');
        if (logsFromSelectedTags) {
            logsFromSelectedTags.textContent = filteredLogsLength;
        }
        if (logsInFile) {
            logsInFile.textContent = totalLogsLength;
        }
    } else {
        console.error('No logs provided to displayLogs');
    }
}

export function getParsedLogs() {
    const parsedLogs = JSON.parse(localStorage.getItem('parsedLogs'));
    console.log('Getting parsed logs. Total logs:', parsedLogs.length);
    return parsedLogs;
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
    console.log('Calculated occurrences:', occurrences);
    return occurrences;
}

export function calculatePercentages(occurrences, totalLogs) {
    const percentages = {};
    for (const logLevel in occurrences) {
        percentages[logLevel] = (occurrences[logLevel] / totalLogs) * 100;
    }
    console.log('Calculated percentages:', percentages);
    return percentages;
}

// Updates the tooltip's data based on the parsed logs
export function updateTooltipData(logs) {
    console.log('Updating the tooltip with total logs:', logs.length);
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
    console.log('Disabled tags:', disabledTags);

    const filteredLogs = parsedLogs.filter(log => !disabledTags.includes(log.logLevel.toUpperCase()));
    console.log('Filtered logs count:', filteredLogs.length); // Debug statement

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

    console.log("Updated the table with filtered logs:", filteredLogs.length); // Debug statement
    filteredLogsLength = filteredLogs.length;
    console.log('Updated filteredLogsLength:', filteredLogsLength); // Debug statement
    return filteredLogsLength; // Return the number of filtered logs
}

export function getFilteredLogsLength() {
    return filteredLogsLength;
}

export function renderChart(logs) {
    console.log("Rendering the chart with total logs:", logs.length);
}
