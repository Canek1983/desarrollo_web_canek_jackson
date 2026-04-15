// ================= MIEMBROS =================
const formMiembro = document.getElementById("form-miembro");
const mensajeExito = document.getElementById("mensaje-exito");

const tipoFun = document.getElementById("tipo");

if(formMiembro){
formMiembro.addEventListener("submit", function(e) {
  e.preventDefault();

  let valido = true;

  const celular = document.getElementById("celular").value;
  const numero = document.getElementById("id-numero").value;
  const nombre = document.getElementById("nombre").value;
  const email = document.getElementById("email").value;
  let digito = document.getElementById("id-digito").value;

  const errorNumero = document.getElementById("error-id-numero");
  const errorDigito = document.getElementById("error-id-digito");
  const errorCelular = document.getElementById("error-celular");

  const errorNombre = document.getElementById("error-nombre");
  const errorEmail = document.getElementById("error-email");
  const errorTipo = document.getElementById("error-tipo");

  // VALIDAR NUMERO
  if (numero === "" || numero.length > 8 || numero.length < 7 || isNaN(numero)) {
    errorNumero.classList.add("visible");
    valido = false;
  } else {
    errorNumero.classList.remove("visible");
  }

  // VALIDAR CELULAR (9 DIGITOS)
  if (celular.length != 9 || isNaN(celular)) {
    errorCelular.classList.add("visible");
    valido = false;
  } else {
    errorCelular.classList.remove("visible");
  }

  // VALIDAR DIGITO
  digito = digito.toUpperCase();

  if (digito.length !== 1 || (!(digito >= "0" && digito <= "9") && digito !== "K")) {
    errorDigito.classList.add("visible");
    valido = false;
  } else {
    errorDigito.classList.remove("visible");
  }
  
  // VALIDAR NOMBRE
  if (nombre.length < 3) {
    errorNombre.classList.add("visible");
    valido = false;
  } else {
    errorNombre.classList.remove("visible");
  }

  // VALIDAR EMAIL
  if (email === "" || !email.includes("@") || !email.includes(".")) {
    errorEmail.classList.add("visible");
    valido = false;
  } else {
    errorEmail.classList.remove("visible");
  }

  // VALIDAR TIPO
  if (tipoFun.value === ""){
    errorTipo.classList.add("visible");
    valido = false;
  } else {
    errorTipo.classList.remove("visible");
  }

  // SI TODO ESTÁ BIEN
  if (valido) {
   mensajeExito.classList.add("visible");
   formMiembro.reset();
    } 
});

 // BORRA EL MENSAJE DE EXITO CUANDO USUARIO VUELVE A ESCRIBIR
formMiembro.addEventListener("input", () => {
  mensajeExito.classList.remove("visible");
});

const campoFuncionario = document.getElementById("campo-funcionario");
const campoAcademico = document.getElementById("campo-academico");
const campoAlumno = document.getElementById("campo-alumno");

if(tipoFun){
tipoFun.addEventListener("change", function() {

  if (tipoFun.value === "funcionario") {
    campoFuncionario.style.display = "block";
    campoAcademico.style.display = "none";
    campoAlumno.style.display = "none";
  }

  if (tipoFun.value === "academico") {
    campoFuncionario.style.display = "none";
    campoAcademico.style.display = "block";
    campoAlumno.style.display = "none";
  }

  if (tipoFun.value === "alumno") {
    campoFuncionario.style.display = "none";
    campoAcademico.style.display = "none";
    campoAlumno.style.display = "block";
  }

  if (tipoFun.value === "") {
    campoFuncionario.style.display = "none";
    campoAcademico.style.display = "none";
    campoAlumno.style.display = "none";
  }

});
}}

// ================= ACTIVIDADES =================
const formActividad = document.getElementById("form-actividad");

if (formActividad){
formActividad.addEventListener("submit", function(e) {
  e.preventDefault();

  let valido = true;

  const nombre = document.getElementById("nombre-actividad").value;
  const tipo = document.getElementById("tipo-actividad").value;
  const horas = document.getElementById("horas-actividad").value;

  const errorNombre = document.getElementById("error-nombre-actividad");
  const errorTipo = document.getElementById("error-tipo-actividad");
  const errorHoras = document.getElementById("error-horas");
  
  // VALIDAR NOMBRE
  if (nombre.length < 3) {
    errorNombre.style.display = "block";
    valido = false;
  } else {
    errorNombre.style.display = "none";
  }

  // VALIDAR TIPO
  if (tipo === "") {
    errorTipo.style.display = "block";
    valido = false;
  } else {
    errorTipo.style.display = "none";
  }

  // VALIDAR HORAS
  if (horas === "" || horas < 1 || horas > 40) {
    errorHoras.style.display = "block";
    valido = false;
  } else {
    errorHoras.style.display = "none";
  }

  // SI TODO ESTÁ BIEN
  if (valido) {
    alert("Actividad registrada correctamente");
    formActividad.reset();
  }
});
}

// ================= FILTRO DE LISTADO DE MIEMBROS =================
const tabla = document.getElementById("tabla");

if (tabla){
  const filtroNombre = document.getElementById("filtroNombre");
  const filtroTipo = document.getElementById("filtroTipo");
  const contPaginacion = document.getElementById("paginacion");

  let datos = [...DATA];
  let paginaActual = 1;
  const porPagina = 20;

  function render() {
    const inicio = (paginaActual - 1) * porPagina;
    const fin = inicio + porPagina;
    const paginaDatos = datos.slice(inicio, fin);

    tabla.innerHTML = "";
    paginaDatos.forEach(d => {
      tabla.innerHTML += `
        <tr>
          <td>${d.nombre}</td>
          <td>${d.tipo}</td>
          <td>${d.email}</td>
          <td>${d.celular}</td>
        </tr>
      `;
    });

    renderPaginacion();
  }

  function renderPaginacion() {
    const totalPaginas = Math.ceil(datos.length / porPagina);
    contPaginacion.innerHTML = "";

    for (let i = 1; i <= totalPaginas; i++) {
      contPaginacion.innerHTML += `<button onclick="irPagina(${i})">${i}</button>`;
    }
  }

  window.irPagina = function(p) {
    paginaActual = p;
    render();
  };

  window.ordenar = function(campo) {
    datos.sort((a, b) => a[campo].localeCompare(b[campo]));
    paginaActual = 1;
    render();
  };

  filtroNombre.addEventListener("input", e => {
    const valor = e.target.value.toLowerCase();
    datos = DATA.filter(d => d.nombre.toLowerCase().includes(valor));
    paginaActual = 1;
    render();
  });

  filtroTipo.addEventListener("change", e => {
    const valor = e.target.value;
    if (valor === "") {
      datos = [...DATA];
    } else {
      datos = DATA.filter(d => d.tipo === valor);
    }
    paginaActual = 1;
    render();
  });

  render();
}
