///////////////////////////////
// User Roles
///////////////////////////////

/**
 * @module roles.config
 * @description Defines the user roles
 */

module.exports = {
    admin: {
        id: 0,
        name: 'admin',
        key: 'admin',
        description: 'Administrator'
    },
    user: {
        id: 1,
        name: 'user',
        key: 'user',
        description: 'User'
    },
    guest: {
        id: 2,
        name: 'guest',
        key: 'guest',
        description: 'Guest'
    },
    trainee:
    {
        id: 3,
        name: 'trainee',
        key: 'trainee',
        description: 'Trainee user'
    },
    trainer:
    {
        id: 4,
        name: 'trainer',
        key: 'trainer',
        description: 'Trainer user'
    },
    all: {
        id: 999,
        name: 'all',
        key: 'all',
        description: 'All Roles'
    }
}