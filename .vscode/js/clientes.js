document.addEventListener("DOMContentLoaded", () => {
    let form = document.getElementById("formCliente");

    if (form) {
        form.addEventListener("submit", async function(e) { // Agregamos async
            e.preventDefault();

            // Creamos un objeto con los datos del formulario
            let datos = new FormData(form);

            // Enviamos los datos a PHP en lugar de localStorage
            try {
                let response = await fetch('guardar_cliente.php', {
                    method: 'POST',
                    body: datos
                });
                let resultado = await response.json();

                if (resultado.success) {
                    alert("Cliente registrado en la Base de Datos");
                    form.reset();
                    mostrarClientes(); // Recargamos la tabla
                }
            } catch (error) {
                console.error("Error:", error);
            }
        });
    }
    mostrarClientes();
});

async function mostrarClientes() {
    let tabla = document.getElementById("tablaClientes");
    if (!tabla) return;

   try {
    let response = await fetch('guardar_cliente.php', {
        method: 'POST',
        body: datos
    });

    // --- ESTA ES LA PARTE PARA DIAGNÓSTICO ---
    const textoRespuesta = await response.text(); // Leemos como texto primero
    console.log("Respuesta bruta del servidor:", textoRespuesta);

    let resultado = JSON.parse(textoRespuesta); // Intentamos convertir a JSON
    // -----------------------------------------

    if (resultado.success) {
        alert("Cliente registrado en la Base de Datos");
        form.reset();
        mostrarClientes();
    } else {
        alert("Error del servidor: " + resultado.error);
    }
} catch (error) {
    console.error("Error crítico de red o formato:", error);
    alert("Revisa la consola (F12) para ver el error real del servidor.");
}
}