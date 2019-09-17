const express = require('express');
const router = express.Router();

const pool = require('../database');


router.get('/anadir', (req, res) => {
    res.render('enlaces/anadir');
});

router.post('/anadir', async (req, res) =>{
    const { titulo, url, descripcion } = req.body;
    const nuevoEnlace = {
        titulo,
        url,
        descripcion
    };
    await pool.query(' INSERT INTO enlaces set ?', [nuevoEnlace]);
    res.send('recibido')
});

module.exports = router;