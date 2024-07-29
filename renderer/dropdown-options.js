import DropdownBox from '../components/dropdown-box.js';

export async function populateDropdownOptions() {
    const formatSelect = document.getElementById('formatSelect');
    if (!formatSelect) {
        console.error('Dropdown element not found');
        return;
    }

    try {
        const response = await fetch('properties/log-formats.json');
        const options = await response.json();
        console.log('Received dropdown options:', options);

        options.dropdownOptions.forEach(option => {
            const opt = document.createElement('option');
            opt.value = option.value;
            opt.textContent = option.label;
            formatSelect.appendChild(opt);
        });

        console.log('Dropdown Box options populated');
        initialiseDropdownBox();
    } catch (error) {
        console.error('Error fetching dropdown options:', error);
    }
}

function initialiseDropdownBox() {
    document.querySelectorAll('.custom-select').forEach(select => {
        if (!select.classList.contains('initialised') && select.querySelector('select').options.length > 0) {
            new DropdownBox(select);
            select.classList.add('initialised');
        }
    });
}
