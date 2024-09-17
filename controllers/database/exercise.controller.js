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
    },

    /**
     * @description Get a single exercise
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    getExercise: async (req, res, next) => {
        try {
            const exercise = await exerciseService.getExercise(req.params.id);
            res.status(200).json(exercise);
        } catch (error) {
            next(error);
        }
    },

    /**
     * @description Update an exercise
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    updateExercise: async (req, res, next) => {
        try {
            const exercise = await exerciseService.updateExercise(req.params.id, req.body);
            res.status(200).json(exercise);
        } catch (error) {
            next(error);
        }
    },
    
    /**
     * @description Delete an exercise
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    deleteExercise: async (req, res, next) => {
        try {
            await exerciseService.deleteExercise(req.params.id);
            res.status(204).end();
        } catch (error) {
            next(error);
        }
    }
}