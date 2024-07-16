import { LOG_LEVEL_COLORS } from '../components/chart.js';
import { updateTable } from '../renderer/process-data.js';

class Tag {
    constructor(element) {
        this.element = element;
        this.label = this.element.querySelector('.tag-label');
        this.img = this.element.querySelector('img');
        this.tagName = this.element.dataset.tag.toUpperCase();
        this.barElement = document.querySelector(`.bar[data-tag="${this.tagName}"]`);
    }

    enableTag() {
        this.element.classList.remove('disabled');
        this.img.src = `assets/tag-${this.tagName.toLowerCase()}.svg`;
        this.element.style.backgroundColor = LOG_LEVEL_COLORS.DEFAULT;
        if (this.barElement) {
            this.barElement.querySelector('.bar-inner').style.backgroundColor = LOG_LEVEL_COLORS[this.tagName] || LOG_LEVEL_COLORS.DEFAULT;
        }
        console.log(`Enabled tag: ${this.tagName}`);
    }

    disableTag() {
        this.element.classList.add('disabled');
        this.img.src = 'assets/tag-disabled.svg';
        this.element.style.backgroundColor = LOG_LEVEL_COLORS.DISABLED;
        if (this.barElement) {
            this.barElement.querySelector('.bar-inner').style.backgroundColor = LOG_LEVEL_COLORS.DISABLED;
        }
        console.log(`Disabled tag: ${this.tagName}`);
    }

    toggleTag(event) {
        if (event && event.handled) {
            return;
        }

        (this.element.classList.contains('disabled')) ? this.enableTag(): this.disableTag();

        updateTable();

        if (event) {
            event.handled = true;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const tagElements = document.querySelectorAll('.tag-item');

    tagElements.forEach(element => {
        const tagInstance = new Tag(element);
        element.addEventListener('click', tagInstance.toggleTag.bind(tagInstance));
    });
});

export default Tag;
