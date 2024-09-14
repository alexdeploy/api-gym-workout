const Workout = require('../../models/app/workout.model');
const mongoose = require('mongoose');
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
    getWorkouts: async () => {
        return await Workout.find();
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
    }
};