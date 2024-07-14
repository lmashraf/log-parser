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
        displayLogs(parsedLogs);
    }
}

function displayLogs(logs) {
    console.log(logs); // Example: Display logs in console

    // TODO: Implement chart rendering
    // TODO: Implement tooltip updates
    // TODO: Implement table rendering
}
