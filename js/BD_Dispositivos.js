/*
Proyecto realizado por: José A. Rodríguez López
Fecha: 13/02/2023
*/

//--------------------------------------------------------------------------------------------------
//Solicita un registro a la base de datos.
async function solicitarRegistro(datosRequeridos) {
  //Proporciona una forma fácil de obtener información de una URL sin tener que recargar la página completa. XMLHttpRequest es ampliamente usado en la programación AJAX.
  //A pesar de su nombre, XMLHttpRequest puede ser usado para recibir cualquier tipo de dato, no solo XML, y admite otros formatos además de HTTP (incluyendo file y ftp).
  var ajaxrequest = new XMLHttpRequest()

  ajaxrequest.open(
    'POST',
    'https://www.informaticasc.com/curso22_23/Rodriguez/Gestion_Aguas/php/consultarDispositivos.php',
    true,
  )
  ajaxrequest.setRequestHeader(
    'Content-type',
    'application/x-www-form-urlencoded',
  )
  ajaxrequest.onreadystatechange = async function () {
    //alert(ajaxrequest.readyState + "--" + ajaxrequest.status);
    if (ajaxrequest.readyState === 4 && ajaxrequest.status === 200) {
      let datosLeidos = ajaxrequest.responseText
      if (datosLeidos) {
        mostrarConsulta(datosLeidos)
        habilitarBotones()
      }
    }
  }
  let envio = 'Envio=' + datosRequeridos

  ajaxrequest.setRequestHeader(
    'Content-type',
    'application/x-www-form-urlencoded',
  )
  ajaxrequest.send(envio)
}

//--------------------------------------------------------------------------------------------------
//Función que graba o modifica un registro en la base de datos.
function grabarRegistro(nuevoRegistro) {
  finalizarTareaPeriodica(tareaGeneracionConsumo) //Suspende la generacion de consumos durante el grabado.
  let dispositivo =
    '{"' +
    'NIF' +
    '":' +
    '"' +
    sNIF.value +
    '",' +
    '"' +
    'Puesta_servicio' +
    '":' +
    '"' +
    iPuestaServicio.value +
    '",' +
    '"' +
    'Latitud' +
    '":' +
    '"' +
    iLatitud.value +
    '",' +
    '"' +
    'Longitud' +
    '":' +
    '"' +
    iLongitud.value +
    '",' +
    '"' +
    'Direccion' +
    '":' +
    '"' +
    iDireccion.value +
    '",' +
    '"' +
    'Medida' +
    '":' +
    '"' +
    iMedida.value +
    '"}'


  //Proporciona una forma fácil de obtener información de una URL sin tener que recargar la página completa. XMLHttpRequest es ampliamente usado en la programación AJAX.
  //A pesar de su nombre, XMLHttpRequest puede ser usado para recibir cualquier tipo de dato, no solo XML, y admite otros formatos además de HTTP (incluyendo file y ftp).
  let ajaxrequest = new XMLHttpRequest()

  //Es un nuevo registro.
  if (nuevoRegistro) {
    //Inicializa una solicitud recién creada o reinicializa una existente.
    ajaxrequest.open(
      'POST',
      'https://www.informaticasc.com/curso22_23/Rodriguez/Gestion_Aguas/php/grabarDispositivos.php',
      true,
    )
    //Es una modificación.
  } else {
    //Existe registro a modificar.
    if (iId.value != '') {
      dispositivo =
        '{"' + 'Id' + '":' + '"' + iId.value + '",' + dispositivo.replace('{', '')

      //Inicializa una solicitud recién creada o reinicializa una existente.
      ajaxrequest.open(
        'POST',
        'https://www.informaticasc.com/curso22_23/Rodriguez/Gestion_Aguas/php/modificarDispositivos.php',
        true,
      )
    }
  }

  if (nuevoRegistro || iId.value != '') {
    //Establece el valor encabezado de una solicitud HTTP. Al usarse, debe llamarse después de llamar a open(), pero antes de llamar a send().
    //Si se llama a este método varias veces con el mismo encabezado, los valores se combinan en un único encabezado de solicitud.setRequestHeader()
    ajaxrequest.setRequestHeader(
      'Content-type',
      'application/x-www-form-urlencoded',
    )
    //Cambio de estado a listo,
    ajaxrequest.onreadystatechange = function () {
      //alert(ajaxrequest.readyState + '--' + ajaxrequest.status)
      if (ajaxrequest.readyState === 4 && ajaxrequest.status === 200) {
        let respuesta = ajaxrequest.responseText.split('*/*')
        if (respuesta[0] === 'Registro modificado correctamente.') {
          mostrarVentanaEmergente(respuesta[0], 'success')
        } else if (respuesta[0] === 'Registro grabado correctamente.') {
          iId.value = respuesta[1]
          mostrarVentanaEmergente(respuesta[0], 'success')
        } else {
          mostrarVentanaEmergente(respuesta[0], 'error')
        }
      }
    }

    ajaxrequest.setRequestHeader(
      'Content-type',
      'application/x-www-form-urlencoded',
    )

    //Envía la solicitud al servidor.
    let envio = 'Todo=' + dispositivo
    ajaxrequest.send(envio)
  } else {
    mostrarVentanaEmergente(
      'No hay un registro seleccionado para modificar.',
      'info',
    )
  }
  inicioGeneracionConsumos()  //Inicia la generación de consumos al finalizar la grabación.
}

//--------------------------------------------------------------------------------------------------
//Función que graba o modifica un registro en la base de datos.
function borrarRegistro() {
  finalizarTareaPeriodica(tareaGeneracionConsumo) //Suspende la generacion de consumos durante el borrado.
  if (iId.value != '') {
    //Proporciona una forma fácil de obtener información de una URL sin tener que recargar la página completa. XMLHttpRequest es ampliamente usado en la programación AJAX.
    //A pesar de su nombre, XMLHttpRequest puede ser usado para recibir cualquier tipo de dato, no solo XML, y admite otros formatos además de HTTP (incluyendo file y ftp).
    let ajaxrequest = new XMLHttpRequest()

    //Inicializa una solicitud recién creada o reinicializa una existente.
    ajaxrequest.open(
      'POST',
      'https://www.informaticasc.com/curso22_23/Rodriguez/Gestion_Aguas/php/borrarDispositivos.php',
      true,
    )
    //Cambio de estado a listo,
    ajaxrequest.onreadystatechange = async function () {
      //alert(ajaxrequest.readyState + '--' + ajaxrequest.status)
      if (ajaxrequest.readyState === 4 && ajaxrequest.status === 200) {
        let respuesta = ajaxrequest.responseText
        if (respuesta === 'Registro borrado correctamente.') {
          borrado = true
          primerRegistro()
          mostrarVentanaEmergente(respuesta, 'success')
        } else {
          mostrarVentanaEmergente(respuesta, 'error')
        }
      }
    }

    ajaxrequest.setRequestHeader(
      'Content-type',
      'application/x-www-form-urlencoded',
    )
    //Envía la solicitud al servidor.
    let envio = 'Id=' + iId.value
    ajaxrequest.send(envio)
  } else {
    mostrarVentanaEmergente(
      'No hay un registro seleccionado para borrar.',
      'info',
    )
  }
  inicioGeneracionConsumos()  //Inicia la generación de consumos al finalizar el borrado.
}

//--------------------------------------------------------------------------------------------------
//Lee los NIF de la base de datos.
async function leerNIFs() {
  //Proporciona una forma fácil de obtener información de una URL sin tener que recargar la página completa. XMLHttpRequest es ampliamente usado en la programación AJAX.
  //A pesar de su nombre, XMLHttpRequest puede ser usado para recibir cualquier tipo de dato, no solo XML, y admite otros formatos además de HTTP (incluyendo file y ftp).
  var ajaxrequest = new XMLHttpRequest()

  //Aquí va la ruta al archivo php que realiza la consulta a la base de datos.
  ajaxrequest.open(
    'POST',
    'https://www.informaticasc.com/curso22_23/Rodriguez/Gestion_Aguas/php/consultarClaves.php',
    true,
  )

  ajaxrequest.onreadystatechange = async function () {
    //alert(ajaxrequest.readyState + "--" + ajaxrequest.status);
    if (ajaxrequest.readyState === 4 && ajaxrequest.status === 200) {
      let datosLeidos = ajaxrequest.response
      if (datosLeidos) {
        //console.log(datosLeidos)
        NIFs = JSON.parse(datosLeidos)
        añadirNIFs(JSON.parse(datosLeidos))
      } else {
        NIFs = null
        //alert('No hay registros que cumplan la condición')
      }
    }
  }

  let envio = "Envio=NIF*%*abonados"
  ajaxrequest.setRequestHeader(
    'Content-type',
    'application/x-www-form-urlencoded',
  )
  ajaxrequest.send(envio)
}

