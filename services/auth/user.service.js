const User = require('../../models/auth/user.model');
const Role = require('../../models/database/role.model');

module.exports = {
    /**
     * @description Create a new user
     * @param {*} userData
     * @returns {Promise}
     * @throws {Error}
     */
    createUser: async (userData) => {
        const user = new User(userData);
        return await user.save();
    },

    /**
     * @description Get all users
     * @returns {Promise}
     * @throws {Error}
     */
    getUsers: async (query) => {
        const { page, limit, sortBy, sort, search } = query;

        const users = await User.find({ username: { $regex: search, $options: 'i' } })
            .sort({ [sortBy]: sort })
            .skip((page - 1) * limit)
            .limit(limit);

        return users;
    },

    /**
     * @description Get a single user
     * @param {*} id
     * @returns {Promise}
     * @throws {Error}
     */
    getUser: async (id) => {
        return await User.findById(id)
            .populate({
                path: 'profiles.role',
                model: Role,
/*                 populate: {
                    path: 'exercises.exercise',
                    model: Exercise
                } */
            });
    },

    /**
     * @description Update a user
     * @param {*} id
     * @param {*} userData
     * @returns {Promise}
     * @throws {Error}
     */
    updateUser: async (id, userData) => {
        return await User.findByIdAndUpdate(id, userData, { new: true });
    },

    /**
     * @description Delete a user
     * @param {*} id
     * @returns {Promise}
     * @throws {Error}
     */
    deleteUser: async (id) => {
        return await User.findByIdAndDelete(id);
    },
};