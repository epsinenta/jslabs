const { BluePrintDAO } = require('./BluePrintDAO')
class BluePrintsService {
	static findBluePrints(filters = {}) {
		if (filters.id) {
			return BluePrintDAO.findById(filters.id).toJSON()
		}
		return BluePrintDAO.find(filters).map(blueprint => blueprint.toJSON())
	}

	static addBluePrint(blueprint) {
		return BluePrintDAO.insert(blueprint).toJSON()
	}

	static updateBluePrint(id, updatedData) {
		return BluePrintDAO.update(id, updatedData).toJSON()
	}

	static deleteBluePrint(id) {
		return BluePrintDAO.delete(id).map(blueprint => blueprint.toJSON())
	}
}

module.exports = {
	BluePrintsService,
}
