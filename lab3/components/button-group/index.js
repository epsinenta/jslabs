export class ButtonGroupComponent {
	constructor(parent) {
		this.parent = parent
	}

	getHTML(data) {
		return `
            <div class="btn-group" role="group" aria-label="Basic mixed styles example">
              <button type="button" class="btn btn-danger" id="click-danger-${data.id}">✗</button>
              <button type="button" class="btn btn-success" id="click-success-${data.id}">✓</button>
            </div>
        `
	}

	addListeners(data, listener, removeCardListener) {
		document
			.getElementById(`click-success-${data.id}`)
			.addEventListener('click', listener)
		document
			.getElementById(`click-danger-${data.id}`)
			.addEventListener('click', removeCardListener)
	}

	render(data, listener) {
		const html = this.getHTML(data)
		this.parent.insertAdjacentHTML('beforeend', html)
		this.addListeners(data, listener)
	}
}
