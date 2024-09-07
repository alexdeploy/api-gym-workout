const Workout = require('../../models/app/workout.model');

module.exports = {
    /**
     * @description Create a new workout
     * @param {*} workoutData 
     */
    createWorkout: async (workoutData) => {
        const workout = new Workout(workoutData);
        return await workout.save();
    },
    /**
     * @description Get all workouts
     */
    getWorkouts: async () => {
        const workouts = await Workout.find();
        return await workouts;
    },
};