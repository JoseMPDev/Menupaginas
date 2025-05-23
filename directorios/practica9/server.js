require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/formulario';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Usuario = mongoose.model('Usuario', {
  nombre: String,
  email: String
});

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// API
app.get('/api/usuarios', async (req, res) => {
  const usuarios = await Usuario.find();
  res.json(usuarios);
});

app.post('/api/usuarios', async (req, res) => {
  const nuevo = new Usuario(req.body);
  await nuevo.save();
  res.json(nuevo);
});

app.put('/api/usuarios/:id', async (req, res) => {
  await Usuario.findByIdAndUpdate(req.params.id, req.body);
  res.json({ mensaje: 'Actualizado' });
});

app.delete('/api/usuarios/:id', async (req, res) => {
  await Usuario.findByIdAndDelete(req.params.id);
  res.json({ mensaje: 'Eliminado' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
