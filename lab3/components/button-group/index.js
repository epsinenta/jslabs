export class ButtonGroupComponent {
	constructor(parent) {
		this.parent = parent
	}

	getHTML(data) {
		return `
      <div class="btn-group mt-3" role="group" aria-label="Действия с чертежом">
				<button type="button" 
                class="btn" 
                id="remove-${data.id}"
                style="background-color: #3b4248; 
                       border: 1px solid #00ace2;
                       color: #00ace2;
                       transition: all 0.3s ease;">
            <i class="bi bi-trash"></i> Удалить
        </button>
        <button type="button" 
                class="btn" 
                id="analyze-${data.id}"
                style="background-color: #00ace2; 
                       border: 1px solid #3b4248;
                       color: #ffffff;
                       transition: all 0.3s ease;">
            <i class="bi bi-calculator"></i> Анализ
        </button>
        
      </div>
    `
	}

	addListeners(data, analyzeListener, removeListener) {
		document
			.getElementById(`analyze-${data.id}`)
			.addEventListener('click', analyzeListener)
		document
			.getElementById(`remove-${data.id}`)
			.addEventListener('click', removeListener)
	}

	render(data, analyzeListener, removeListener) {
		const html = this.getHTML(data)
		this.parent.insertAdjacentHTML('beforeend', html)
		this.addListeners(data, analyzeListener, removeListener)
	}
}
