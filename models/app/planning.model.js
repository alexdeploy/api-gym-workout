const mongoose = require('mongoose');
const appDB = mongoose.connection.useDb('app');

const User = require('../auth/user.model');

const workoutReferenceSchema = new mongoose.Schema({
    data: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Workout',
        required: true 
    },
    date: {
        type: Date,
        required: false,
        default: null
    },
    status: {
        type: String,
        enum: ['pending', 'active', 'completed', 'cancelled', 'failed'],
        default: 'pending'
    }
});

const planningSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
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
    date_start: {
        type: Date,
        required: false,
        default: null
    },
    date_end: {
        type: Date,
        required: false,
        default: null
    },
    status: {
        type: String,
        required: false,
        enum: ['pending', 'active', 'completed', 'cancelled', 'failed'],
        default: 'pending'
    },
    workouts: [workoutReferenceSchema],
    createdAt: Date,
    updatedAt: Date
});

// Middleware to update 'updatedAt' on every save
planningSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Planning = appDB.model('Planning', planningSchema);

module.exports = Planning;