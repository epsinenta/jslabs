const { DBConnector } = require('../../modules/DBConnector')

class BluePrintsRepository {
	static db = new DBConnector('blueprints.json')

	static read() {
		const file = this.db.readFile()

		return JSON.parse(file)
	}

	static write(json) {
		this.db.writeFile(JSON.stringify(json))
	}
}

module.exports = {
	BluePrintsRepository,
}