const MuscleGroup = require('../../models/database/muscle-group.model');

module.exports = {
    /**
     * @description Create a new muscle group
     * @param {*} muscleGroupData
     * @returns {Promise}
     * @throws {Error}
     * 
     */
    createMuscleGroup: async (muscleGroupData) => {
        const muscleGroup = new MuscleGroup(muscleGroupData);
        return await muscleGroup.save();
    },

    /**
     * @description Get all muscle groups
     * @returns {Promise}
     * @throws {Error}
     */
    getMuscleGroups: async () => {
        return await MuscleGroup.find({ parentId: null })
    },
};