document.addEventListener('DOMContentLoaded', function () {
    const customSelects = document.querySelectorAll('.custom-select');
    customSelects.forEach(select => {
        const selected = document.createElement('div');
        selected.className = 'select-selected';
        selected.innerHTML = select.querySelector('select').options[select.querySelector('select').selectedIndex].innerHTML;
        select.appendChild(selected);

        const items = document.createElement('div');
        items.className = 'select-items select-hide';
        Array.from(select.querySelector('select').options).forEach(option => {
            const item = document.createElement('div');
            item.innerHTML = option.innerHTML;
            item.addEventListener('click', function () {
                const selectBox = select.querySelector('select');
                const selectSelected = select.querySelector('.select-selected');
                for (let i = 0; i < selectBox.options.length; i++) {
                    if (selectBox.options[i].innerHTML === this.innerHTML) {
                        selectBox.selectedIndex = i;
                        selectSelected.innerHTML = this.innerHTML;
                        const sameAsSelected = items.querySelectorAll('.same-as-selected');
                        sameAsSelected.forEach(el => el.removeAttribute('class'));
                        this.setAttribute('class', 'same-as-selected');
                        break;
                    }
                }
                closeAllSelect();
                this.parentNode.classList.toggle('select-hide');
                this.parentNode.previousSibling.classList.toggle('select-arrow-active');
            });
            items.appendChild(item);
        });
        select.appendChild(items);

        selected.addEventListener('click', function (e) {
            e.stopPropagation();
            closeAllSelect(this);
            this.nextSibling.classList.toggle('select-hide');
            this.classList.toggle('select-arrow-active');
        });
    });

    function closeAllSelect(el) {
        const items = document.querySelectorAll('.select-items');
        const selected = document.querySelectorAll('.select-selected');
        items.forEach((item, i) => {
            if (selected[i] !== el) {
                item.classList.add('select-hide');
                selected[i].classList.remove('select-arrow-active');
            }
        });
    }

    document.addEventListener('click', closeAllSelect);
});
