function limpiarCampos() {
    document.getElementById("miFormulario").reset(); // Limpia los campos de entrada
    document.getElementById("mensajeError").innerHTML = ''; // Limpia cualquier mensaje de error
    document.getElementById("respuesta").innerHTML = ''; // Limpia cualquier mensaje de éxito
}

function enviarDatos() {
    var nombre = document.getElementById("nombre").value;
    var email = document.getElementById("email").value;
    var mensaje = document.getElementById("mensaje").value;

    // Validar los campos antes de enviar los datos
    if (!nombre || !email || !isNaN(nombre) || !isNaN(email)) {
        document.getElementById("mensajeError").innerHTML = 'Por favor, completa los campos de nombre y correo electrónico con información válida.';
        document.getElementById("mensajeError").style.display = 'block'; // Mostrar el mensaje de error
        document.getElementById("respuesta").innerHTML = ''; // Limpia cualquier mensaje de éxito
        return; // Detener el envío si falta información o contiene solo números
    }

    var data = {
        nombre: nombre,
        email: email,
        mensaje: mensaje
    };

    fetch('/guardarDatos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        document.getElementById("respuesta").innerHTML = 'Datos enviados con éxito: ' + JSON.stringify(result);
        document.getElementById("mensajeError").style.display = 'none'; // Ocultar el mensaje de error si se envían datos con éxito
    })
    .catch(error => {
        console.error('Error al enviar los datos: ' + error);
        document.getElementById("mensajeError").innerHTML = 'Error al enviar los datos. Por favor, inténtalo de nuevo más tarde.';
        document.getElementById("mensajeError").style.display = 'block'; // Mostrar el mensaje de error en caso de error
    });
}