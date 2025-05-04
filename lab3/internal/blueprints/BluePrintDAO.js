const { BluePrintsRepository } = require('./BluePrintsRepository')

class BluePrintDAO {
	constructor(id, title, elements, src) {
		this.id = id
		this.title = title
		this.elements = elements
		this.src = src
	}

	static _validateId(id) {
		const numberId = Number.parseInt(id)
		if (Number.isNaN(numberId)) {
			throw new Error('Invalid blueprint ID')
		}
	}

	static _validate(blueprint) {
		if (
			!blueprint.id ||
			!blueprint.title ||
			!Array.isArray(blueprint.elements) ||
			!Array.isArray(blueprint.src)
		) {
			throw new Error('Invalid blueprint structure')
		}

		this._validateId(blueprint.id)
	}

	static find(filters = {}) {
		let blueprints = BluePrintsRepository.read()

		if (filters.title) {
			blueprints = blueprints.filter(bp =>
				bp.title.toLowerCase().includes(filters.title.toLowerCase())
			)
		}

		if (filters.id !== undefined) {
			const id = Number(filters.id)
			blueprints = blueprints.filter(bp => bp.id === id)
		}

		return blueprints.map(bp => new this(bp.id, bp.title, bp.elements, bp.src))
	}
	static update(id, updatedData) {
		this._validateId(id)

		const blueprints = BluePrintsRepository.read()
		const index = blueprints.findIndex(bp => bp.id === id)

		if (index === -1) throw new Error('Blueprint not found')

		const updatedBlueprint = { ...blueprints[index], ...updatedData }
		this._validate(updatedBlueprint)

		blueprints[index] = updatedBlueprint
		BluePrintsRepository.write(blueprints)

		return new this(
			updatedBlueprint.id,
			updatedBlueprint.title,
			updatedBlueprint.elements,
			updatedBlueprint.src
		)
	}
	static findById(id) {
		const numberId = Number.parseInt(id)
		this._validateId(id)
		const blueprints = BluePrintsRepository.read()
		const blueprint = blueprints.find(bp => bp.id === numberId)

		if (!blueprint) throw new Error('Blueprint not found')

		return new this(
			blueprint.id,
			blueprint.title,
			blueprint.elements,
			blueprint.src
		)
	}

	static getNextId() {
		const blueprints = BluePrintsRepository.read()
		if (blueprints.length === 0) return 1
		const maxId = Math.max(...blueprints.map(bp => bp.id))
		return maxId + 1
	}
	
	static insert(blueprint) {
		if (!blueprint.title || !Array.isArray(blueprint.elements) || !Array.isArray(blueprint.src)) {
			throw new Error('Invalid blueprint structure')
		}
	
		const blueprints = BluePrintsRepository.read()
		const newBlueprint = {
			id: this.getNextId(),  
			title: blueprint.title,
			elements: blueprint.elements,
			src: blueprint.src
		}
	
		BluePrintsRepository.write([...blueprints, newBlueprint])
	
		return new this(
			newBlueprint.id,
			newBlueprint.title,
			newBlueprint.elements,
			newBlueprint.src
		)
	}

	static delete(id) {
		this._validateId(id)

		const blueprints = BluePrintsRepository.read()
		const filteredBlueprints = blueprints.filter(bp => bp.id !== id)

		BluePrintsRepository.write(filteredBlueprints)

		return filteredBlueprints.map(
			bp => new this(bp.id, bp.title, bp.elements, bp.src)
		)
	}

	toJSON() {
		return {
			id: this.id,
			title: this.title,
			elements: this.elements,
			src: this.src,
		}
	}
}

module.exports = {
	BluePrintDAO,
}