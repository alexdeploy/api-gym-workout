const workoutService = require('../../services/app/workout.service');

module.exports = {
    /**
     * @description Create a new workout
     * @param {*} req 
     * @param {*} res 
     */
    createWorkout: async (req, res) => {
        try {
            const workout = await workoutService.createWorkout(req.body);
            res.status(201).json(workout);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    /**
     * @description Get all workouts
     * @param {*} req 
     * @param {*} res 
     */
    getWorkouts: async (req, res) => {
        try {
            const workouts = await workoutService.getWorkouts();
            res.status(200).json(workouts);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};