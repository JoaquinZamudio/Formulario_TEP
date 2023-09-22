const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(express.static('public')); // Para servir archivos estáticos desde la carpeta 'public'

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/guardarDatos', (req, res) => {
    const data = req.body;
    try {
        fs.writeFileSync('datos.json', JSON.stringify(data, null, 2));
        res.json({ message: 'Datos guardados con éxito' });
        
    } catch (error) {
        console.error('Error al guardar los datos:', error);
        res.status(500).json({ message: 'Error al guardar los datos' });
    }
});

app.listen(port, () => {
    console.log(`Servidor Node.js escuchando en el puerto ${port}`);
});
