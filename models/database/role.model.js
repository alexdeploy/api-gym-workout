const mongoose = require('mongoose');
const databaseDB = mongoose.connection.useDb('database');

const roleSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true
    },
    key: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    permissions: {
        type: Object,
        required: false
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Middleware to update 'updatedAt' on every save
roleSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Role = databaseDB.model('Role', roleSchema);

module.exports = Role;