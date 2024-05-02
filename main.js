function login() {
  //Creo variables y lo igualamos a los id del html
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  // Verifica que las contraseñas sean correctas y nos envia a las paginas
  if (username === "admin" && password === "123") {
      document.location.href = "cargausuario/carga.html";
  } else if (username === "empleado" && password === "123") {
    document.location.href="agregar/agregar.html";
  } else {
      alert("Credenciales incorrectos. Por favor, inténtelo de nuevo.");
  }
}
