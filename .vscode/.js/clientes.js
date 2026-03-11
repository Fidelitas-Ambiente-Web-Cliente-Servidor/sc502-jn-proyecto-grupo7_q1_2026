let clientes = JSON.parse(localStorage.getItem("clientes")) || [];

document.addEventListener("DOMContentLoaded", () => {

let form = document.getElementById("formCliente");

if(form){

form.addEventListener("submit", function(e){

e.preventDefault();

let cliente = {
nombre: document.getElementById("nombre").value,
correo: document.getElementById("correo").value,
telefono: document.getElementById("telefono").value,
documento: document.getElementById("documento").value
};

clientes.push(cliente);

localStorage.setItem("clientes", JSON.stringify(clientes));

alert("Cliente registrado");

form.reset();

});

}

mostrarClientes();

});

function mostrarClientes(){

let tabla = document.getElementById("tablaClientes");

if(!tabla) return;

tabla.innerHTML = "";

clientes.forEach(cliente => {

tabla.innerHTML += `
<tr>
<td>${cliente.nombre}</td>
<td>${cliente.correo}</td>
<td>${cliente.telefono}</td>
<td>${cliente.documento}</td>
</tr>
`;

});

}

function buscarCliente(){

let documento = document.getElementById("buscarDocumento").value;

let cliente = clientes.find(c => c.documento === documento);

if(cliente){

document.getElementById("nombre").value = cliente.nombre;
document.getElementById("correo").value = cliente.correo;
document.getElementById("telefono").value = cliente.telefono;

}else{

alert("Cliente no encontrado");

}

}

function actualizarCliente(){

let documento = document.getElementById("buscarDocumento").value;

let cliente = clientes.find(c => c.documento === documento);

if(cliente){

cliente.nombre = document.getElementById("nombre").value;
cliente.correo = document.getElementById("correo").value;
cliente.telefono = document.getElementById("telefono").value;

localStorage.setItem("clientes", JSON.stringify(clientes));

alert("Cliente actualizado");

}

}