const express = require('express');
const router = express.Router();

const planningController = require('../../controllers/app/planning.controller');

router.post('/', planningController.createPlanning);
router.get('/', planningController.getPlannings);
router.get('/:id', planningController.getPlanning);

module.exports = router;