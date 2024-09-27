const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs').promises;

const Material = require('../../models/database/material.model');

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
    const data = await fs.readFile('./data/materials.json', 'utf-8');
    const jsonData = JSON.parse(data);

    // Función recursiva para insertar grupos musculares y asignar parentId
    async function insertData(group, parentId = null) {
        console.log('Inserting group:', group.name);
      // Insertar el grupo muscular en la base de datos
      const material = new Material({
        _key: group._key,
        name: group.name,
        parentId: parentId
      });

      // Guardar el grupo en la base de datos
      const savedGroup = await material.save();

      // Recorrer los hijos (si existen) e insertarlos de manera recursiva
      if (group.children && group.children.length > 0) {
        for (const child of group.children) {
          await insertData(child, savedGroup._id);
        }
      }

      return savedGroup;
    }

    // Insertar todos los grupos musculares
    for (const group of jsonData.materials) {
      await insertData(group);
    }

    console.log('All data has been inserted');
  } catch (error) {
    console.error('Error inserting data:', error);
  }
}

// Llamar a la función para cargar los datos desde el archivo JSON
loadData();

// Iniciar el servidor en el puerto 3000
const PORT = 9001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
