/*
Proyecto realizado por: José A. Rodríguez López
Fecha: 13/02/2023
*/
let grabar = false //Flag que controla si bGrabar ha cambiado a grabar.
let borrado = false //Flag que controla si se ha borrado un registro.
let siguiente = false //Flag que controla si el flujo va al registro siguiente.
let anterior = false //Flag que controla si el flujo va al registro anterior.
let hayDatosBD = false //Flag que controla si se han leído datos en una consulta.

//-------------------------------------------------------------------------------------------------
//Referencias de los objetos del documento.
const bGrabar = document.getElementById('bGrabar')
const bModificar = document.getElementById('bModificar')
const bBorrar = document.getElementById('bBorrar')
const bPrimero = document.getElementById('bPrimero')
const bUltimo = document.getElementById('bUltimo')
const bSiguiente = document.getElementById('bSiguiente')
const bAnterior = document.getElementById('bAnterior')
const bListado = document.getElementById('bListado')
const iId = document.getElementById('iId')
const iNIF = document.getElementById('iNIF')
const iPuestaServicio = document.getElementById('iPuestaServicio')
const iLatitud = document.getElementById('iLatitud')
const iLongitud = document.getElementById('iLongitud')
const iDireccion = document.getElementById('iDireccion')

//--------------------------------------------------------------------------------------------------
//Definición de eventos de los objetos.
bGrabar.addEventListener('click', nuevoRegistro, false) //Evento click sobre el botón Grabar datos.
bModificar.addEventListener(
  'click',
  function () {
    if (validarDispotivo()) {
      grabarRegistro(false)
    }
  },
  false,
) //Evento click sobre el botón Modificar registro.
bBorrar.addEventListener('click', borrarRegistro, false) //Evento click sobre el botón Borrar registro.
bPrimero.addEventListener('click', primerRegistro, false) //Evento click sobre el botón Visualizar Primero.
bUltimo.addEventListener('click', ultimoRegistro, false) //Evento click sobre el botón Visualizar último.
bSiguiente.addEventListener('click', siguienteRegistro, false) //Evento click sobre el botón Siguiente registro.
bAnterior.addEventListener('click', anteriorRegistro, false) //Evento click sobre el botón Anterior registro.

//--------------------------------------------------------------------------------------------------
//Crea un nuevo registro.
function nuevoRegistro() {
  borrarMarcadores()
  if (!grabar) {
    limpiarCampos()
    cambiarGrabar()
  } else {
    //Grabando.
    if (validarAbonado()) {
      grabarRegistro(true)
      cambiarNuevo()
      grabar = false
      hayDatosBD = true
      habilitarBotones()
    }
  }
}

//--------------------------------------------------------------------------------------------------
//Visualiza el primer registro de la base de datos.
function primerRegistro() {
  borrarMarcadores()
  //Registros cuyo Id>=0 ordenados de forma ascendente.
  let datosRequeridos = 'order by Id ASC'
  solicitarRegistro(datosRequeridos)
  grabar = false
  habilitarBotones()
}

//--------------------------------------------------------------------------------------------------
//Visualiza el último registro de la base de datos.
function ultimoRegistro() {
  //Registros cuyo Id>=0 ordenados de forma descendente.
  let datosRequeridos = 'order by Id DESC'
  solicitarRegistro(datosRequeridos)
  grabar = false
  habilitarBotones()
}

//--------------------------------------------------------------------------------------------------
//Visualiza el siguiente registro de la base de datos.
function siguienteRegistro() {
  if (iId.value != '') {
    siguiente = true
    //Registros cuyo Id>que el Id del registro actual ordenados de forma ascendente.
    let datosRequeridos = 'where Id>' + iId.value + ' order by Id asc'
    solicitarRegistro(datosRequeridos)
  } else {
    mostrarVentanaEmergente('No existe un registro siguiente.', 'info')
  }
  habilitarBotones()
}

//--------------------------------------------------------------------------------------------------
//Función para visualizar el anterior registro de la base de datos.
function anteriorRegistro() {
  if (iId.value != '') {
    anterior = true
    //Registros cuyo Id<que el Id del registro actual ordenados de forma descendente.
    let datosRequeridos = 'where Id<' + iId.value + ' order by Id desc'
    solicitarRegistro(datosRequeridos)
  } else {
    mostrarVentanaEmergente('No existe un registro anterior.', 'info')
  }
  habilitarBotones()
}

//--------------------------------------------------------------------------------------------------
//Iniciliza bGrabar a su estado inicial.
function cambiarNuevo() {
  bGrabar.value = 'Nuevo registro'
  habilitarBotones()
  iId.disabled = false
  grabar = false
}

//--------------------------------------------------------------------------------------------------
//Cambia bGrabar a su estado grabar registro.
function cambiarGrabar() {
  grabar = true
  habilitarBotones()
  limpiarCampos()
}

//--------------------------------------------------------------------------------------------------
//Habilitar botones.
function habilitarBotones() {
  if (!grabar) {
    bGrabar.value = 'Nuevo registro'
  } else {
    bGrabar.value = 'Grabar registro'
  }
  if (hayDatosBD && !grabar) {
    bModificar.disabled = false
  } else {
    bModificar.disabled = true
  }
  if (hayDatosBD && !grabar) {
    bBorrar.disabled = false
  } else {
    bBorrar.disabled = true
  }
  if (hayDatosBD && !grabar) {
    bSiguiente.disabled = false
  } else {
    bSiguiente.disabled = true
  }
  if (hayDatosBD && !grabar) {
    bAnterior.disabled = false
  } else {
    bAnterior.disabled = true
  }
  if (hayDatosBD) {
    bListado.disabled = false
  } else {
    bListado.disabled = true
  }
}

//--------------------------------------------------------------------------------------------------
//Limpia los campos del formulario.
function limpiarCampos() {
  iId.value = ''
  iNIF.value = ''
  iPuestaServicio.value = ''
  iLatitud.value = ''
  iLongitud.value = ''
  iDireccion.value = ''
  borrarMarcadores()
  //No hay registros en la BD y no está grabando.
  if (!hayDatosBD && !grabar) {
    iId.disabled = true
    iNIF.disabled = true
    iPuestaServicio.disabled = true
    iLatitud.disabled = true
    iLongitud.disabled = true
    iDireccion.disabled = true
  } else {
    iId.disabled = false
    iNIF.disabled = false
    iPuestaServicio.disabled = false
    iLatitud.disabled = false
    iLongitud.disabled = false
    iDireccion.disabled = false
  }
}

//--------------------------------------------------------------------------------------------------
//Muestra la consulta en la interfaz.
function mostrarConsulta(datos) {
  console.log(datos)
  let lista = JSON.parse(datos)
  if (lista != null) {
    rellenarCampos(lista[0])
    hayDatosBD = true
    borrado = false
  } else {
    if (!borrado) {
      if (siguiente) {
        mostrarVentanaEmergente('No existe un registro posterior.', 'info')
        siguiente = false
      } else if (anterior) {
        mostrarVentanaEmergente('No existe un registro anterior.', 'info')
        anterior = false
      } else if (!hayDatosBD) {
        limpiarCampos()
        hayDatosBD = false
        mostrarVentanaEmergente(
          'No existen registros en la base de datos.',
          'info',
        )
      }
    } else {
      if (lista == null) {
        limpiarCampos()
        hayDatosBD = false
        mostrarVentanaEmergente(
          'No existen registros en la base de datos.',
          'info',
        )
      }
      borrado = false
    }
  }
}

//--------------------------------------------------------------------------------------------------
//Muestra ventana emergente.
function mostrarVentanaEmergente(mensaje, icono) {
  Swal.fire({
    icon: icono,
    text: mensaje,
    confirmButtonText: 'Aceptar',
  })
}

//--------------------------------------------------------------------------------------------------
//Rellena los campos en la interfaz.
function rellenarCampos(registro) {
  iNIF.value = registro.NIF
  iNombre.value = registro.Nombre
  iApellido1.value = registro.Apellido1
  iApellido2.value = registro.Apellido2
  iDireccion.value = registro.Direccion
  iMail.value = registro.Email
  iTelefono.value = registro.Telefono
  iIban.value = registro.Iban
}

//--------------------------------------------------------------------------------------------------
primerRegistro() //Muestra el primer registro.