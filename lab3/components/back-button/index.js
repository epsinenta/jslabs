export class BackButtonComponent {
	constructor(parent) {
		this.parent = parent
	}

	addListeners(listener) {
		document.getElementById('back-button').addEventListener('click', listener)
	}

	getHTML() {
		return `
    <button id="back-button" class="btn-custom btn-primary">
        <i class="bi bi-arrow-left"></i>
        Назад
    </button>`
	}

	render(listener) {
		const html = this.getHTML()
		this.parent.insertAdjacentHTML('beforeend', html)
		this.addListeners(listener)
	}
}
