const mongoose = require('mongoose');
const appDB = mongoose.connection.useDb('app');

const workoutReferenceSchema = new mongoose.Schema({
    workout: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Workout',
        required: true 
    },
    order: { 
        type: Number,   
        required: true 
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
        // ref: 'User' // TODO: Add User or Profile model
    },
    title: String,
    description: String,
    date_start: Date,
    date_end: Date,
    location: String,
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