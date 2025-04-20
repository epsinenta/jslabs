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
               border: 1px solid #ffffff;
               color: #ffffff;
               transition: all 0.3s ease;
               cursor: pointer;"
                onmouseover="this.style.color='#00ace2'; this.style.borderColor='#00ace2';"
                onmouseout="this.style.backgroundColor='#3b4248'; this.style.color='#ffffff'; this.style.borderColor='#ffffff';">
            <i class="bi bi-trash"></i> Удалить
        </button>

        <button type="button" 
                class="btn" 
                id="analyze-${data.id}"
                style="background-color: #00ace2; 
                      border: 1px solid #3b4248;
                      color: #ffffff;
                      transition: all 0.3s ease;
                      cursor: pointer;"
                onmouseover="this.style.backgroundColor='#4ac0f2'; this.style.color='#ffffff';"
                onmouseout="this.style.backgroundColor='#00ace2'; this.style.color='#ffffff';">
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
