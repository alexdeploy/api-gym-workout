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
            const { page, size, sortBy, sort, date } = req.query;

            const options = {
                page: parseInt(page, 10) || 1,
                limit: parseInt(size, 10) || 10,
                sortBy: sortBy || 'createdAt',
                sort: sort || 'desc',
                date: date || '',
            };
            const workouts = await workoutService.getWorkouts(options);
            res.status(200).json(workouts);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    /**
     * @description Get a workout by id
     * @param {*} req 
     * @param {*} res 
     */
    getWorkout: async (req, res) => {
        try {
            const workout = await workoutService.getWorkout(req.params.id);
            // get exercises info
            res.status(200).json(workout);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};