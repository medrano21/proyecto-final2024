// crear variable y igualar a los id del html
var boton = document.getElementById('agregar');
var guardar = document.getElementById('guardar');
var lista = document.getElementById("lista");

// Inicializar variables
var data = [];//arreglo
var cant = 0;//contador

// Agregar eventos a los botones
boton.addEventListener("click", agregar);
guardar.addEventListener("click", save);

// Función para agregar elementos a la lista
function agregar() {
    // crear variable y lo igualamos a las clases del html
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
    var fila = '<tr id=' + id_row + '><td>' + nombre + '</td><td>' + precio + '</td><td>' + cantidad + '</td><td>' + total + '</td>';
    $("#lista").append(fila);

    // al apretar agregar limpia los input para volver a agregar
    $("#nombre").val('');
    $("#precio").val('');
    $("#cantidad").val('');
    $("#nombre").focus();

    // Incrementar el contador
    cant++;

    // llamamos a la funcion, para actualizar la suma total
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
            var fila = '<tr id=' + id_row + '><td>' + row.nombre + '</td><td>' + row.precio + '</td><td>' + row.cantidad + '</td><td>' + row.total + '</td>';
            $("#lista").append(fila);
        }
    }
}

// Función para calcular la suma total de los precios
function sumar() {
    let tot = 0;
    for (x of data) {
        tot = tot + x.total;
    }
    document.querySelector("#total").innerHTML = "Total " + tot;
}
