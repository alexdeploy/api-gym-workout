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
    }
};