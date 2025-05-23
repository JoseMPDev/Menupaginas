const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000; // Render usa una variable de entorno

const baseDir = path.join(__dirname, 'directorios');

app.use('/directorios', express.static(baseDir));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/directorios', (req, res) => {
  fs.readdir(baseDir, { withFileTypes: true }, (err, files) => {
    if (err) return res.status(500).json({ error: 'No se pudo leer el directorio.' });

    const directoriosConIndex = files
      .filter(dirent => dirent.isDirectory())
      .filter(dirent => fs.existsSync(path.join(baseDir, dirent.name, 'index.html')))
      .map(dirent => ({
        nombre: dirent.name,
        enlace: `/directorios/${dirent.name}/index.html`
      }));

    res.json(directoriosConIndex);
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
