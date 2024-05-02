// Obtener referencias de los elementos HTML
var boton = document.getElementById('agregar');
var guardar = document.getElementById('guardar');
var lista = document.getElementById("lista");

// Inicializar variables
var data = [];
var cant = 0;

// Agregar eventos a los botones
boton.addEventListener("click", agregar);
guardar.addEventListener("click", save);

// Función para agregar elementos a la lista
function agregar() {
    // Obtener valores del formulario
    var nombre = document.querySelector('#nombre').value;
    var precio = parseFloat(document.querySelector('#precio').value);
    var cantidad = parseFloat(document.querySelector('#cantidad').value);
    var total = precio * cantidad;

    // Agregar datos al array 'data'
    data.push({
        "id": cant,
        "nombre": nombre,
        "precio": precio,
        "cantidad": cantidad,
        "total": total
    });

    // Crear fila HTML y agregarla a la tabla
    var id_row = 'row' + cant;
    var fila = '<tr id=' + id_row + '><td>' + nombre + '</td><td>' + precio + '</td><td>' + cantidad + '</td><td>' + total + '</td><td><a href="#" class="btn btn-danger" onclick="eliminar(' + cant + ')";>Eliminar</a><a href="#" class="btn btn-danger" onclick="cantidad(' + cant + ')";>Editar</a></td></tr>';
    $("#lista").append(fila);

    // Limpiar y enfocar los campos del formulario
    $("#nombre").val('');
    $("#precio").val('');
    $("#cantidad").val('');
    $("#nombre").focus();

    // Incrementar el contador
    cant++;

    // Actualizar la suma total
    sumar();
}

// Función para guardar los datos en localStorage
function save() {
    var dataString = JSON.stringify(data);
    localStorage.setItem('myData', dataString);

}

// Función para cargar los datos desde localStorage al cargar la página
window.onload = function () {
    // Verificar si hay datos en localStorage
    if (localStorage.getItem('myData') !== null) {
        // Obtener la cadena JSON de localStorage
        var dataString = localStorage.getItem('myData');

        // Analizar la cadena JSON para obtener el array de datos
        data = JSON.parse(dataString);

        // Iterar sobre el array de datos y agregar filas a la tabla
        for (var i = 0; i < data.length; i++) {
            var row = data[i];
            var id_row = 'row' + i;
            var fila = '<tr id=' + id_row + '><td>' + row.nombre + '</td><td>' + row.precio + '</td><td>' + row.cantidad + '</td><td>' + row.total + '</td><td><a href="#" class="btn btn-danger" onclick="eliminar(' + i + ')";>Eliminar</a><a href="#" class="btn btn-danger" onclick="cantidad(' + i + ')";>Editar</a></td></tr>';
            $("#lista").append(fila);
        }
    }
}

// Función para eliminar un elemento de la lista
function eliminar(row) {
    $("#row" + row).remove();

    // Buscar y eliminar el elemento correspondiente en el array 'data'
    var i = 0;
    var pos = -1;
    for (x of data) {
        if (x.id == row) {
            pos = i;
        }
        i++;
    }
    data.splice(pos, 1);

    // Actualizar la suma total
    sumar();
}

// Función para editar un elemento de la lista
function cantidad(row) {
    var nom = prompt("Nuevo nombre").toString();
    var precio = parseInt(prompt("Nuevo precio"));
    var can = parseFloat(prompt("Nueva cantidad"));

    // Actualizar los datos en el array 'data'
    data[row].nombre = nom;
    data[row].precio = precio;
    data[row].cantidad = can;
    data[row].total = data[row].cantidad * data[row].precio;

    // Actualizar la fila en la tabla
    var fila = document.getElementById("row" + row);
    var celdas = fila.getElementsByTagName('td');
    celdas[0].innerHTML = nom;
    celdas[1].innerHTML = precio;
    celdas[2].innerHTML = can;
    celdas[3].innerHTML = data[row].total;

    // Actualizar la suma total
    sumar();
    console.log(data);
}

// Función para calcular la suma total de los precios
function sumar() {
    let tot = 0;
    for (x of data) {
        tot = tot + x.total;
    }
    document.querySelector("#total").innerHTML = "Total " + tot;
}
