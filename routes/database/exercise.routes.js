const express = require('express');
const router = express.Router();

const exerciseController = require('../../controllers/database/exercise.controller');

router.post('/', exerciseController.createExercise);
router.get('/', exerciseController.getExercises);
router.get('/:id', exerciseController.getExercise);
router.put('/:id', exerciseController.updateExercise);
router.delete('/:id', exerciseController.deleteExercise);

module.exports = router;