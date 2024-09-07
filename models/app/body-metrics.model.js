const mongoose = require('mongoose');
const appDB = mongoose.connection.useDb('app');

const bodyMetricsSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true
    },
    traineeId: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'User' 
    },
    savedBy: {
      type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    weight: Number,
    bodyFatPercentage: Number,
    muscleMass: Number,
    measurements: { // Mediciones corporales
      chest: Number,
      waist: Number,
      hips: Number,
      arms: Number,
      legs: Number
    },
    date: Date, // Fecha en la que se registraron los datos
    createdAt: Date
  });

const BodyMetrics = appDB.model('BodyMetrics', bodyMetricsSchema);

module.exports = BodyMetrics;