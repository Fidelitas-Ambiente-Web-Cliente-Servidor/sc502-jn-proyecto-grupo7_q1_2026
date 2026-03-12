
// --- JS SIMPLIFICADO Y FORZADO: js/paquetes.js ---

// 1. Inicializamos la lista siempre vacía al cargar (para evitar errores de storage)
let listaPaquetes = [];

// 2. Intentamos cargar del localStorage de forma segura
try {
    const datosRaw = localStorage.getItem("paquetes");
    if (datosRaw) {
        listaPaquetes = JSON.parse(datosRaw);
        console.log("Datos cargados correctamente:", listaPaquetes);
    } else {
        console.log("No hay datos guardados aún.");
    }
} catch (error) {
    console.error("Error crítico al leer localStorage:", error);
    // Si falla, empezamos limpio
    listaPaquetes = [];
}

// 3. Esperamos a que todo el HTML se cargue
document.addEventListener("DOMContentLoaded", () => {
    
    console.log("HTML cargado. Buscando elementos...");

    // --- LÓGICA PARA REGISTRAR ---
    const formPaquete = document.getElementById("formPaquete");
    if (formPaquete) {
        console.log("Formulario de registro encontrado.");
        formPaquete.addEventListener("submit", function (e) {
            e.preventDefault();
            registrarNuevoPaquete();
        });
    }

    // --- LÓGICA PARA CONSULTAR (SÚPER AJUSTADO) ---
    // Usamos el ID exacto de tu HTML: "cuerpoTablaPaquete" (singular)
    const cuerpoTabla = document.getElementById("cuerpoTablaPaquete");

    if (cuerpoTabla) {
        console.log("Tabla encontrada. Forzando llenado de datos...");
        mostrarPaquetesEnTabla();
    } else {
        console.error("ERROR CRÍTICO: No se encontró el elemento con ID 'cuerpoTablaPaquete' en el HTML.");
    }
});

/**
 * Función separada para registrar el paquete y guardar en storage.
 */
function registrarNuevoPaquete() {
    try {
        const nombre = document.getElementById("nombre_paquete").value;
        const destino = document.getElementById("destino").value;
        const precio = document.getElementById("precio").value;
        const descripcion = document.getElementById("descripcion").value;

        // Validación básica
        if (!nombre || !destino || !precio) {
            alert("Por favor, llena los campos obligatorios (Nombre, Destino, Precio).");
            return;
        }

        const nuevoPaquete = {
            id_paquete: Date.now(), // ID único simple
            nombre: nombre,
            destino: destino,
            precio: parseFloat(precio), 
            descripcion: descripcion
        };

        // Guardar en la lista y en storage
        listaPaquetes.push(nuevoPaquete);
        localStorage.setItem("paquetes", JSON.stringify(listaPaquetes));
        console.log("Paquete guardado en storage:", nuevoPaquete);

        alert("Paquete turístico registrado con éxito.");
        formPaquete.reset();
    } catch (error) {
        console.error("Error al registrar el paquete:", error);
        alert("Hubo un error al guardar el paquete. Revisa la consola.");
    }
}

/**
 * Función separada para llenar la tabla en consultar.html.
 */
function mostrarPaquetesEnTabla() {
    const cuerpoTabla = document.getElementById("cuerpoTablaPaquete");
    
    // Forzamos limpiar el texto "Cargando paquetes..."
    cuerpoTabla.innerHTML = "";

    // Si no hay datos, mostramos una fila de aviso
    if (listaPaquetes.length === 0) {
        cuerpoTabla.innerHTML = `<tr><td colspan="6" style="text-align:center;">No hay paquetes registrados aún. Haz clic en 'Registrar Nuevo' para empezar.</td></tr>`;
        console.log("Tabla llena (vacía).");
        return;
    }

    // Recorremos la lista y creamos las filas
    listaPaquetes.forEach((paquete) => {
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${paquete.id_paquete}</td>
            <td>${paquete.nombre}</td>
            <td>${paquete.destino}</td>
            <td>$${paquete.precio.toFixed(2)}</td>
            <td>${paquete.descripcion}</td>
            <td class="acciones">
                <button class="btn-editar" onclick="prepararEdicion(${paquete.id_paquete})">Editar</button>
                <button class="btn-eliminar" onclick="eliminarPaquete(${paquete.id_paquete})">Eliminar</button>
            </td>
        `;

        cuerpoTabla.appendChild(fila);
    });
    console.log("Tabla llena con " + listaPaquetes.length + " paquetes.");
}

// Marcadores de posición para las funciones de botones para que no den error
function prepararEdicion(id) { alert("Función Editar (ID: " + id + ") aún no implementada."); }
function eliminarPaquete(id) { alert("Función Eliminar (ID: " + id + ") aún no implementada."); }