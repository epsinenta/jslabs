export default class ButtonComponent {
	constructor(parent, text) {
		this.content = text
		this.parent = parent
	}

	addListeners(listener) {
		document.getElementById('back-button').addEventListener('click', listener)
	}

	getHTML() {
		return `
    <button id="back-button" class="btn-custom btn-primary">
			${this.content}
    </button>`
	}

	render(listener) {
		const html = this.getHTML()
		this.parent.insertAdjacentHTML('beforeend', html)
		this.addListeners(listener)
	}
}
