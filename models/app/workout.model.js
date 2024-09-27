const mongoose = require('mongoose');
const appDB = mongoose.connection.useDb('app');

const User = require('../auth/user.model');

const Exercise = require('../database/exercise.model');

const logSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true
  },
  set: Number,
  date: Date,
  weight: Number,
  reps: Number,
  rir: {
    min: Number,
    max: Number
  },
  time: Number,
  rest: Number,
  extra: {
    type: Boolean,
    default: false
  }
});

const exerciseReferenceSchema = new mongoose.Schema({
  data: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Exercise,
    required: true
  },
  sets: Number,
  reps: Number,
  rest: {
    max: Number,
    min: Number
  },
  rir: {
    max: Number,
    min: Number
  },
  notes: String,
  logs: [logSchema],
  status: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending'
  },
  completedAt: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now }
});

exerciseReferenceSchema.pre('save', function(next) {
  if(this.logs.length == this.sets) {
    this.status = 'completed';
    this.completedAt = Date.now();
  }
  next();
});

// Definir el esquema del workout
const workoutSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    auto: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
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
  exercises: [exerciseReferenceSchema],
  date: {
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
