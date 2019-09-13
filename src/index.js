const express = require('express');
const morgan = require('morgan');


//Inicializaciones
const app = express();

//Configuraciones
app.set('puerto', process.env.PORT || 4000);


//Middlewares
app.use(morgan('dev'));

//Variables Gobales

//Rutas


//Public


//Iniciando Servidor
app.listen(app.get('puerto'), () => {
    console.log('Servidor en el puerto', app.get('puerto'));
});