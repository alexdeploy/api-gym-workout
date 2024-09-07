const mongoose = require('mongoose');
const appDB = mongoose.connection.useDb('app');

const dietSchema = new mongoose.Schema({
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
    meals: [
      {
        name: String,
        calories: Number,
        macros: {
          protein: Number,
          carbs: Number,
          fats: Number
        },
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

const Diet = appDB.model('Diet', dietSchema);

module.exports = Diet;
  