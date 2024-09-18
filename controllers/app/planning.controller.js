const PlanningService = require('../../services/app/planning.service');

module.exports = {
    /**
     * @description Create a new planning
     * @param {*} req 
     * @param {*} res 
     */
    createPlanning: async (req, res) => {
        try {
            const planning = await PlanningService.createPlanning(req.body);
            res.status(201).json(planning);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    /**
     * @description Get all plannings
     * @param {*} req 
     * @param {*} res 
     */
    getPlannings: async (req, res) => {
        try {
            const { role, userId } = req.user;
            console.log(userId);
            const plannings = await PlanningService.getPlannings(userId);
            res.status(200).json(plannings);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    /**
     * @description Get a planning by id
     * @param {*} req 
     * @param {*} res 
     */
    getPlanning: async (req, res) => {
        try {
            const { populated } = req.query;

            if (populated) {
                const planning = await PlanningService.getPopulatedPlanning(req.params.id);
                return res.status(200).json(planning);
            }
            const planning = await PlanningService.getPlanning(req.params.id);
            res.status(200).json(planning);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};