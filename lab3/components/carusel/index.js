export class CaruselComponent {
	constructor(parent) {
		this.parent = parent
	}

	getHTML(data) {
		return `
            <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
              <div class="carousel-inner">
                ${data.src
									.map(
										(imageSrc, index) => `
                        <div class="carousel-item ${
													index === 0 ? 'active' : ''
												}">
                            <img src="${imageSrc}" class="d-block w-100" alt="...">
                        </div>
                    `
									)
									.join('')}
            </div>
              <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls"  data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Предыдущий</span>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls"  data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Следующий</span>
              </button>
            </div>
        `
	}

	render(data) {
		const html = this.getHTML(data)
		this.parent.insertAdjacentHTML('beforeend', html)
	}
}
