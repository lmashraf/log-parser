class Tooltip {
    constructor(element) {
        this.element = element;
        this.logsInFile = this.element.querySelector('#logsInFile');
        this.logsFromSelectedTags = this.element.querySelector('#logsFromSelectedTags');
        this.label = this.element.querySelector('#logLabel');
        this.occurrences = this.element.querySelector('#logOccurrences');
        this.count = this.element.querySelector('#logCount');
        this.labelContainer = this.element.querySelector('#logLabelContainer');
        this.occurrencesContainer = this.element.querySelector('#logOccurrencesContainer');
        this.countContainer = this.element.querySelector('#logCountContainer');
    }

    updateTooltip(logData) {
        this.logsInFile.textContent = logData.logsInFile;
        this.logsFromSelectedTags.textContent = logData.logsFromSelectedTags;

        if (logData.label) {
            this.label.textContent = logData.label;
            this.labelContainer.style.display = 'block';
        } else {
            this.labelContainer.style.display = 'none';
        }

        if (logData.occurrences !== undefined && logData.count !== undefined) {
            this.occurrences.textContent = `${logData.occurrences}%`;
            this.count.textContent = logData.count;
            this.occurrencesContainer.style.display = 'block';
            this.countContainer.style.display = 'block';
        } else {
            this.occurrencesContainer.style.display = 'none';
            this.countContainer.style.display = 'none';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const tooltipElement = document.getElementById('logSummary');
    if (tooltipElement) {
        const tooltip = new Tooltip(tooltipElement);

        // Example usage: Update tooltip on hover/click event
        document.getElementById('logChart').addEventListener('mouseover', (event) => {
            const logData = {
                logsInFile: 100000,
                logsFromSelectedTags: 15000,
                label: 'NOTICE',
                occurrences: 75.5,
                count: 100
            };
            tooltip.updateTooltip(logData);
        });
    }
});

export default Tooltip;
