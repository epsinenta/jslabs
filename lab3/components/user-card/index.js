import { ButtonGroupComponent } from '../../components/button-group/index.js'
import { CaruselComponent } from '../../components/carusel/index.js'
export class UserCardComponent {
	constructor(parent) {
		this.parent = parent
		this.buttonGroup = new ButtonGroupComponent(parent)
		this.carousel = new CaruselComponent(parent)
	}

	getHTML(data) {
		return `
            <div class="container d-flex justify-content-center align-items-center vh-100">
                <div class="card shadow-lg p-3 mb-5 bg-white rounded" style="width: 400px;" data-id="${
									data.id
								}">
                    <div class="card-body text-center">
                        ${this.carousel.getHTML(data)}
                        <div class="mt-3">
                            ${this.buttonGroup.getHTML(data)}
                        </div>
                    </div>
                </div>
            </div>

        `
	}

	render(data, listener, removeCardListener) {
		const html = this.getHTML(data)
		this.parent.insertAdjacentHTML('beforeend', html)
		this.buttonGroup.addListeners(data, listener, removeCardListener)
	}
}
