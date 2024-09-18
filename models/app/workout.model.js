const mongoose = require('mongoose');
const appDB = mongoose.connection.useDb('app');

const exerciseReferenceSchema = new mongoose.Schema({
  exercise: mongoose.Schema.Types.ObjectId,
  exercises_order: Number,
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
    type: String,
    enum: ['body', 'dumbbell', 'barbell', 'machine', 'cable', 'band', 'ball']
  },
  recommendations: String,
  advices: String,
  notes: String
});

// Definir el esquema del workout
const workoutSchema = new mongoose.Schema({
  trainerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  traineeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  name: { type: String, required: true },
  muscle_groups: [
    {
      _id: mongoose.Schema.Types.ObjectId, // Referencia a grupos musculares
      key: String // Clave del grupo muscular
    }
  ],
  exercises: [exerciseReferenceSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  startDate: Date,
  endDate: Date,
  status: {
    type: String,
    enum: ['pending', 'active', 'completed'],
    default: 'pending'
  }
});

const Workout = appDB.model('Workout', workoutSchema);

module.exports = Workout;
