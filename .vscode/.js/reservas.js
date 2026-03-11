let reservas = []
let id = 1

document.getElementById("formReserva").addEventListener("submit", function(e){

e.preventDefault()

let cliente = document.getElementById("cliente").value
let paquete = document.getElementById("paquete").value
let fecha = document.getElementById("fecha").value
let estado = document.getElementById("estado").value

let reserva = {

id:id++,
cliente:cliente,
paquete:paquete,
fecha:fecha,
estado:estado

}

reservas.push(reserva)

mostrarReservas()

this.reset()

})

function mostrarReservas(){

let tabla = document.getElementById("tablaReservas")

tabla.innerHTML=""

reservas.forEach(r => {

tabla.innerHTML += `
<tr>

<td>${r.id}</td>
<td>${r.cliente}</td>
<td>${r.paquete}</td>
<td>${r.fecha}</td>
<td>${r.estado}</td>

<td>
<button class="btn-cancelar" onclick="cancelarReserva(${r.id})">
Cancelar
</button>
</td>

</tr>
`

})

}

function cancelarReserva(idReserva){

reservas = reservas.filter(r => r.id !== idReserva)

mostrarReservas()

}