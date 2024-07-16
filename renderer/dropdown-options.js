import DropdownBox from '../components/dropdown-box.js';

export async function populateDropdownOptions() {
    const formatSelect = document.getElementById('formatSelect');
    if (!formatSelect) {
        console.error('Dropdown element not found');
        return;
    }

    try {
        const options = await window.electron.getDropdownOptions();
        console.log('Received dropdown options:', options);

        options.forEach(option => {
            const opt = document.createElement('option');
            opt.value = option.value;
            opt.textContent = option.label;
            formatSelect.appendChild(opt);
        });

        console.log('Dropdown Box options populated');
        initialiseDropdownBox(); // Initialize only after options are populated
    } catch (error) {
        console.error('Error fetching dropdown options:', error);
    }
}

function initialiseDropdownBox() {
    document.querySelectorAll('.custom-select').forEach(select => {
        if (!select.classList.contains('initialised')) {
            new DropdownBox(select);
            select.classList.add('initialised');
        }
    });
}
