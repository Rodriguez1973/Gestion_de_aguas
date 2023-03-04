/*
Proyecto realizado por: José A. Rodríguez López
Fecha: 13/02/2023
*/
let grabar = false //Flag que controla si bGrabar ha cambiado a grabar.
let borrado = false //Flag que controla si se ha borrado un registro.
let siguiente = false //Flag que controla si el flujo va al registro siguiente.
let anterior = false //Flag que controla si el flujo va al registro anterior.
let hayDatosBD = false //Flag que controla si se han leído datos en una consulta.
let dispositivosIOT = null //Dispositivos IOT.
let NIFs = null //NIFs de los abonados.

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
const bConsumos = document.getElementById('bConsumos');
const iId = document.getElementById('iId')
const sNIF = document.getElementById('sNIF')
const iPuestaServicio = document.getElementById('iPuestaServicio')
const iLatitud = document.getElementById('iLatitud')
const iLongitud = document.getElementById('iLongitud')
const iDireccion = document.getElementById('iDireccion')
const iMedida = document.getElementById('iMedida')

//--------------------------------------------------------------------------------------------------
//Definición de eventos de los objetos.
bGrabar.addEventListener('click', nuevoRegistro, false) //Evento click sobre el botón Grabar datos.
bModificar.addEventListener(
  'click',
  function (evt) {
    if (validarDispositivo(evt)) {
      grabarRegistro(false)
    }
  },
  false
) //Evento click sobre el botón Modificar registro.
bConsumos.addEventListener(
  'click', 
  function () {
    window.sessionStorage.setItem("idDispositivo", iId.value) //Guarda el idDispositivo en el Session Storage.
    window.location.href="consumos.html" //Cambia a la página "consumos.html".
  },
  false) //Evento click sobre el botón Consumos.
bBorrar.addEventListener('click', borrarRegistro, false) //Evento click sobre el botón Borrar registro.
bPrimero.addEventListener('click', primerRegistro, false) //Evento click sobre el botón Visualizar Primero.
bUltimo.addEventListener('click', ultimoRegistro, false) //Evento click sobre el botón Visualizar último.
bSiguiente.addEventListener('click', siguienteRegistro, false) //Evento click sobre el botón Siguiente registro.
bAnterior.addEventListener('click', anteriorRegistro, false) //Evento click sobre el botón Anterior registro.

//--------------------------------------------------------------------------------------------------
//Crea un nuevo registro.
function nuevoRegistro(evt) {
  //Hay abonados.
  if (NIFs) {
    borrarMarcadores()
    if (!grabar) {
      limpiarCampos()
      cambiarGrabar()
    } else {
      //Grabando.
      if (validarDispositivo(evt)) {
        grabarRegistro(true)
        cambiarNuevo()
        grabar = false
        hayDatosBD = true
        habilitarBotones()
        marcador = new google.maps.Marker({
          icon: iconoIndividual,
          position: new google.maps.LatLng(iLatitud.value, iLongitud.value),
          map: mapa,
        })
        marcadores.push(marcador)
      }
    }
  } else {
    mostrarVentanaEmergente('No hay abonados dados de alta en el sistema.', 'info')
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
  if (hayDatosBD && !grabar) {
    bConsumos.disabled = false
  } else {
    bConsumos.disabled = true
  }
}

//--------------------------------------------------------------------------------------------------
//Limpia los campos del formulario.
function limpiarCampos() {
  iId.value = ""
  sNIF.value = ""
  iPuestaServicio.value = ""
  iLatitud.value = ""
  iLongitud.value = ""
  iDireccion.value = ""
  iMedida.value = ""
  borrarMarcadores()
  //No hay registros en la BD y no está grabando.
  if (!hayDatosBD && !grabar) {
    iId.disabled = true
    sNIF.disabled = true
    iPuestaServicio.disabled = true
    iLatitud.disabled = true
    iLongitud.disabled = true
    iDireccion.disabled = true
    iMedida.disabled = true
  } else {
    sNIF.disabled = false
    iPuestaServicio.disabled = false
    iLatitud.disabled = false
    iLongitud.disabled = false
    iDireccion.disabled = false
    iMedida.disabled = false
    iMedida.value = 0
  }
}

//--------------------------------------------------------------------------------------------------
//Muestra la consulta en la interfaz.
function mostrarConsulta(datos) {
  //console.log(datos)
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
        finalizarTareaPeriodica(tareaGeneracionConsumo) //Suspende la generacion de consumos durante el borrado.
        hayDatosBD = false
        mostrarVentanaEmergente(
          'No existen registros en la base de datos.',
          'info',
        )
      }
    } else {
      if (lista == null) {
        limpiarCampos()
        finalizarTareaPeriodica(tareaGeneracionConsumo) //Suspende la generacion de consumos durante el borrado.
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
//Rellena los campos en la interfaz.
function rellenarCampos(registro) {
  iId.value = registro.Id
  sNIF.value = registro.NIF
  iPuestaServicio.value = registro.Puesta_servicio
  iLatitud.value = registro.Latitud
  iLongitud.value = registro.Longitud
  iDireccion.value = registro.Direccion
  iMedida.value = registro.Medida
  let posicionMapa = new google.maps.LatLng(parseFloat(registro.Latitud), parseFloat(registro.Longitud))
  mapa.setCenter(posicionMapa)
  añadirMarcador(registro)
}

//--------------------------------------------------------------------------------------------------
//Inicio de ejecución.
leerNIFs() //Lee los NIFs y los añade a la select.
primerRegistro() //Muestra el primer registro.