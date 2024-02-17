export default class Select {
    selectClass = 'selected-button';

    constructor(button, index) {
        this.button = document.querySelectorAll(button);
        this.index = index;
    }

    activateSelectButton() {
        const btn = this.button[this.index];

        if (!btn.classList.contains(this.selectClass)) { 
            btn.classList.add(this.selectClass);
            btn.innerHTML += `<span class="btn-chrest">
                                    <i class="fa-solid fa-xmark"></i>
                                </span>`;
        }
        else if (btn.classList.contains(this.selectClass) && btn === this.button[this.index]) {
            const closeButton = btn.querySelector('.btn-chrest');
            
            if (closeButton) {
                closeButton.parentNode.removeChild(closeButton);
            }
            btn.classList.remove(this.selectClass);
        }
    }
}