class LegendItem {
    constructor(element) {
        this.element = element;
        this.label = this.element.querySelector('.legend-label');
        this.color = this.element.querySelector('.legend-color');
    }

    updateLegend(label, color) {
        this.label.textContent = label;
        this.color.style.backgroundColor = color;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const legendElements = document.querySelectorAll('.legend-item');
    legendElements.forEach(element => {
        const legendItem = new LegendItem(element);
        // Example usage: Update legend item
        legendItem.updateLegend('NOTICE', '#00FF00');
    });
});

export default LegendItem;
