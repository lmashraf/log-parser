document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded event fired');
    const parsedLogs = JSON.parse(localStorage.getItem('parsedLogs'));
    const selectedOptions = JSON.parse(localStorage.getItem('selectedOptions'));

    console.log('Retrieved parsedLogs:', parsedLogs);
    console.log('Retrieved selectedOptions:', selectedOptions);

    displaySelectedOptions(selectedOptions);
    displayLogs(parsedLogs);
});

function displaySelectedOptions(options) {
    const dataSource = document.getElementById('dataSource');
    const sourceFormat = document.getElementById('sourceFormat');

    if (options) {
        console.log('Setting selected options:', options);
        dataSource.value = options.sourceInput;
        sourceFormat.value = options.formatSelectLabel;
    }
}

function displayLogs(logs) {
    console.log("Parsed Logs:", logs);

    // TODO: Implement chart rendering
    // TODO: Implement tooltip updates
    // TODO: Implement table rendering
}
