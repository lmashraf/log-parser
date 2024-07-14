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

    processLogs(parsedLogs)
}


function processLogs(logs) {
    console.log("Calling displayLogs with logs:", logs);

    if (logs) {
        renderChart(logs);
        updateTooltip(logs);
        populateTable(logs);
    } else {
        console.error('No logs provided to displayLogs');
    }
}

function renderChart(logs) {
    console.log("Rendering the chart with logs:", logs);
}

function updateTooltip(logs) {
    console.log("Updating the tooltip with logs:", logs);
    const logsInFile = document.getElementById('logsInFile');
    const logsFromSelectedTags = document.getElementById('logsFromSelectedTags');

    if (logsInFile && logsFromSelectedTags) {
        logsInFile.textContent = logs ? logs.length : 0;
        logsFromSelectedTags.textContent = logs ? logs.length : 0;
        console.log('Logs in File:', logs ? logs.length : 0);
        console.log('Logs from Selected Tags:', logs ? logs.length : 0);
    } else {
        console.error('Tooltip elements not found');
    }
}


function populateTable(logs) {
    console.log("Populating the table with logs:", logs.length);

    const logTableBody = document.getElementById('logTableBody');
    logTableBody.innerHTML = ''; // Clear any existing rows

    logs.forEach(log => {
        const row = document.createElement('tr');

        // Create and append Timestamp cell
        const timestampCell = document.createElement('td');
        timestampCell.textContent = log.timestamp;
        row.appendChild(timestampCell);

        // Create and append Severity cell with SVG icon
        const severityCell = document.createElement('td');
        const severityIcon = document.createElement('img');
        severityIcon.src = `assets/tag-${log.logLevel.toLowerCase()}.svg`; // Assuming logLevel matches tag names
        severityIcon.alt = log.logLevel;
        severityIcon.className = 'tag-icon';
        severityCell.appendChild(severityIcon);
        severityCell.appendChild(document.createTextNode(log.logLevel.toUpperCase()));
        row.appendChild(severityCell);

        // Create and append Message cell
        const messageCell = document.createElement('td');
        messageCell.textContent = log.message;
        row.appendChild(messageCell);

        // Append the row to the table body
        logTableBody.appendChild(row);
    });

    console.log("Populated the table with logs:", logs.length);
}
