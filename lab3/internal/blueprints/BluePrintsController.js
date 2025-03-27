const { BluePrintsService } = require('./BluePrintsService')

class BluePrintsController {
	static findBluePrints(req, res) {
		try {
			res.send(BluePrintsService.findBluePrints())
		} catch (err) {
			res.status(400).send({ status: 'Bad Request', message: err.message })
		}
	}

	static findBluePrintById(req, res) {
		try {
			const id = Number.parseInt(req.params.id)
			res.send(BluePrintsService.findBluePrints(id))
		} catch (err) {
			res.status(400).send({ status: 'Bad Request', message: err.message })
		}
	}

	static addBluePrint(req, res) {
		try {
			res.send(BluePrintsService.addBluePrint(req.body))
		} catch (err) {
			res.status(400).send({ status: 'Bad Request', message: err.message })
		}
	}

	static deleteBluePrint(req, res) {
		try {
			const id = Number.parseInt(req.params.id)
			res.send(BluePrintsService.deleteBluePrint(id))
		} catch (err) {
			res.status(400).send({ status: 'Bad Request', message: err.message })
		}
	}
}

module.exports = {
	BluePrintsController,
}
