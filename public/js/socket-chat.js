var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre y sala son necesarios');
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
};

socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('entrarChat', usuario, function(resp) {
        renderizarUsuarios(resp);
    });

});

// escuchar
socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');
});


// Escuchar información
socket.on('crearMensaje', function(mensaje) {
    renderizarMensajes(mensaje);
    scrollBottom();
});

// Escuchar cambios de usuarios
// cuando un usuario entra o sale del chat
socket.on('listarPersonas', function(personas) {
    renderizarUsuarios(personas, false);
});

// Mensajes privados
socket.on('mensajePrivado', function(mensaje) {
    console.log('Mensaje Privado:', mensaje);
});