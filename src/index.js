const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const passport = require('passport');

const { database } = require('./keys');

//Inicializaciones
const app = express();
require('./lib/passport');

//Configuraciones
app.set('puerto', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');


//Middlewares
app.use(session({
    secret: 'myslq-node',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

//Variables Gobales

app.use((req, res, next) => {
    app.locals.bien = req.flash('bien');
    app.locals.editar = req.flash('editar');
    app.locals.eliminar = req.flash('eliminar');
    next();
});

//Rutas
app.use(require('./routes'));
app.use(require('./routes/autenticacion'));
app.use('/enlaces', require( './routes/enlaces'));

//Public
app.use(express.static(path.join(__dirname, 'public')));

//Iniciando Servidor
app.listen(app.get('puerto'), () => {
    console.log('Servidor en el puerto', app.get('puerto'));
});