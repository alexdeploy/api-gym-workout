const Workout = require('../../models/app/workout.model');
const mongoose = require('mongoose');
const moment = require('moment');

module.exports = {
    /**
     * @description Create a new workout
     * @param {*} workoutData 
     */
    createWorkout: async (workoutData) => {
        const workout = new Workout(workoutData);
        return await workout.save();
    },
    /**
     * @description Get all workouts
     */
    getWorkouts: async (query) => {
        try {
            const { traineeId, page, limit, sortBy, sort, date } = query;
    
            const filter = {
                traineeId: traineeId
            };
            
            if (date) {
                const startOfDay = moment(date).startOf('day').toISOString();
                const endOfDay = moment(date).endOf('day').toISOString();
                filter.dates = { $gte: startOfDay, $lte: endOfDay };
            }
    
            const workouts = await Workout.find(filter)
                .sort({ [sortBy]: sort })
                .skip((page - 1) * limit)
                .limit(limit);
    
            return workouts;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    /**
     * @description Get a workout by id
     * @param {*} id 
     */
    getWorkout: async (id) => {
        return await Workout.findById(id)
        .populate({
            path: 'exercises.exercise', // Popula la referencia a "Exercise" en los ejercicios del workout
            model: 'Exercise',          // Especificar el modelo que pertenece a la otra base de datos
            options: { db: mongoose.connection.useDb('database') }, // Usar la base de datos correcta
            select: 'name key',         // Campos a devolver del ejercicio (puedes ajustar según tus necesidades)
        });
    },

    /**
     * @description Get today's workouts
     */
    getTodayWorkouts: async () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        return await Workout.find({
            createdAt: {
                $gte: today,
                $lt: tomorrow
            }
        });
    }
};