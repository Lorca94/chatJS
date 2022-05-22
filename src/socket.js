module.exports = (io) => {
    let nicknames = [];
    io.on('connection', socket => {
        // Se indica por consola si hay un nuevo usuario conectado
        // console.log("Nuevo usuario conectado.");


        // Al recibir un nuevo usuario 
        socket.on('nuevo usuario', (datos, callback) => {
            // Se comprueba si el usuario existe
            if(nicknames.indexOf(datos) != -1){
                callback(false);
            } else {
                callback(true);
                socket.nickname = datos;
                nicknames.push(socket.nickname);

                io.sockets.emit('nombres usuarios', nicknames)
            }
        });

        // Al recibir el mensaje recojemos los datos del mensaje(username y mensaje)
        socket.on('enviar mensaje',(datos) => {
            //console.log(datos)
            io.sockets.emit('nuevo mensaje', {
                msg:datos,
                username:socket.nickname
            });
        });

        // Desconectar usuarios
        socket.on('disconnect', datos => {
            if(!socket.nickname){
                return;
            } else {
                nicknames.splice(nicknames.indexOf(socket.nickname), 1);
                io.sockets.emit('nombres usuarios', nicknames)
            }
        });
        
    });
}