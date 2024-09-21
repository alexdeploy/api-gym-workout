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
  notes: String,
  createdAt: { type: Date, default: Date.now }
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
  description: String,
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

// Middleware to update 'updatedAt' on every save
workoutSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Autocalcular la cantidad de ejercicios
workoutSchema.virtual('exercisesCount').get(function() {
  return this.exercises.length;
});

const Workout = appDB.model('Workout', workoutSchema);

module.exports = Workout;
