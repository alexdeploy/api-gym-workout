const mongoose = require('mongoose');
const appDB = mongoose.connection.useDb('app');

const routineSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true
    },
    trainerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    traineeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    startDate: Date,
    endDate: Date,
    name: { type: String, required: true },
    workouts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Workout',
            date: Date
        }
    ],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    status: {
        type: String,
         enum: ['pending', 'active', 'completed']
    }
  });

const Routine = appDB.model('Routine', routineSchema);

module.exports = Routine;