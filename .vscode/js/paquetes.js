document.addEventListener("DOMContentLoaded", () => {
    // --- LÓGICA PARA REGISTRAR ---
    const formPaquete = document.getElementById("formPaquete");
    if (formPaquete) {
        formPaquete.addEventListener("submit", async function (e) {
            e.preventDefault();
            await registrarNuevoPaquete();
        });
    }

    // --- LÓGICA PARA CONSULTAR ---
    const cuerpoTabla = document.getElementById("cuerpoTablaPaquete");
    if (cuerpoTabla) {
        mostrarPaquetesEnTabla();
    }
});

async function registrarNuevoPaquete() {
    const formPaquete = document.getElementById("formPaquete");
    let datos = new FormData(formPaquete);

    try {
        let response = await fetch('/paquetes/guardar_paquete.php', {
            method: 'POST',
            body: datos
        });
        let resultado = await response.json();

        if (resultado.success) {
            alert("Paquete turístico registrado con éxito.");
            formPaquete.reset();
        } else {
            alert("Error al guardar: " + resultado.error);
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

async function mostrarPaquetesEnTabla() {
    const cuerpoTabla = document.getElementById("cuerpoTablaPaquete");
    cuerpoTabla.innerHTML = "<tr><td colspan='6'>Cargando paquetes...</td></tr>";

    try {
        let response = await fetch('/paquetes/get_paquetes.php');
        let paquetes = await response.json();

        cuerpoTabla.innerHTML = "";
        if (paquetes.length === 0) {
            cuerpoTabla.innerHTML = `<tr><td colspan="6" style="text-align:center;">No hay paquetes registrados aún.</td></tr>`;
            return;
        }

        paquetes.forEach((paquete) => {
            cuerpoTabla.innerHTML += `
                <tr>
                    <td>${paquete.id}</td>
                    <td>${paquete.nombre_tour}</td>
                    <td>${paquete.destino}</td>
                    <td>$${parseFloat(paquete.precio).toFixed(2)}</td>
                    <td>${paquete.descripcion}</td>
                    <td class="acciones">
                        <button class="btn-editar" onclick="prepararEdicion(${paquete.id})">Editar</button>
                        <button class="btn-eliminar" onclick="eliminarPaquete(${paquete.id})">Eliminar</button>
                    </td>
                </tr>`;
        });
    } catch (error) {
        console.error("Error al cargar paquetes:", error);
    }
}