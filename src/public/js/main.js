$(function() {
    const socket = io();
    var nick = '';


    //*************** Accedemos a los elementos **********************/

    // Se accede al p nick-error
    const nickError = $('#nick-error');
    // Accedemos al formulario de nickname
    const nickForm = $('#nick-form');
    // Accedemos al nickname escrito
    const nickName = $('#nickname');

    // Formulario de mensaje
    const messageForm = $('#messages-form');
    // Mensaje dentro del formulario
    const messageBox = $('#message')
    // Div de chat
    const chat = $('#chat');
    // Div de usernames
    const userNames = $('#usernames');

    // Eventos

    // Recoge la información del usuario logeado
    nickForm.submit(e => {
        e.preventDefault();
        socket.emit('nuevo usuario',nickName.val(), datos => {
            // Se comprueba si el usuario ya existe
            if(datos) {
                nick = nickName.val();
                $('#nick-wrap').hide();
                $('#content-wrap').show();
            } else {
                nickError.html('<div class="alert alert-danger">El usuario ya existe</div>');
            }

            nickName.val('');
        });
    });

    // Se obtiene el array de usuarios conectados
    socket.on('nombres usuarios', datos => {
        let html = '';
        let color = '';
        let salir = '';

        // Bucles para obtener todos los usuarios
        for(let i = 0; i < datos.length; i++){
            // Si coincide tendrá un estilo y una enlace de salida
            if(nick == datos[i]){
                color="#027F43";
                salir = '<a class="salida" href="/">Salir</a>';
            } else {
                color="#000";
                salir ='';
            }
            // Se añade cada elemento
            html += `<p style="color: ${color}">${datos[i]} ${salir}`;
        }

        userNames.html(html);
    });
    
    // Se envía un mensaje al servidor
    messageForm.submit(e => {
        e.preventDefault();
        // Se va a emitir un mensaje dentro de messageBox
        socket.emit('enviar mensaje', messageBox.val());
        // Se limpia el mensaje
        messageBox.val('');
    });

    // Se obtiene la respuesta del servidor
    socket.on('nuevo mensaje',function(datos){
        // console.log(datos);
        let color = '#f4f4f4';
        if(nick == datos.username){
            color = '#9ff4c5';
        }
        // Se añade el mensaje recibido del servidor al chat
        chat.append(`<div class="msg-area mb-2 d-flex" style="background-color:${color}"><p class="msg"><b>${datos.username}: </b>${datos.msg}</p></div>`);
    });
});



