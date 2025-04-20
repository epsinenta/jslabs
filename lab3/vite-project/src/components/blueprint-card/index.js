import { ButtonGroupComponent } from '../button-group/index.js'
import { CaruselComponent } from '../carusel/index.js'

export class BlueprintCardComponent {
	constructor(parent) {
		this.parent = parent
		this.buttonGroup = new ButtonGroupComponent(parent)
		this.carousel = new CaruselComponent(parent)
	}

	getHTML(data) {
		return `
		<style>
  .button-group-container {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .btn-group {
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 16px;
  }

  .btn-group .btn {
    flex: 1;
    text-align: center;
  }
</style>
    <div class="blueprint-card" data-id="${data.id}">
        <div class="card-body-custom">
            <h5 class="card-title-custom">${data.title}</h5>
            <p class="card-text-custom">
                Элементов: ${data.elements.length}
            </p>
            ${this.carousel.getHTML(data)}
            <div class="button-group-container">
                ${this.buttonGroup.getHTML(data)}
            </div>
        </div>
    </div>`
	}

	render(data, analyzeListener, removeListener) {
		const html = this.getHTML(data)
		this.parent.insertAdjacentHTML('beforeend', html)
		this.buttonGroup.addListeners(data, analyzeListener, removeListener)
	}
}
