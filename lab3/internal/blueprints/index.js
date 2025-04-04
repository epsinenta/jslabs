const express = require('express')
const { BluePrintsController } = require('./BluePrintsController')

const router = express.Router()

router.get('/', BluePrintsController.findBluePrints)
router.get('/:id', BluePrintsController.findBluePrintById)
router.post('/', BluePrintsController.addBluePrint)
router.delete('/:id', BluePrintsController.deleteBluePrint)
router.put('/:id', BluePrintsController.updateBluePrint)

module.exports = router
