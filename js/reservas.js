document.addEventListener("DOMContentLoaded", () => {
    // 1. Cargamos los selectores apenas abre la página
    cargarDatosSelectores();

    // 2. Lógica del formulario
    const formReserva = document.getElementById("formReserva");
    if (formReserva) {
        formReserva.addEventListener("submit", async function(e) {
            e.preventDefault();
            let datos = new FormData(formReserva);

            try {
                let response = await fetch('guardar_reserva.php', {
                    method: 'POST',
                    body: datos
                });
                let resultado = await response.json();

                if (resultado.success) {
                    alert("¡Reserva confirmada en RolvinTours!");
                    formReserva.reset();
                    mostrarReservas();
                }
            } catch (error) {
                console.error("Error al guardar reserva:", error);
            }
        });
    }

    // 3. Mostramos las reservas existentes
    mostrarReservas();
});

// --- FUNCIÓN PARA LLENAR SELECTORES ---
async function cargarDatosSelectores() {
    try {
        // Clientes
        const resCli = await fetch('../clientes/get_clientes.php');
        const clientes = await resCli.json();
        const selectCli = document.getElementById("cliente");
        
        if(selectCli) {
            selectCli.innerHTML = '<option value="">-- Seleccione un Cliente --</option>';
            clientes.forEach(c => {
                selectCli.innerHTML += `<option value="${c.id}">${c.nombre} (${c.documento})</option>`;
            });
        }

        // Paquetes
        const resPaq = await fetch('../paquetes/get_paquetes.php');
        const paquetes = await resPaq.json();
        const selectPaq = document.getElementById("paquete"); 
    
       console.log("¿Llegaron los paquetes?", paquetes);
       
        if(selectPaq) {
            selectPaq.innerHTML = '<option value="">-- Seleccione un Paquete --</option>';
            paquetes.forEach(p => {
                selectPaq.innerHTML += `<option value="${p.id}">${p.nombre_tour}</option>`;
            });
        }
    } catch (e) { 
        console.error("Error cargando selectores:", e); 
    }
}

// --- FUNCIÓN PARA MOSTRAR LA TABLA ---
async function mostrarReservas() {
    let tabla = document.getElementById("tablaReservas");
    if (!tabla) return;

    try {
        let response = await fetch('get_reservas.php');
        let lista = await response.json();

        tabla.innerHTML = "";
        lista.forEach(r => {
            tabla.innerHTML += `
                <tr>
                    <td>${r.id}</td>
                    <td>${r.cliente_nombre}</td>
                    <td>${r.paquete_nombre}</td>
                    <td>${r.fecha}</td>
                    <td><span class="badge">${r.estado}</span></td>
                    <td>
                        <button class="btn-cancelar" onclick="cancelarReserva(${r.id})">Cancelar</button>
                    </td>
                </tr>`;
        });
    } catch (error) { 
        console.error("Error al mostrar reservas:", error); 
    }
}

// --- FUNCIÓN PARA CANCELAR (ELIMINAR) ---
async function cancelarReserva(id) {
    if (confirm("¿Seguro que deseas eliminar esta reserva?")) {
        try {
            // Asumiendo que crearás este archivo después
            let response = await fetch('cancelar_reserva.php?id=' + id);
            let res = await response.json();
            if (res.success) {
                mostrarReservas();
            }
        } catch (e) {
            console.error("Error al cancelar:", e);
        }
    }
}

