const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/registro", (req, res) => {
  res.render("aut/registro");
});

router.post('/registro', passport.authenticate("local.registro", {
    successRedirect: "/perfil",
    failureRedirect: "/registro",
    failureFlash: true
  }));

  
router.get("/perfil", (req, res) => {
  res.send("este es tu perfil");
});

module.exports = router;
