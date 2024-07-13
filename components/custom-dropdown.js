document.addEventListener('DOMContentLoaded', function() {
    const customSelects = document.querySelectorAll('.custom-select');

    customSelects.forEach(select => {
        const selectElement = select.querySelector('select');
        const selected = document.createElement('div');
        selected.className = 'select-selected';
        selected.innerHTML = selectElement.options[selectElement.selectedIndex].innerHTML;
        select.appendChild(selected);

        const items = document.createElement('div');
        items.className = 'select-items select-hide';

        Array.from(selectElement.options).forEach(option => {
            const item = document.createElement('div');
            item.innerHTML = option.innerHTML;
            item.addEventListener('click', function() {
                selectElement.selectedIndex = Array.from(selectElement.options).indexOf(option);
                selected.innerHTML = this.innerHTML;
                closeAllSelect();
                this.parentNode.classList.add('select-hide');
                selected.classList.remove('select-arrow-active');
            });
            items.appendChild(item);
        });

        select.appendChild(items);

        selected.addEventListener('click', function(e) {
            e.stopPropagation();
            closeAllSelect();
            items.classList.toggle('select-hide');
            items.style.display = items.classList.contains('select-hide') ? 'none' : 'block';
            selected.classList.toggle('select-arrow-active');

            // Highlight the currently selected item
            Array.from(items.children).forEach(item => {
                item.classList.remove('selected');
                if (item.innerHTML === selected.innerHTML) {
                    item.classList.add('selected');
                }
            });
        });
    });

    function closeAllSelect(el) {
        const items = document.querySelectorAll('.select-items');
        const selected = document.querySelectorAll('.select-selected');
        items.forEach(item => {
            item.classList.add('select-hide');
            item.style.display = 'none';
        });
        selected.forEach(sel => sel.classList.remove('select-arrow-active'));
    }

    document.addEventListener('click', closeAllSelect);
});
