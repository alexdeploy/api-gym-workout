const mongoose = require('mongoose');
const databaseDB = mongoose.connection.useDb('database');

const MaterialSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true
    },
    _key: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false,
        default: null
    },
    image: {
        type: String,
        required: false,
        default: null
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Middleware to update the "updatedAt" property on save
MaterialSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const Material = databaseDB.model('Material', MaterialSchema);

module.exports = Material;