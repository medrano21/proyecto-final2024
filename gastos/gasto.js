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

    // Agregar datos al arreglo 'data'
    data.push({
        "id": cant,
        "nombre": nombre,
        "precio": precio,
    });

    // ROW es una variable local utilizada para representar un elemento específico del arreglo data 
    // Crear fila HTML y agregarla a la tabla
    var id_row = 'row' + cant;
    var fila = '<tr id=' + id_row + '><td>' + nombre + '</td><td>' + precio + '</td><td><a href="#" class="btn btn-danger" onclick="eliminar(' + cant + ')";>Eliminar</a><a href="#" class="btn btn-danger" onclick="cantidad(' + cant + ')";>Editar</a></td></tr>';
    $("#lista").append(fila);

    // Limpia los input para volver a agregar
    $("#nombre").val('');
    $("#precio").val('');
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
    if (localStorage.getItem('myData') !== null) {
        var dataString = localStorage.getItem('myData');
        data = JSON.parse(dataString);

        // Iterar sobre los datos y agregar filas a la tabla
        for (var i = 0; i < data.length; i++) {
            var row = data[i];
            var id_row = 'row' + i;
            var fila = '<tr id=' + id_row + '><td>' + row.nombre + '</td><td>' + row.precio + '</td><td><a href="#" class="btn btn-danger" onclick="eliminar(' + i + ')";>Eliminar</a><a href="#" class="btn btn-danger" onclick="cantidad(' + i + ')";>Editar</a></td></tr>';
            $("#lista").append(fila);
        }
    }
}

// Función para eliminar un elemento de la lista
function eliminar(row) {
    $("#row" + row).remove();

    // Encontrar y eliminar el elemento correspondiente en el array 'data'
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

    // Actualizar los datos en el array 'data'
    data[row].nombre = nom;
    data[row].precio = precio;

    // Actualizar la fila en la tabla
    var fila = document.getElementById("row" + row);
    var celdas = fila.getElementsByTagName('td');
    celdas[0].innerHTML = nom;
    celdas[1].innerHTML = precio;

    // Actualizar la suma total
    sumar();
}

// Función para calcular la suma total de los precios
function sumar() {
    let tot = 0;
    for (x of data) {
        tot = tot + x.precio;
    }
    document.querySelector("#total").innerHTML = "Total " + tot;
}
