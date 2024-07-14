class Tag {
    constructor(element) {
        this.element = element;
        this.label = this.element.querySelector('.tag-label');
        this.color = this.element.querySelector('.tag-color');
    }

    updateTag(label, color) {
        this.label.textContent = label;
        this.color.style.backgroundColor = color;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const tagElements = document.querySelectorAll('.tag-item');
    tagElements.forEach(element => {
        const Tag = new Tag(element);
        // Example usage: Update tag item
        Tag.updateTag('NOTICE', '#00FF00');
    });
});

export default Tag;
