export function handleMagicButtonClick() {
    const sourceInputElement = document.getElementById('sourceInput');
    const sourceInput = sourceInputElement ? sourceInputElement.value : '';
    const formatSelectElement = document.getElementById('formatSelect');
    const formatSelectLabel = formatSelectElement.options[formatSelectElement.selectedIndex].text;

    const selectedOptions = {
        sourceInput,
        formatSelectLabel
    };

    localStorage.setItem('selectedOptions', JSON.stringify(selectedOptions));
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
