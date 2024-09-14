const exerciseService = require('../../services/database/exercise.service');

module.exports = {
    /**
     * @description Create a new exercise
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    createExercise: async (req, res, next) => {
        try {
            const exercise = await exerciseService.createExercise(req.body);
            res.status(201).json(exercise);
        } catch (error) {
            next(error);
        }
    },

    /**
     * @description Get all exercises
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    getExercises: async (req, res, next) => {
        try {
            const exercises = await exerciseService.getExercises();
            res.status(200).json(exercises);
        } catch (error) {
            next(error);
        }
    }
}