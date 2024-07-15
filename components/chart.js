import Tooltip from '../components/tooltip.js';
import Tag from '../components/tag.js';
import { calculateOccurrences, calculatePercentages, getParsedLogs } from '../renderer/process-data.js';

// Define the order of log levels to match the order of tags
const LOG_LEVEL_ORDER = ['ALERT', 'ERROR', 'INFO', 'NOTICE', 'CRIT', 'DEBUG', 'WARN'];

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

function createBars(chartContainer, occurrences, percentages) {
    const maxPercentage = Math.max(...Object.values(percentages));

    LOG_LEVEL_ORDER.forEach(logLevel => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.dataset.tag = logLevel; // Add data attribute for the log level

        const barInner = document.createElement('div');
        barInner.className = 'bar-inner';

        const barHeight = (percentages[logLevel] / 100) * 100;
        barInner.style.height = `${barHeight > 0 ? barHeight : 2}%`;
        barInner.style.backgroundColor = percentages[logLevel] > 0 ? (LOG_LEVEL_COLORS[logLevel] || LOG_LEVEL_COLORS.DEFAULT) : LOG_LEVEL_COLORS.DEFAULT;

        bar.appendChild(barInner);
        chartContainer.appendChild(bar);

        // Add click event listener to toggle bar state
        bar.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent the event from bubbling up to the tag
            toggleBar(bar, logLevel);
        });
    });
}

function toggleBar(barElement, logLevel) {
    const tagElement = document.querySelector(`.tag-item[data-tag="${logLevel.toLowerCase()}"]`);
    if (tagElement) {
        const tagInstance = new Tag(tagElement);
        tagInstance.toggleTag();
    }
}

// Function to update the table based on the current state of the tags
export function updateTable() {
    const logTableBody = document.getElementById('logTableBody');
    logTableBody.innerHTML = ''; // Clear any existing rows

    const parsedLogs = getParsedLogs();
    const disabledTags = Array.from(document.querySelectorAll('.tag-item.disabled')).map(tag => tag.dataset.tag.toUpperCase());

    const filteredLogs = parsedLogs.filter(log => !disabledTags.includes(log.logLevel.toUpperCase()));

    filteredLogs.forEach(log => {
        const row = document.createElement('tr');

        // Create and append Timestamp cell
        const timestampCell = document.createElement('td');
        timestampCell.textContent = log.timestamp;
        row.appendChild(timestampCell);

        // Create and append Log Level cell with SVG icon
        const logLevelCell = document.createElement('td');
        const logLevelIcon = document.createElement('img');
        logLevelIcon.src = `assets/tag-${log.logLevel.toLowerCase()}.svg`;
        logLevelIcon.alt = log.logLevel;
        logLevelIcon.className = 'tag-icon';
        logLevelCell.appendChild(logLevelIcon);
        logLevelCell.appendChild(document.createTextNode(log.logLevel.toUpperCase()));
        row.appendChild(logLevelCell);

        // Create and append Message cell
        const messageCell = document.createElement('td');
        messageCell.textContent = log.message;
        row.appendChild(messageCell);

        // Append the row to the table body
        logTableBody.appendChild(row);
    });

    console.log("Updated the table with filtered logs:", filteredLogs.length);
}

function handleHover(event, occurrences, percentages, parsedLogs) {
    const chartContainer = document.getElementById('chartContainer');
    const bars = chartContainer.children;
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
            // Highlight the bar
            bar.style.opacity = '0.7';

            // Update and show tooltip
            const logLevel = LOG_LEVEL_ORDER[index];
            const tooltipElement = document.getElementById('logSummary');
            const logData = {
                logsInFile: parsedLogs.length,
                logsFromSelectedTags: parsedLogs.length,
                tagElement: createTagElement(logLevel),
                occurrences: percentages[logLevel] !== undefined ? percentages[logLevel] : 0,
                count: occurrences[logLevel] !== undefined ? occurrences[logLevel] : 0
            };
            const tooltip = new Tooltip(tooltipElement);
            tooltip.updateTooltip(logData);
        } else {
            bar.style.opacity = '1';
        }
    });
}

function createTagElement(logLevel) {
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

document.addEventListener('DOMContentLoaded', () => {
    const chartContainer = document.getElementById('chartContainer');
    const parsedLogs = JSON.parse(localStorage.getItem('parsedLogs'));
    const occurrences = calculateOccurrences(parsedLogs);
    const percentages = calculatePercentages(occurrences, parsedLogs.length);

    createBars(chartContainer, occurrences, percentages);

    chartContainer.addEventListener('mousemove', (event) => {
        handleHover(event, occurrences, percentages, parsedLogs);
    });
});