const express = require("express");
const session = require('express-session');
const flash = require('connect-flash');

const app = express();
const port = 8000;

app.use(session({secret: 'mipropiaclave'}));  
app.use(flash());

// para los posts
app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );

// Para las vistas
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// para archivos estaticos
app.use('/static', express.static("static"));

// importar las rutas
app.use(require('./routes/auth'));
app.use(require('./routes/routes'));


// Lanzamos nuestra aplicación
const server = app.listen(port, function() {
  console.log('Escuchando en el puerto ' + port);
});


// Ahora creamos nuestras funciones de Sockets
const io = require('socket.io')(server);


// cuando me conecte con algún cliente
io.on('connection', function(socket) {
  
  socket.on('generarYo', function(data) {
    const numeroAzar = Math.floor(Math.random() * 800);
    // mandamos respuesta sólo al usuario que generó el mensaje
    socket.emit('numero', {numero: numeroAzar});
  });

  socket.on('generarTodos', function(data) {
    const numeroAzar = Math.floor(Math.random() * 800);
    // mandamos respuesta a todos los usuarios
    io.emit('numero', {numero: numeroAzar});
  });

  socket.on('generarResto', function(data) {
    const numeroAzar = Math.floor(Math.random() * 800);
    // mandamos respuesta a todos los usuarios menos al que envió
    socket.broadcast.emit('numero', {numero: numeroAzar});
  });

});
