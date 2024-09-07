const express = require('express');
const router = express.Router();

const workoutController = require('../../controllers/app/workout.controller');

router.post('/', workoutController.createWorkout);
router.get('/', workoutController.getWorkouts);

module.exports = router;