// acá dejaremos toda la lógica de los sockets
module.exports = function(server) {
  // Ahora creamos nuestras funciones de Sockets
  const io = require('socket.io')(server);


  // cuando me conecte con algún cliente
  io.on('connection', function(socket) {

    socket.on('message', function(data) {

      socket.broadcast.emit('messageIn', data);
    });
    
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
}