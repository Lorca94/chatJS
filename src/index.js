const express = require('express');
const path = require('path');

// Se crea la app
const app = express();

const server = require('http').Server(app);
const socketio = require('socket.io')(server);

// Se obtiene puerto de variable de entorno o en el puerto 3000
app.set('port', process.env.PORT || 3000);

require('./socket')(socketio);
// Archivos estáticos
app.use(express.static(path.join(__dirname,'public')));

server.listen(app.get('port'), () => {
    console.log("Server init on port",app.get('port'));
});