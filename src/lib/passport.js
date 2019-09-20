const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const pool = require('../database');
const helpers = require('../lib/helpers');

passport.use("local.registro", new LocalStrategy({
      usernameField: "nombreusuario",
      passwordField: "contrasenia",
      passReqToCallback: true
    }, async (req, nombreusuario, contrasenia, done) => {
      const { nombrecompleto } = req.body;
      const nuevoUsuario = {
        nombreusuario,
        contrasenia,
        nombrecompleto
      };
      nuevoUsuario.contrasenia = await helpers.codificarcontrasenia(contrasenia);
      const result = await pool.query('INSERT INTO usuario SET ?', [nuevoUsuario]);
      nuevoUsuario.id = result.insertId;
      return done(null, nuevoUsuario);
    }));

passport.serializeUser((usuario, done) => {
    done(null, usuario.id);
});

passport.deserializeUser(async (id, done) => {
    const filas = await pool.query('SELECT * FROM usuario WHERE id = ?', [id]);
    done(null, filas[0]);
});