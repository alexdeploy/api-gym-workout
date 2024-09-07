const mongoose = require('mongoose');
const appDB = mongoose.connection.useDb('app');

const progressNotesSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true
    },
    trainerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Relación con el entrenador
    traineeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Relación con el entrenado
    notes: String,
    createdAt: Date,
    updatedAt: Date
  });

const ProgressNotes = appDB.model('ProgressNotes', progressNotesSchema);

module.exports = ProgressNotes;