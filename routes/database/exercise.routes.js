const express = require('express');
const router = express.Router();

const exerciseController = require('../../controllers/database/exercise.controller');

router.post('/', exerciseController.createExercise);
router.get('/', exerciseController.getExercises);

module.exports = router;