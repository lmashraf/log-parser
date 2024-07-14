class Tooltip {
    constructor(element) {
        this.element = element;
        this.logsInFile = this.element.querySelector('#logsInFile');
        this.logsFromSelectedTags = this.element.querySelector('#logsFromSelectedTags');
        this.occurrences = this.element.querySelector('#logOccurrences');
        this.count = this.element.querySelector('#logCount');
        this.occurrencesContainer = this.element.querySelector('#logOccurrencesContainer');
        this.countContainer = this.element.querySelector('#logCountContainer');
        this.iconContainer = this.element.querySelector('#logIconContainer'); // Container for SVG
        this.defaultMessage = this.element.querySelector('#defaultMessage'); // Default message element
        this.hoverDetails = this.element.querySelector('#hoverDetails'); // Hover details section
    }

    updateTooltip(logData) {
        this.logsInFile.textContent = logData.logsInFile;
        this.logsFromSelectedTags.textContent = logData.logsFromSelectedTags;

        if (logData.tagElement) {
            this.iconContainer.innerHTML = ''; // Clear existing content
            this.iconContainer.appendChild(logData.tagElement); // Insert the cloned tag element
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
    if (tooltipElement) {
        const tooltip = new Tooltip(tooltipElement);

        const tagItems = document.querySelectorAll('.tag-item');
        tagItems.forEach(tagItem => {
            tagItem.addEventListener('mouseenter', (event) => {
                const clonedTag = tagItem.cloneNode(true);
                clonedTag.classList.remove('disabled');
                clonedTag.style.width = ''; // Reset width
                clonedTag.style.height = ''; // Reset height
                const logData = {
                    logsInFile: 100000,
                    logsFromSelectedTags: 15000,
                    tagElement: clonedTag,
                    occurrences: Math.random() * 100, // TODO: Replace with actual
                    count: Math.floor(Math.random() * 100) // TODO: Replace with actual
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
