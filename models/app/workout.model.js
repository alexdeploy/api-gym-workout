const mongoose = require('mongoose');
const appDB = mongoose.connection.useDb('app');

// Definir un esquema para los ejercicios dentro de un workout
const exerciseInWorkoutSchema = new mongoose.Schema({
  exercise: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exercise', // Referencia al ejercicio original
    required: true
  },
  exercises_order: { type: Number, required: true }, // Orden de los ejercicios en el workout 
  sets: { type: Number, required: true }, // Número de sets
  reps: { type: Number, required: true }, // Número de repeticiones
  rir: { // Rango de RIR
    min: { type: Number, required: true },
    max: { type: Number, required: true }
  },
  restTime: { // Tiempo de descanso
    min: { type: Number, required: true },
    max: { type: Number, required: true }
  },
  material: [
    {
      // id: { type: mongoose.Schema.Types.ObjectId, required: true }, // Referencia a material, si existe
      name: { type: String, required: true }, // Nombre del material
      notes: { type: String } // Notas opcionales sobre el material
    }
  ],
  recommendations: String, // Recomendaciones específicas para este ejercicio
  advices: String, // Consejos adicionales
  notes: String // Notas adicionales
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
  exercises: [exerciseInWorkoutSchema], // Array de ejercicios con la nueva estructura
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
