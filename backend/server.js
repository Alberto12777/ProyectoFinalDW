const express = require('express');
const bodyParser = require('body-parser');
const autos = require('./autos');
const cors = require('cors');
const puerto = 3001;
const app = express();
app.use(bodyParser.json());
app.use(cors());


app.listen(puerto, () => {
    console.log('Servicio iniciado');
});

app.post('/cars', async (req, res) => { // create
    const { marca, modelo, descripcion, valor, colorDisponible } = req.body;
    try {
        const data = await autos.create({
            marca, modelo, descripcion, valor, colorDisponible
        });
        res.send(data);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.get('/cars', async (req, res) => { // read
    try {
        const data = await autos.findAll();
        res.send(data);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.put('/cars/:id', async (req, res) => { // update
    const { marca, modelo, descripcion, valor, colorDisponible } = req.body;
    const { id } = req.params;
    try {
        const data = await autos.update({
            marca, modelo, descripcion, valor, colorDisponible
        }, {
            where: { id }
        });
        res.send(data);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.delete('/cars/:id', async (req, res) => { // delete
    const { id } = req.params;
    try {
        const data = await autos.destroy({
            where: { id }
        });
        res.send(data);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});