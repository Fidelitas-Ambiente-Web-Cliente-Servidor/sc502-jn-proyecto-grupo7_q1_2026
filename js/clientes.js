document.addEventListener("DOMContentLoaded", () => {
    mostrarClientes();
});

async function mostrarClientes() {

    let cuerpoTabla = document.getElementById("cuerpoTablaClientes");

    if (!cuerpoTabla) return;

    try {

        let response = await fetch('get_clientes.php');

        let clientes = await response.json();

        cuerpoTabla.innerHTML = "";

        clientes.forEach(c => {
            cuerpoTabla.innerHTML += `
                <tr>
                    <td>${c.nombre}</td>
                    <td>${c.correo}</td>
                    <td>${c.telefono}</td>
                    <td>${c.documento}</td>
                </tr>
            `;
        });

    } catch (error) {
        console.error("Error cargando clientes:", error);
    }
}