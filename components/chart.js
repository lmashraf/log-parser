import Tooltip from '../components/tooltip.js';
import { calculateOccurrences, calculatePercentages } from '../renderer/process-data.js';

const LOG_LEVEL_COLORS = {
    ALERT: '#FFE455',
    ERROR: '#FC1149',
    INFO: '#0ED0FF',
    NOTICE: '#0ED096',
    CRIT: '#495267',
    DEBUG: '#87DA76',
    WARN: '#FCA311',
    DEFAULT: '#D0D0D0'
};

// Define the order of log levels to match the order of tags
const LOG_LEVEL_ORDER = ['ALERT', 'ERROR', 'INFO', 'NOTICE', 'CRIT', 'DEBUG', 'WARN'];

function createBars(chartContainer, occurrences, percentages) {
    LOG_LEVEL_ORDER.forEach(logLevel => {
        const bar = document.createElement('div');
        bar.className = 'bar';

        const barInner = document.createElement('div');
        barInner.className = 'bar-inner';

        const barHeight = (percentages[logLevel] / 100) * 100;
        barInner.style.height = `${barHeight > 0 ? barHeight : 2}%`;
        barInner.style.backgroundColor = percentages[logLevel] > 0 ? (LOG_LEVEL_COLORS[logLevel] || LOG_LEVEL_COLORS.DEFAULT) : LOG_LEVEL_COLORS.DEFAULT;

        bar.appendChild(barInner);
        chartContainer.appendChild(bar);
    });
}

function handleHover(event, occurrences, percentages, parsedLogs) {
    const bars = document.getElementsByClassName('bar');
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
            bar.style.opacity = '0.7'

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