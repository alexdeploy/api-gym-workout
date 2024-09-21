const Workout = require('../../models/app/workout.model');
const Exercise = require('../../models/database/exercise.model');
const moment = require('moment');

module.exports = {
    /**
     * @description Create a new workout
     * @param {*} workoutData
     * * Works ✓
     */
    createWorkout: async (workoutData) => {
        const workout = new Workout(workoutData);
        return await workout.save();
    },
    /**
     * @description Get all workouts
     * @param {*} query contains all the query parameters for filtering and pagination
     * @returns {Array} workouts of the trainee
     * * Works ✓
     */
    getWorkouts: async (query) => {
        try {
            const { traineeId, page, limit, sortBy, sort, date } = query;
    
            const filter = {
                traineeId: traineeId
            };
            
            if (date) {
                const startOfDay = moment(date).startOf('day').toISOString();
                const endOfDay = moment(date).endOf('day').toISOString();
                filter.dates = { $gte: startOfDay, $lte: endOfDay };
            }
    
            const workouts = await Workout.find(filter)
                .sort({ [sortBy]: sort })
                .skip((page - 1) * limit)
                .limit(limit);
    
            return workouts;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    /**
     * @description Get a workout by id
     * @param {*} workoutId mongoose id of the workout
     * @returns {Object} workout with exercises populated
     * * Works ✓
     */
    getWorkout: async (workoutId) => {
        return await Workout.findById(workoutId)
        .populate({
            path: 'exercises.info',
            model: Exercise,
        });
    }
};