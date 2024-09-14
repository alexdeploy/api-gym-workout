const express = require('express');
const router = express.Router();

const muscleGroupController = require('../../controllers/database/muscle-group.controller');

router.post('/', muscleGroupController.createMuscleGroup);
router.get('/', muscleGroupController.getMuscleGroups);

module.exports = router;