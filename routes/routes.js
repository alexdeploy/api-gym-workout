const express = require('express');
const router = express.Router();

const workoutRoutes = require('./app/workout.routes');

router.use('/workouts', workoutRoutes);

////////////////////////
// database routes
////////////////////////

// files
const muscleGroupRoutes = require('./database/muscle-group.routes');
const exerciseRoutes = require('./database/exercise.routes');

// routes
router.use('/database/muscle-groups', muscleGroupRoutes);
router.use('/database/exercises', exerciseRoutes);

module.exports = router;