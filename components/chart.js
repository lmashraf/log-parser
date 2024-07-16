import Tag from '../components/tag.js';
import Tooltip from '../components/tooltip.js';
import { calculateOccurrences, calculatePercentages, getParsedLogs, updateTable, getFilteredLogsLength } from '../renderer/process-data.js';


export const LOG_LEVEL_COLORS = {
    ALERT: '#FFE455',
    ERROR: '#FC1149',
    INFO: '#0ED0FF',
    NOTICE: '#0ED096',
    CRIT: '#495267',
    DEBUG: '#87DA76',
    WARN: '#FCA311',
    DEFAULT: '#D3D3D3'
};

const LOG_LEVEL_ORDER = ['ALERT', 'ERROR', 'INFO', 'NOTICE', 'CRIT', 'DEBUG', 'WARN'];

class Chart {
    constructor(containerId) {
        this.chartContainer = document.getElementById(containerId);
        this.parsedLogs = JSON.parse(localStorage.getItem('parsedLogs'));
        this.occurrences = calculateOccurrences(this.parsedLogs);
        this.percentages = calculatePercentages(this.occurrences, this.parsedLogs.length);
        this.filteredLogsLength = getFilteredLogsLength(); // Initialize with the filtered log length
        this.createBars();
        this.chartContainer.addEventListener('mousemove', this.handleHover.bind(this));

        const tagElements = document.querySelectorAll('.tag-item');
        tagElements.forEach(element => {
            const tagInstance = new Tag(element);
            element.addEventListener('click', (event) => {
                event.stopPropagation();
                tagInstance.toggleTag();
                this.filteredLogsLength = updateTable(); // Update the filtered logs length
                this.updateTooltip();
            });
        });
    }

    createBars() {
        const maxPercentage = Math.max(...Object.values(this.percentages));
        LOG_LEVEL_ORDER.forEach(logLevel => {
            const bar = document.createElement('div');
            bar.className = 'bar';
            bar.dataset.tag = logLevel;

            const barInner = document.createElement('div');
            barInner.className = 'bar-inner';

            const barHeight = (this.percentages[logLevel] / 100) * 100;
            barInner.style.height = `${barHeight > 0 ? barHeight : 2}%`;
            barInner.style.backgroundColor = this.percentages[logLevel] > 0 ? (LOG_LEVEL_COLORS[logLevel] || LOG_LEVEL_COLORS.DEFAULT) : LOG_LEVEL_COLORS.DEFAULT;

            bar.appendChild(barInner);
            this.chartContainer.appendChild(bar);

            bar.addEventListener('click', (event) => {
                event.stopPropagation();
                this.toggleBar(event, bar, logLevel);
            });
        });
    }

    toggleBar(event, barElement, logLevel) {
        const tagElement = document.querySelector(`.tag-item[data-tag="${logLevel.toLowerCase()}"]`);
        if (tagElement) {
            const tagInstance = new Tag(tagElement);
            tagInstance.toggleTag(event);
            this.filteredLogsLength = updateTable(); // Update the filtered logs length
            this.updateTooltip();
        }
    }

    handleHover(event) {
        const bars = this.chartContainer.children;
        const barWidth = bars[0].offsetWidth;

        Array.from(bars).forEach((bar, index) => {
            const barX = bar.getBoundingClientRect().left;
            const barY = bar.getBoundingClientRect().top;

            if (
                event.clientX >= barX &&
                event.clientX <= barX + barWidth &&
                event.clientY >= barY &&
                event.clientY <= barY + bar.offsetHeight
            ) {
                bar.style.opacity = '0.7';

                const logLevel = LOG_LEVEL_ORDER[index];
                const tooltipElement = document.getElementById('logSummary');
                const logData = {
                    logsInFile: this.parsedLogs.length,
                    logsFromSelectedTags: this.filteredLogsLength,
                    tagElement: this.createTagElement(logLevel),
                    occurrences: this.percentages[logLevel] !== undefined ? this.percentages[logLevel] : 0,
                    count: this.occurrences[logLevel] !== undefined ? this.occurrences[logLevel] : 0
                };
                const tooltip = new Tooltip(tooltipElement);
                tooltip.updateTooltip(logData);
            } else {
                bar.style.opacity = '1';
            }
        });
    }

    updateTooltip() {
        const logsFromSelectedTags = document.getElementById('logsFromSelectedTags');
        if (logsFromSelectedTags) {
            logsFromSelectedTags.textContent = this.filteredLogsLength;
        }
    }

    createTagElement(logLevel) {
        const tagItem = document.createElement('div');
        tagItem.className = 'tag-item';
        const tagIcon = document.createElement('img');
        tagIcon.src = `assets/tag-${logLevel.toLowerCase()}.svg`;
        tagIcon.alt = logLevel;
        tagIcon.className = 'tag-icon';
        tagItem.appendChild(tagIcon);
        const tagLabel = document.createElement('span');
        tagLabel.className = 'tag-label';
        tagLabel.textContent = logLevel;
        tagItem.appendChild(tagLabel);
        return tagItem;
    }
}

// Initialize the chart
document.addEventListener('DOMContentLoaded', () => {
    new Chart('chartContainer');
});
