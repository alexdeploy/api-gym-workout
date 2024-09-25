const workoutService = require('../../services/app/workout.service');

module.exports = {
    /**
     * @description Create a new workout
     * @param {*} req 
     * @param {*} res 
     */
    createWorkout: async (req, res) => {
        try {
            const userId = req.user._id;

            const workout = await workoutService.createWorkout({ ...req.body, userId });
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
            const { page, limit, sortBy, sort, date, search } = req.query;
    
            // El valor predeterminado de search debe ser una cadena vacía
            const query = {
                traineeId: req.user.userId,
                page: parseInt(page, 10) || 1,
                limit: parseInt(limit, 10) || 10,
                sortBy: sortBy || 'createdAt',
                sort: sort || 'desc',
                date: date || null,
                search: search || ''  // Cambiamos $exists a una cadena vacía
            };
    
            const workouts = await workoutService.getWorkouts(query);
    
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
    },

    /**
     * @description Get workout exercise
     * @param {*} req
     * @param {*} res
     */
    getWorkoutExercise: async (req, res) => {
        try {
            const workout = await workoutService.getWorkout(req.params.id);
            const exercise = workout.exercises.id(req.params.exerciseId);
            res.status(200).json(exercise);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    /**
     * @description Add exercise to workout
     * @param {*} req 
     * @param {*} res 
     */
    addExercise: async (req, res) => {
        try {
            console.log('Adding exercise to workout:', req.body);
            const workout = await workoutService.addExercise(req.params.id, req.body);
            res.status(200).json(workout);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};