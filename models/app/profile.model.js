const mongoose = require('mongoose');
const appDB = mongoose.connection.useDb('app');

const profileSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    age: Number,
    weight: Number,
    height: Number,
    gender: { type: String, enum: ['male', 'female', 'other'] },
    goals: [String], // Lista de objetivos del usuario
    medicalConditions: [String], // Condiciones médicas relevantes
    createdAt: Date,
    updatedAt: Date
  });

const Profile = appDB.model('Profile', profileSchema);

module.exports = Profile;