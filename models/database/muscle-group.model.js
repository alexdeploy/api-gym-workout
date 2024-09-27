const mongoose = require('mongoose');
const databaseDB = mongoose.connection.useDb('database');

const muscleGroupSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true
    },
    _key: { type: String, required: true },
    name: { type: String, required: true },
    parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'MuscleGroup', default: null },
    children: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MuscleGroup' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const MuscleGroup = databaseDB.model('MuscleGroup', muscleGroupSchema);

module.exports = MuscleGroup;