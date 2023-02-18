/*
Proyecto realizado por: José A. Rodríguez López
Fecha: 13/02/2023
*/

let intervaloTiempo=10000 //Tiempo en milisegundos de la tarea programada. 5minuto.
let tareaTemporizada //Tarea temporizada.

//-------------------------------------------------------------------------------------------------
//Capitalize.
function capitalize(cadena) {
  cadena = cadena.toLowerCase()
  const palabras = cadena.split(' ')

  for (let i = 0; i < palabras.length; i++) {
    palabras[i] = palabras[i][0].toUpperCase() + palabras[i].substr(1)
  }
  cadena = ''
  for (let i = 0; i < palabras.length; i++) {
    cadena += palabras[i] + ' '
  }
  return cadena.trim()
}

//-------------------------------------------------------------------------------------------------
//Obtiene la fecha actual.
function obtenerFechaActual() {
  let fecha = new Date() //Fecha actual
  let mes = fecha.getMonth() + 1 //Obtiene el mes
  let dia = fecha.getDate() //Obtiene el día.
  let anio = fecha.getFullYear() //Obtiene el año.
  if (dia < 10) dia = '0' + dia //Agrega cero si es menor de 10
  if (mes < 10) mes = '0' + mes //Agrega cero si es menor de 10
  return anio + '-' + mes + '-' + dia
}

//-------------------------------------------------------------------------------------------------
//Obtiene la fecha actual.
function obtenerHoraActual() {
  let fecha = new Date() //Fecha actual.
  let hora = fecha.getHours() //Obtiene la hora.
  let minutos = fecha.getMinutes() //Obtiene los minutos.
  let segundos = fecha.getSeconds() //Obtiene los segundos.
  if (hora < 10) hora = '0' + hora //Agrega cero si es menor de 10
  if (minutos < 10) minutos = '0' + minutos //Agrega cero si es menor de 10
  if (segundos < 10) segundos = '0' + segundos //Agrega cero si es menor de 10
  return hora + ':' + minutos + ':' + segundos
}

//-------------------------------------------------------------------------------------------------
//Validar NIF.
function validarNIF(NIF) {
  let letrasNIF = [
    'T',
    'R',
    'W',
    'A',
    'G',
    'M',
    'Y',
    'F',
    'P',
    'D',
    'X',
    'B',
    'N',
    'J',
    'Z',
    'S',
    'Q',
    'V',
    'H',
    'L',
    'C',
    'K',
    'E',
  ]
  let letra = NIF.toUpperCase().substring(8)
  let numero = parseInt(NIF.substring(0, 8))
  return letrasNIF[numero % 23] === letra
}

//--------------------------------------------------------------------------------------------------
//Valida los datos del abonado.
function validarAbonado(evt) {
  let mensaje = ''
  let validado = true

  //Valida el NIF.
  if (
    (evt.target.id === 'iNIF' ||
      evt.target.id === 'bGrabar' ||
      evt.target.id === 'bModificar') &&
    validado
  ) {
    let patron = /^[0-9]{8}[A-Z]{1}$/
    let NIF = iNIF.value.trim().toUpperCase()
    let resultado = patron.test(NIF)
    if (!resultado || !validarNIF(NIF)) {
      mensaje = 'NIF no válido.'
      validado = false
    }
  }

  //Valida el Nombre.
  if (
    (evt.target.id === 'iNombre' ||
      evt.target.id === 'bGrabar' ||
      evt.target.id === 'bModificar') &&
    validado
  ) {
    let patron = /^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ]+(\s([a-zA-ZñÑáéíóúÁÉÍÓÚüÜ]+))?$/
    let resultado = patron.test(iNombre.value.trim())
    if (!resultado) {
      mensaje =
        'Nombre no válido. Caracteres admitidos: "a-zA-ZñÑáéíóúÁÉÍÓÚüÜ". Nombres compuestos por un máximo de 2 subcadenas separadas por un espacio.'
      validado = false
    }
  }

  //Valida el Apellido1.
  if (
    (evt.target.id === 'iApellido1' ||
      evt.target.id === 'bGrabar' ||
      evt.target.id === 'bModificar') &&
    validado
  ) {
    let patron = /^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ]+$/
    let resultado = patron.test(iApellido1.value.trim())
    if (!resultado) {
      mensaje =
        'Primer apellido no válido. Caracteres admitidos: "a-zA-ZñÑáéíóúÁÉÍÓÚüÜ".'
      validado = false
    }
  }

  //Valida el Apellido2.
  if (
    (evt.target.id === 'iApellido2' ||
      evt.target.id === 'bGrabar' ||
      evt.target.id === 'bModificar') &&
    validado
  ) {
    let patron = /^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ]+$/
    let resultado = patron.test(iApellido2.value.trim())
    if (!resultado) {
      mensaje =
        'Segundo apellido no válido. Caracteres admitidos: "a-zA-ZñÑáéíóúÁÉÍÓÚüÜ".'
      validado = false
    }
  }

  //Valida la Dirección.
  if (
    (evt.target.id === 'iDireccion' ||
      evt.target.id === 'bGrabar' ||
      evt.target.id === 'bModificar') &&
    validado
  ) {
    let resultado = iDireccion.value.trim()
    if (resultado === '') {
      mensaje = 'La dirección no puede estar vacía.'
      validado = false
    }
  }

  //Valida el e-mail.
  if (
    (evt.target.id === 'iMail' ||
      evt.target.id === 'bGrabar' ||
      evt.target.id === 'bModificar') &&
    validado
  ) {
    let patron = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
    let resultado = patron.test(iMail.value.trim())
    if (!resultado) {
      mensaje = 'La dirección de correo electrónico no es válida.'
      validado = false
    }
  }

  //Valida el teléfono.
  if (
    (evt.target.id === 'iTelefono' ||
      evt.target.id === 'bGrabar' ||
      evt.target.id === 'bModificar') &&
    validado
  ) {
    let patron = /^(\+34|0034|34)?[6789]\d{8}$/
    let resultado = patron.test(iTelefono.value.trim())
    if (!resultado) {
      mensaje = 'El teléfono introducido no es válido.'
      validado = false
    }
  }

  //Valida la Iban.
  if (
    (evt.target.id === 'iIban' ||
      evt.target.id === 'bGrabar' ||
      evt.target.id === 'bModificar') &&
    validado
  ) {
    let patron = /^[a-zA-Z]{2}(\d{22})$/
    let resultado = patron.test(iIban.value.trim().toUpperCase())
    if (!resultado) {
      mensaje = 'El IBAN no es válido.'
      validado = false
    }
  }

  //Muestra mensaje si no está validado.
  if (!validado) {
    mostrarVentanaEmergente(mensaje, 'error')
  }
  return validado
}

//--------------------------------------------------------------------------------------------------
//Valida los datos del dispositivo.
function validarDispositivo(evt) {
  let mensaje = ''
  let validado = true

  //Valida el NIF.
  if ((evt.target.id === 'bGrabar' || evt.target.id === 'bModificar') && validado) {
    if (sNIF.value == "") {
      mensaje = 'NIF del abonado no asignado.'
      validado = false
    }
  }

  //Valida la puesta en servicio.
  if ((evt.target.id === 'bGrabar' || evt.target.id === 'bModificar') && validado) {
    let patron = /^[0-9]{4}[-][0-9]{2}[-][0-9]{2}$/
    var resultado = patron.test(iPuestaServicio.value.trim())

    if (!resultado) {
      mensaje = 'La fecha introducida no es válida.'
      validado = false
    } else {
      //Procesa fecha para comprobar que es menor o igual a la actual.
      let fecha = iPuestaServicio.value.replaceAll('-', '')
      let fechaActual=obtenerFechaActual().replaceAll('-', '')
      if (fecha > fechaActual) {
        mensaje = 'La fecha no puede ser posterior a la actual.'
        validado = false
      }else if(fecha<20200101){
        mensaje = 'La fecha no puede ser anterior al 1 de enero del 2020.'
        validado = false
      }

    }
  }

  //Valida la posición del dispositivo.
  if ((evt.target.id === 'bGrabar' || evt.target.id === 'bModificar') && validado) {
    if (iLatitud.value == "" || iLongitud.value == "" || iDireccion == "") {
      mensaje = 'La ubicación del dispositivo no ha sido introducida en el mapa.'
      validado = false
    }
  }

  //Valida la medida del dispositivo.
  if ((evt.target.id === 'bGrabar' || evt.target.id === 'bModificar') && validado) {
    if (!iMedida.value){
      mensaje = 'No se ha introducidos la medida del dispositivo.'
      validado = false
    }else if(iMedida.value < 0 ) {
      mensaje = 'La medida del dispositivo no puede ser negativa.'
      validado = false
    }
  }

  //Muestra mensaje si no está validado.
  if (!validado) {
    mostrarVentanaEmergente(mensaje, 'error')
  }
  return validado
}

//--------------------------------------------------------------------------------------------------
//Añade los nifs a la select de los NIF.
function añadirNIFs(datosLeidos) {
  if (datosLeidos) {
    for (let i = 0; i < datosLeidos.length; i++) {
      let opcion = document.createElement('option')
      opcion.value = datosLeidos[i].NIF
      opcion.text = datosLeidos[i].NIF
      sNIF.appendChild(opcion)
    }
  }
}

//--------------------------------------------------------------------------------------------------
//Iniciar tarea temporizada.
function iniciarTareaTemporizada(){
  //Ejecuta la función repetidamente cada intervalo indicado en milisegundos.
  tareaTemporizada = setInterval(() => {
    leerDispositivos(); //Lee el ID de los dispositivos
  }, intervaloTiempo)
}

//--------------------------------------------------------------------------------------------------
//Función que genera los consumos aleatoriamente y los almacena en la base de datos.
function generarConsumo(dispositivos){
  if (dispositivos) {
    for (let i = 0; i < dispositivos.length; i++) {
      //console.log(dispositivos[i].Id+"--"+(parseFloat(dispositivos[i].Medida)+Math.random()*10/100))
      actualizarConsumo(dispositivos[i].Id,(parseFloat(dispositivos[i].Medida)+Math.random()*10/100))
    }
  }
}

//--------------------------------------------------------------------------------------------------
//Inicia la tarea temporizada de generar caudales.
iniciarTareaTemporizada();