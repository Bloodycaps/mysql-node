const express = require("express");
const router = express.Router();

const pool = require("../database");

router.get("/anadir", (req, res) => {
  res.render("enlaces/anadir");
});

router.post("/anadir", async (req, res) => {
  const { titulo, url, descripcion } = req.body;
  const nuevoEnlace = {
    titulo,
    url,
    descripcion
  };
  await pool.query(" INSERT INTO enlaces set ?", [nuevoEnlace]);
  req.flash('bien', 'Enlace añadido correctamente');
  res.redirect("/enlaces");
});

router.get("/", async (req, res) => {
  const enlaces = await pool.query("SELECT * FROM enlaces");
  res.render("enlaces/lista", { enlaces });
});

router.get("/eliminar/:id", async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM enlaces WHERE id = ?", [id]);
  req.flash('eliminar', 'Enlace eliminado satisfactoriamente');
  res.redirect("/enlaces");
});

router.get("/editar/:id", async (req, res) => {
    const { id } = req.params;
    const enlaces = await pool.query('SELECT * FROM enlaces WHERE id = ?', [id]);
    res.render('enlaces/editar', {enlace: enlaces[0]});
});

router.post('/editar/:id', async (req, res) => {
    const { id } = req.params;
    const { titulo, url, descripcion } = req.body;
    const nuevoEnlace = {
        titulo,
        url,
        descripcion
    };
    await pool.query('UPDATE enlaces set ? WHERE id = ?', [nuevoEnlace, id]);
    req.flash('editar', 'Enlace editado satisfactoriamente');
    res.redirect('/enlaces');
});

module.exports = router;
