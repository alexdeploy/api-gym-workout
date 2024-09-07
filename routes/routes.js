const express = require('express');
const router = express.Router();

const workoutRoutes = require('./app/workout.routes');

router.use('/workouts', workoutRoutes);

module.exports = router;