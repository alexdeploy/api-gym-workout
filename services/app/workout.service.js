const Workout = require('../../models/app/workout.model');
const Exercise = require('../../models/database/exercise.model');
const Material = require('../../models/database/material.model');
const MuscleGroup = require('../../models/database/muscle-group.model');
const moment = require('moment');

module.exports = {
    /**
     * @description Create a new workout
     * @param {*} workoutData
     * * Works ✓
     */
    createWorkout: async (workoutData) => {
        const workout = new Workout(workoutData);
        return await workout.save();
    },
    /**
     * @description Get all workouts
     * @param {*} query contains all the query parameters for filtering and pagination
     * @returns {Array} workouts of the trainee
     * * Works ✓
     */
    getWorkouts: async (query) => {
        try {
            const { traineeId, page, limit, sortBy, sort, date, search } = query;
    
            // Construir el filtro dinámicamente
            const filter = { traineeId: traineeId };
    
            // Aplicar filtro de búsqueda si se proporciona un valor en search
            if (search) {
                filter.name = { $regex: search, $options: 'i' }; // Búsqueda insensible a mayúsculas/minúsculas
            }
    
            // Filtrar por fecha si se proporciona
            if (date) {
                const startOfDay = moment(date).startOf('day').toISOString();
                const endOfDay = moment(date).endOf('day').toISOString();
                filter.dates = { $gte: startOfDay, $lte: endOfDay };
            }
    
            // Ejecutar la consulta con el filtro, paginación y ordenamiento
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
     * @param {*} workoutId mongoose id of the workout
     * @returns {Object} workout with exercises populated
     * * Works ✓
     */
    getWorkout: async (workoutId) => {
        return await Workout.findById(workoutId)
        .populate({
            path: 'exercises.data',
            model: Exercise,
            populate: [
                {
                    path: 'materials.data',
                    model: Material
                },
                {
                    path: 'muscle_groups.data',
                    model: MuscleGroup
                }
            ]
        });
    },

    /**
     * @description Add an exercise to a workout
     * @param {*} req
     * @param {*} res
     */
    addExercise: async (workoutId, exercise) => {
        try {
            const workout = await Workout.findById(workoutId);
            workout.exercises.push(exercise);
            return await workout.save();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};