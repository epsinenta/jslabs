class BluePrintUrls {
	constructor() {
		this.baseUrl = 'http://localhost:8000'
	}

	getBluePrints() {
		return `${this.baseUrl}/blueprints`
	}

	getBluePrintById(id) {
		return `${this.baseUrl}/blueprints/${id}`
	}

	createBluePrint() {
		return `${this.baseUrl}/blueprints`
	}

	removeBluePrintById() {
		return `${this.baseUrl}/blueprints/${id}`
	}

	updateBluePrintById() {
		return `${this.baseUrl}/blueprints/${id}`
	}
}

export const blueprintUrls = new BluePrintUrls()
