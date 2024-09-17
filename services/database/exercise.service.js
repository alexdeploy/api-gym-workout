const Exercise = require('../../models/database/exercise.model');

module.exports = {
    /**
     * @description Create a new exercise
     * @param {*} exerciseData
     * @returns {Promise}
     * @throws {Error}
     */
    createExercise: async (exerciseData) => {
        const exercise = new Exercise(exerciseData);
        return await exercise.save();
    },

    /**
     * @description Get all exercises
     * @returns {Promise}
     * @throws {Error}
     */
    getExercises: async () => {
        return await Exercise.find();
    },

    /**
     * @description Get a single exercise
     * @param {*} id
     * @returns {Promise}
     * @throws {Error}
     */
    getExercise: async (id) => {
        return await Exercise.findById(id);
    },

    /**
     * @description Delete an exercise
     * @param {*} id
     * @returns {Promise}
     * @throws {Error}
     */
    updateExercise: async (id, exerciseData) => {
        return await Exercise.findByIdAndUpdate(id, exerciseData, { new: true });
    },

    /**
     * @description Delete an exercise
     * @param {*} id
     * @returns {Promise}
     * @throws {Error}
     */
    deleteExercise: async (id) => {
        return await Exercise.findByIdAndDelete(id);
    }
};