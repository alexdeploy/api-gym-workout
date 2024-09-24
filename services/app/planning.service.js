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
     * @description Get all plannings by user
     * @param {*} userId 
     * @param {*} role 
     * TODO: Implement pagination and query filters
     */
    getPlannings: async (userId) => {
        return await Planning.find({ userId: userId });
    },

    /**
     * @description Get a planning by id
     * @param {*} id is the mongo_id of the planning
     */
    getPlanning: async (id) => {
        return await Planning.findById(id)
    },

    /**
     * @description Get a populated planning by id
     * @param {*} id is the mongo_id of the planning
     */
    getPopulatedPlanning: async (id) => {
        return await Planning.findById(id)
        .populate({
            path: 'workouts.data',
            model: Workout,
/*             populate: {
                path: 'exercises.exercise',
                model: Exercise
            } */
        });
    },

    /**
     * @description Add a workout to a planning
     * @param {*} planningId is the mongo_id of the planning
     * @param {*} workout is a workoutReferenceSchema defined in planning.model.js
     */
    addWorkout: async (planningId, workout) => {
        const planning = await Planning.findById(planningId);
        planning.workouts.push(workout);
        return await planning.save();
    }
};