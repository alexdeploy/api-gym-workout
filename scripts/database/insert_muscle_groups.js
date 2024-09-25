const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs').promises;

const MuscleGroup = require('../../models/database/muscle-group.model');

// Crear la app de Express
const app = express();

// Conectar a la base de datos de MongoDB
mongoose.connect('mongodb+srv://alexruedadev:ZEGrG4dIxiWXkZbs@cluster0.ojdte.mongodb.net/database', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

// Función para cargar y guardar los datos del archivo JSON
async function loadData() {
  try {
    // Leer el archivo JSON
    const data = await fs.readFile('./data/muscle-groups.json', 'utf-8');
    const jsonData = JSON.parse(data);

    // Función recursiva para insertar grupos musculares y asignar parentId
    async function insertMuscleGroup(group, parentId = null) {
        console.log('Inserting group:', group.name);
      // Insertar el grupo muscular en la base de datos
      const muscleGroup = new MuscleGroup({
        _key: group._key,
        name: group.name,
        parentId: parentId
      });

      // Guardar el grupo en la base de datos
      const savedGroup = await muscleGroup.save();

      // Recorrer los hijos (si existen) e insertarlos de manera recursiva
      if (group.children && group.children.length > 0) {
        for (const child of group.children) {
          await insertMuscleGroup(child, savedGroup._id);
        }
      }

      return savedGroup;
    }

    // Insertar todos los grupos musculares
    for (const group of jsonData.muscle_groups) {
      await insertMuscleGroup(group);
    }

    console.log('All data has been inserted');
  } catch (error) {
    console.error('Error inserting data:', error);
  }
}

// Llamar a la función para cargar los datos desde el archivo JSON
loadData();

// Crear una API para devolver la anidación completa
app.get('/api/muscle_groups', async (req, res) => {
  try {
    // Consulta optimizada para devolver la estructura anidada
    const muscleGroups = await MuscleGroup.find({ parentId: null }).populate({
      path: 'children',
      populate: {
        path: 'children',
        populate: {
          path: 'children' // Continúa populando si hay más niveles
        }
      }
    }).exec();

    res.json(muscleGroups);
  } catch (error) {
    console.error('Error fetching muscle groups:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Iniciar el servidor en el puerto 3000
const PORT = 9001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
