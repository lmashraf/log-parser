class Tag {
    constructor(element) {
        this.element = element;
        this.label = this.element.querySelector('.tag-label');
    }

    // Function to toggle the tag's enabled/disabled state
    toggleTag() {
        const tagName = this.element.dataset.tag;
        if (this.element.classList.contains('disabled')) {
            this.element.classList.remove('disabled');
            this.element.querySelector('img').src = `assets/tag-${tagName}.svg`;
            console.log(`Enabled tag: ${tagName}`);
        } else {
            this.element.classList.add('disabled');
            this.element.querySelector('img').src = `assets/tag-disabled.svg`;
            console.log(`Disabled tag: ${tagName}`);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('Tag script loaded and running');
    const tagElements = document.querySelectorAll('.tag-item');

    tagElements.forEach(element => {
        const tagInstance = new Tag(element);
        element.addEventListener('click', () => tagInstance.toggleTag());
    });
});

export default Tag;
