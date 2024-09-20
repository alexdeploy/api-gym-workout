const express = require('express');
const router = express.Router();

const workoutController = require('../../controllers/app/workout.controller');

router.post('/', workoutController.createWorkout);
router.get('/', workoutController.getWorkouts);
router.get('/:id', workoutController.getWorkout);
router.get('/:id/exercises/:exerciseId', workoutController.getWorkoutExercise);

module.exports = router;