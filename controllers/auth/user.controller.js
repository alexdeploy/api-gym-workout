const UserService = require('../../services/auth/user.service');

module.exports = {
    /**
     * @description Create a new user
     * @param {*} req 
     * @param {*} res 
     */
    createUser: async (req, res) => {
        try {
            const user = await UserService.createUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    /**
     * @description Get all users
     * @param {*} req 
     * @param {*} res 
     */
    getUsers: async (req, res) => {
        try {
            const users = await UserService.getUsers(req.query);
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    /**
     * @description Get a user by id
     * @param {*} req 
     * @param {*} res 
     */
    getUser: async (req, res) => {
        try {
            const user = await UserService.getUser(req.params.id);
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    /**
     * @description Update a user
     * @param {*} req 
     * @param {*} res 
     */
    updateUser: async (req, res) => {
        try {
            const user = await UserService.updateUser(req.params.id, req.body);
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    /**
     * @description Delete a user
     * @param {*} req 
     * @param {*} res 
     */
    deleteUser: async (req, res) => {
        try {
            const user = await UserService.deleteUser(req.params.id);
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};