const mongoose = require('mongoose');
const appDB = mongoose.connection.useDb('app');

const workoutSchema = new mongoose.Schema({
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
    exercises: [
      {
        name: String,
        sets: Number,
        reps: Number,
        restTime: Number, // Descanso entre sets en segundos
        notes: String
      }
    ],
    createdAt: Date,
    updatedAt: Date,
    startDate: Date,
    endDate: Date,
    status: {
        type: String,
         enum: ['pending', 'active', 'completed']
    }
  });

const Workout = appDB.model('Workout', workoutSchema);

module.exports = Workout;