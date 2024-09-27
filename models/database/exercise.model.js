const mongoose = require('mongoose');
const databaseDB = mongoose.connection.useDb('database');

const MuscleGroup = require('./muscle-group.model');
const Material = require('./material.model');

const MuscleGroupReferenceSchema = new mongoose.Schema({
    data: {
        type: mongoose.Schema.Types.ObjectId,
        ref: MuscleGroup,
        required: true
    },
});

const MaterialReferenceSchema = new mongoose.Schema({
    data: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Material,
        required: true
    },
});

const exerciseSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true
    },
    _key: String,
    name: String,
    description: String,
    image: String,
    muscle_groups: [MuscleGroupReferenceSchema],
    materials: [MaterialReferenceSchema],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Exercise = databaseDB.model('Exercise', exerciseSchema);

module.exports = Exercise;