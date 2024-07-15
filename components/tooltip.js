class Tooltip {
    constructor(element) {
        this.element = element;
        // Log File Summary
        this.logsInFile = this.element.querySelector('#logsInFile');
        this.logsFromSelectedTags = this.element.querySelector('#logsFromSelectedTags');
        // Selected Tag Summary
        this.occurrences = this.element.querySelector('#logOccurrences');
        this.count = this.element.querySelector('#logCount');
        this.occurrencesContainer = this.element.querySelector('#logOccurrencesContainer');
        this.countContainer = this.element.querySelector('#logCountContainer');
        this.iconContainer = this.element.querySelector('#logIconContainer');
        this.defaultMessage = this.element.querySelector('#defaultMessage');
        // Optional Tip
        this.hoverDetails = this.element.querySelector('#hoverDetails');
    }

    updateTooltip(logData) {
        this.logsInFile.textContent = logData.logsInFile;
        this.logsFromSelectedTags.textContent = logData.logsFromSelectedTags;

        if (logData.tagElement) {
            this.iconContainer.innerHTML = '';
            this.iconContainer.appendChild(logData.tagElement);
            this.iconContainer.style.display = 'block';
        } else {
            this.iconContainer.style.display = 'none';
        }

        if (logData.occurrences !== undefined && logData.count !== undefined) {
            this.occurrences.textContent = `${logData.occurrences.toFixed(2)}%`;
            this.count.textContent = logData.count;
            this.occurrencesContainer.style.display = 'block';
            this.countContainer.style.display = 'block';
        } else {
            this.occurrencesContainer.style.display = 'none';
            this.countContainer.style.display = 'none';
        }

        // Show hover details and hide default message
        this.hoverDetails.style.display = 'block';
        if (this.defaultMessage) {
            this.defaultMessage.style.display = 'none';
        }
    }

    hideTooltip() {
        this.iconContainer.style.display = 'none';
        this.occurrencesContainer.style.display = 'none';
        this.countContainer.style.display = 'none';

        // Hide hover details and show default message
        this.hoverDetails.style.display = 'none';
        if (this.defaultMessage) {
            this.defaultMessage.style.display = 'block';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const tooltipElement = document.getElementById('logSummary');
    const parsedLogs = JSON.parse(localStorage.getItem('parsedLogs'));
    const occurrences = JSON.parse(localStorage.getItem('occurrences'));
    const percentages = JSON.parse(localStorage.getItem('percentages'));

    if (tooltipElement && parsedLogs) {
        const tooltip = new Tooltip(tooltipElement);

        const tagItems = document.querySelectorAll('.tag-item');
        tagItems.forEach(tagItem => {
            tagItem.addEventListener('mouseenter', () => {
                const logLevel = tagItem.dataset.tag.toUpperCase();
                const logData = {
                    logsInFile: parsedLogs.length,
                    logsFromSelectedTags: parsedLogs.length,
                    tagElement: tagItem.cloneNode(true),
                    occurrences: percentages[logLevel] !== undefined ? percentages[logLevel] : 0,
                    count: occurrences[logLevel] !== undefined ? occurrences[logLevel] : 0
                };
                tooltip.updateTooltip(logData);
            });

            tagItem.addEventListener('mouseleave', () => {
                tooltip.hideTooltip();
            });
        });
    }
});

export default Tooltip;
