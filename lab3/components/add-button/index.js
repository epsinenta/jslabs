export class AddButtonComponent {
	constructor(parent) {
		this.parent = parent
	}

	addListeners(listener) {
		document.getElementById('back-button').addEventListener('click', listener)
	}

	getHTML() {
		return `
    <button id="back-button" class="btn-custom btn-primary">
        Добавить
    </button>`
	}

	render(listener) {
		const html = this.getHTML()
		this.parent.insertAdjacentHTML('beforeend', html)
		this.addListeners(listener)
	}
}
