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
  res.redirect("/enlaces");
});

router.get("/", async (req, res) => {
  const enlaces = await pool.query("SELECT * FROM enlaces");
  res.render("enlaces/lista", { enlaces });
});

router.get("/eliminar/:id", async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM enlaces WHERE id = ?', [id]);
    res.redirect('/enlaces');
});

module.exports = router;
