class CustomDropdown {
    constructor(element) {
        this.element = element;
        this.selectElement = this.element.querySelector('select');
        this.selected = document.createElement('div');
        this.selected.className = 'select-selected';
        this.selected.innerHTML = this.selectElement.options[this.selectElement.selectedIndex].innerHTML;
        this.items = document.createElement('div');
        this.items.className = 'select-items select-hide';
        this.init();
    }

    init() {
        this.createItems();
        this.addEventListeners();
        this.element.appendChild(this.selected);
        this.element.appendChild(this.items);
    }

    createItems() {
        Array.from(this.selectElement.options).forEach(option => {
            const item = document.createElement('div');
            item.innerHTML = option.innerHTML;
            item.addEventListener('click', () => this.onItemClick(item, option));
            this.items.appendChild(item);
        });
    }

    onItemClick(item, option) {
        this.selectElement.selectedIndex = Array.from(this.selectElement.options).indexOf(option);
        this.selected.innerHTML = item.innerHTML;
        this.closeAllSelect();
        this.items.classList.add('select-hide');
        this.selected.classList.remove('select-arrow-active');
    }

    addEventListeners() {
        this.selected.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleItems();
        });
        document.addEventListener('click', () => this.closeAllSelect());
    }

    toggleItems() {
        this.items.classList.toggle('select-hide');
        this.items.style.display = this.items.classList.contains('select-hide') ? 'none' : 'block';
        this.selected.classList.toggle('select-arrow-active');
        this.highlightSelectedItem();
    }

    highlightSelectedItem() {
        Array.from(this.items.children).forEach(item => {
            item.classList.remove('selected');
            if (item.innerHTML === this.selected.innerHTML) {
                item.classList.add('selected');
            }
        });
    }

    closeAllSelect() {
        const items = document.querySelectorAll('.select-items');
        const selected = document.querySelectorAll('.select-selected');
        items.forEach(item => {
            item.classList.add('select-hide');
            item.style.display = 'none';
        });
        selected.forEach(sel => sel.classList.remove('select-arrow-active'));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.custom-select').forEach(select => {
        if (!select.classList.contains('initialized')) {
            new CustomDropdown(select);
            select.classList.add('initialized');
        }
    });
});

export default CustomDropdown;

