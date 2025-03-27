const { BluePrintDAO } = require('./BluePrintDAO')

class BluePrintsService {
	static findBluePrints(id) {
		if (id !== undefined) {
			return BluePrintDAO.findById(id).toJSON()
		}

		return BluePrintDAO.find().map(blueprint => blueprint.toJSON())
	}

	static addBluePrint(blueprint) {
		return BluePrintDAO.insert(blueprint).toJSON()
	}

	static deleteBluePrint(id) {
		return BluePrintDAO.delete(id).map(blueprint => blueprint.toJSON())
	}
}

module.exports = {
	BluePrintsService,
}
