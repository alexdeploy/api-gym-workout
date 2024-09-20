const mongoose = require('mongoose');
const appDB = mongoose.connection.useDb('app');

const exerciseReferenceSchema = new mongoose.Schema({
  info: mongoose.Schema.Types.ObjectId,
  order: Number,
  sets: Number,
  reps: Number,
  rir: {
    max: Number,
    min: Number
  },
  restTime: {
    max: Number,
    min: Number
  },
  material: {
    type: Array,
    required: false
  },
  recommendations: String,
  advices: String,
  notes: String
});

// Definir el esquema del workout
const workoutSchema = new mongoose.Schema({
  trainerId: {
    type: mongoose.Schema.Types.ObjectId,
    // ref: 'User',
    required: false
  },
  traineeId: {
    type: mongoose.Schema.Types.ObjectId,
    // ref: 'User',
    required: false
  },
  name: { type: String, required: true },
  muscle_groups: [
    {
      _id: mongoose.Schema.Types.ObjectId,
      key: String
    }
  ],
  dates: [Date],
  status: {
    type: String,
    enum: ['pending', 'active', 'completed'],
    default: 'pending'
  },
  exercises: [exerciseReferenceSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Workout = appDB.model('Workout', workoutSchema);

module.exports = Workout;
