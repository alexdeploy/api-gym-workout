const muscleGroupController = require('../../services/database/muscle-group.service');

module.exports = {
    /**
     * @description Create a new muscle group
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    createMuscleGroup: async (req, res, next) => {
        try {
            const muscleGroup = await muscleGroupController.createMuscleGroup(req.body);
            res.status(201).json(muscleGroup);
        } catch (error) {
            next(error);
        }
    },

    /**
     * @description Get all muscle groups
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    getMuscleGroups: async (req, res, next) => {
        try {
            const muscleGroups = await muscleGroupController.getMuscleGroups();
            res.status(200).json(muscleGroups);
        } catch (error) {
            next(error);
        }
    }
}