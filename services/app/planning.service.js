const Planning = require('../../models/app/planning.model');
const Workout = require('../../models/app/workout.model');
const Exercise = require('../../models/database/exercise.model');

module.exports = {
    /**
     * @description Create a new planning
     * @param {*} planningData 
     */
    createPlanning: async (planningData) => {
        const planning = new Planning(planningData);
        return await planning.save();
    },
    /**
     * @description Get all plannings
     */
    getPlannings: async () => {
        return await Planning.find();
    },

    /**
     * @description Get all plannings by user
     * @param {*} userId 
     * @param {*} role 
     * @returns 
     */
    getPlannings: async (userId) => {
        return await Planning.find({ userId: userId });
    },

    /**
     * @description Get a planning by id
     * @param {*} id 
     */
    getPlanning: async (id) => {
        return await Planning.findById(id)
    },

    /**
     * @description Get a populated planning by id
     * @param {*} id 
     */
    getPopulatedPlanning: async (id) => {
        return await Planning.findById(id)
        .populate({
            path: 'workouts.workout',
            model: Workout,
            populate: {
                path: 'exercises.exercise',
                model: Exercise
            }
        });
    },

    /**
     * @description Add a workout to a planning
     * @param {*} planningId 
     * @param {*} workoutId 
     */
    addWorkout: async (planningId, workoutId) => {
        const planning = await Planning.findById(planningId);
        planning.workouts.push(workoutId);
        return await planning.save();
    }
};