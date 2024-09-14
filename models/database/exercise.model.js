const mongoose = require('mongoose');
const databaseDB = mongoose.connection.useDb('database');

const exerciseSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true
    },
    key: String,
    name: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Exercise = databaseDB.model('Exercise', exerciseSchema);

module.exports = Exercise;