const express = require('express');
const router = express.Router();
const { authenticateRole } = require('../middleware/auth.middleware');

////////////////////////
// app routes
////////////////////////

// files
const workoutRoutes = require('./app/workout.routes');
const planningRoutes = require('./app/planning.routes');

// routes
router.use('/workouts', authenticateRole, workoutRoutes);
router.use('/plannings', authenticateRole, planningRoutes);

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