export function forwardSelectedOptions() {
    const selectedOptions = JSON.parse(localStorage.getItem('selectedOptions'));

    if (selectedOptions) {
        document.getElementById('dataSource').value = selectedOptions.sourceInput;
        document.getElementById('sourceFormat').value = selectedOptions.formatSelectLabel;
    }
}
