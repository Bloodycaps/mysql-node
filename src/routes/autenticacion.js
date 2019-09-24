const express = require("express");
const router = express.Router();
const passport = require("passport");
const aut = require('../lib/aut');

router.get("/registro", aut.isNotLoggedIn, (req, res) => {
  res.render("aut/registro");
});

router.post('/registro', aut.isNotLoggedIn, passport.authenticate("local.registro", {
    successRedirect: "/perfil",
    failureRedirect: "/registro",
    failureFlash: true
}));

router.get('/login', aut.isNotLoggedIn, (req, res) => {
  res.render('aut/login');
});

router.post('/login', aut.isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local.login', {
    successRedirect: '/perfil',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
});


router.get("/perfil", aut.isLoggedIn, (req, res) => {
  res.render("aut/perfil");
});

router.get('/cerrar', aut.isLoggedIn, (req, res) => {
  req.logOut();
  res.redirect('/login');
});

module.exports = router;
