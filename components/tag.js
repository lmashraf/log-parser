import { LOG_LEVEL_COLORS } from '../components/chart.js';
import { updateTable } from '../renderer/process-data.js';

class Tag {
    constructor(element) {
        this.element = element;
        this.label = this.element.querySelector('.tag-label');
    }

    toggleTag(event) {
        if (event && event.handled) {
            return;
        }

        const tagName = this.element.dataset.tag.toUpperCase();
        const barElement = document.querySelector(`.bar[data-tag="${tagName}"]`);

        if (this.element.classList.contains('disabled')) {
            this.element.classList.remove('disabled');
            this.element.querySelector('img').src = `assets/tag-${tagName.toLowerCase()}.svg`;
            if (barElement) {
                this.element.style.backgroundColor = LOG_LEVEL_COLORS.DEFAULT;
                barElement.querySelector('.bar-inner').style.backgroundColor = LOG_LEVEL_COLORS[tagName] || LOG_LEVEL_COLORS.DEFAULT;
            }
            console.log(`Enabled tag: ${tagName}`);
        } else {
            this.element.classList.add('disabled');
            this.element.querySelector('img').src = `assets/tag-disabled.svg`;
            if (barElement) {
                barElement.querySelector('.bar-inner').style.backgroundColor =  LOG_LEVEL_COLORS.DISABLED;
                this.element.style.backgroundColor =  LOG_LEVEL_COLORS.DISABLED;
            }
            console.log(`Disabled tag: ${tagName}`);
        }

        // Update table based on toggled state
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
        element.addEventListener('click', (event) => {
            tagInstance.toggleTag(event);
        });
    });
});

export default Tag;
