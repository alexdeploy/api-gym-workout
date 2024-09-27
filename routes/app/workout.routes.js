const express = require('express');
const router = express.Router();

const workoutController = require('../../controllers/app/workout.controller');

router.post('/', workoutController.createWorkout);
router.get('/', workoutController.getWorkouts);
router.get('/:id', workoutController.getWorkout);
router.get('/:id/exercises/:exerciseId', workoutController.getWorkoutExercise);

// Add exercise to workout
router.post('/:id/exercises', workoutController.addExercise);

// Add log to exercise
router.post('/:id/exercises/:exerciseId/logs', workoutController.addLogToExercise);

// Update workout status
router.patch('/:id/status', workoutController.updateWorkoutStatus);

module.exports = router;