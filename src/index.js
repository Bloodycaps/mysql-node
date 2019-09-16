const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');

//Inicializaciones
const app = express();

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
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Variables Gobales

app.use((req, res, next) => {

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