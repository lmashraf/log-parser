import { updateTable } from '../renderer/process-data.js';
import { LOG_LEVEL_COLORS } from './chart.js';


class Tag {
    constructor(element) {
        this.element = element;
        this.label = this.element.querySelector('.tag-label');
    }

    // Function to toggle the tag's enabled/disabled state and update the associated bar
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
                barElement.querySelector('.bar-inner').style.backgroundColor = LOG_LEVEL_COLORS[tagName] || LOG_LEVEL_COLORS.DEFAULT;
            }
            console.log(`Enabled tag: ${tagName}`);
        } else {
            this.element.classList.add('disabled');
            this.element.querySelector('img').src = `assets/tag-disabled.svg`;
            if (barElement) {
                barElement.querySelector('.bar-inner').style.backgroundColor = LOG_LEVEL_COLORS.DEFAULT;
            }
            console.log(`Disabled tag: ${tagName}`);
        }

        // Update table based on toggled state
        updateTable();
        const filteredLogsLength = updateTable();
        this.updateTooltip(filteredLogsLength);

        if (event) {
            event.handled = true;
        }
    }

    updateTooltip(filteredLogsLength) {
        const logsFromSelectedTags = document.getElementById('logsFromSelectedTags');
        if (logsFromSelectedTags) {
            logsFromSelectedTags.textContent = filteredLogsLength;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('Tag script loaded and running');
    const tagElements = document.querySelectorAll('.tag-item');

    tagElements.forEach(element => {
        const tagInstance = new Tag(element);
        element.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent the event from bubbling up to the bar
            event.handled = true; // Mark the event as handled
            tagInstance.toggleTag(event);
        });
    });
});

export default Tag;
