/*
Proyecto realizado por: José A. Rodríguez López
Fecha: 13/02/2023
*/

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

//--------------------------------------------------------------------------------------------------
//Valida los datos del dispositivo IOT.
function validarAbonado(evt) {
  let mensaje = ''
  let validado = true
  //Valida el NIF.
  if (evt.target.id === 'iNIF' || evt.target.id === 'bGrabar') {
    let patron = /(?=^.{1,50}$)[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]+/
    let resultado = patron.test(iNIF.value.trim().toUpperCase())
    if (!resultado) {
      document.getElementById('iNIF').style.color = 'red'
      document.getElementById('iNIF').style.borderColor = 'red'
      validado = false
    } else {
      document.getElementById('iNIF').style.color = 'black'
      document.getElementById('iNIF').style.borderColor = 'black'
    }
  }

  //Valida el Nombre.
  if (evt.target.id === 'iNombre' || evt.target.id === 'bGrabar') {
    let patron = /^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ]+(\s([a-zA-ZñÑáéíóúÁÉÍÓÚüÜ]+))?$"/
    let resultado = patron.test(iNombre.value.trim())
    if (!resultado) {
      mensaje = 'Nombre no válido. Caracteres admitidos: "a-zA-ZñÑáéíóúÁÉÍÓÚüÜ". Nombres compuestos por un máximo de 2 subcadenas separadas por un espacio.'
      document.getElementById('iNombre').style.color = 'red'
      document.getElementById('iNombre').style.borderColor = 'red'
      validado = false
    } else {
      document.getElementById('iNombre').style.color = 'black'
      document.getElementById('iNombre').style.borderColor = 'black'
    }
  }

  //Valida el Apellido1.
  if (evt.target.id === 'iApellido1' || evt.target.id === 'bGrabar') {
    let patron = /^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ]+$"/
    let resultado = patron.test(iApellido1.value.trim())
    if (!resultado) {
      mensaje = 'Primer apellido no válido. Caracteres admitidos: "a-zA-ZñÑáéíóúÁÉÍÓÚüÜ".'
      document.getElementById('iApellido1').style.color = 'red'
      document.getElementById('iApellido1').style.borderColor = 'red'
      validado = false
    } else {
      document.getElementById('iApellido1').style.color = 'black'
      document.getElementById('iApellido1').style.borderColor = 'black'
    }
  }

  //Valida el Apellido2.
  if (evt.target.id === 'iApellido2' || evt.target.id === 'bGrabar') {
    let patron = /^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ]+$"/
    let resultado = patron.test(iApellido2.value.trim())
    if (!resultado) {
      mensaje = 'Segundo apellido no válido. Caracteres admitidos: "a-zA-ZñÑáéíóúÁÉÍÓÚüÜ".'
      document.getElementById('iApellido2').style.color = 'red'
      document.getElementById('iApellido2').style.borderColor = 'red'
      validado = false
    } else {
      document.getElementById('iApellido2').style.color = 'black'
      document.getElementById('iApellido2').style.borderColor = 'black'
    }
  }

  //Valida la Dirección.
  if (evt.target.id === 'iApellido2' || evt.target.id === 'bGrabar') {
    let patron = /^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ]+$"/
    let resultado = patron.test(iApellido2.value.trim())
    if (!resultado) {
      mensaje = 'Segundo apellido no válido. Caracteres admitidos: "a-zA-ZñÑáéíóúÁÉÍÓÚüÜ".'
      document.getElementById('iApellido2').style.color = 'red'
      document.getElementById('iApellido2').style.borderColor = 'red'
      validado = false
    } else {
      document.getElementById('iApellido2').style.color = 'black'
      document.getElementById('iApellido2').style.borderColor = 'black'
    }
  }

  //Valida el e-mail.
  if (evt.target.id === 'iApellido2' || evt.target.id === 'bGrabar') {
    let patron = /^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ]+$"/
    let resultado = patron.test(iApellido2.value.trim())
    if (!resultado) {
      mensaje = 'Segundo apellido no válido. Caracteres admitidos: "a-zA-ZñÑáéíóúÁÉÍÓÚüÜ".'
      document.getElementById('iApellido2').style.color = 'red'
      document.getElementById('iApellido2').style.borderColor = 'red'
      validado = false
    } else {
      document.getElementById('iApellido2').style.color = 'black'
      document.getElementById('iApellido2').style.borderColor = 'black'
    }
  }

  //Valida el teléfono.
  if (evt.target.id === 'iApellido2' || evt.target.id === 'bGrabar') {
    let patron = /^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ]+$"/
    let resultado = patron.test(iApellido2.value.trim())
    if (!resultado) {
      mensaje = 'Segundo apellido no válido. Caracteres admitidos: "a-zA-ZñÑáéíóúÁÉÍÓÚüÜ".'
      document.getElementById('iApellido2').style.color = 'red'
      document.getElementById('iApellido2').style.borderColor = 'red'
      validado = false
    } else {
      document.getElementById('iApellido2').style.color = 'black'
      document.getElementById('iApellido2').style.borderColor = 'black'
    }
  }

  //Valida la Iban.
  if (evt.target.id === 'iApellido2' || evt.target.id === 'bGrabar') {
    let patron = /^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ]+$"/
    let resultado = patron.test(iApellido2.value.trim())
    if (!resultado) {
      mensaje = 'Segundo apellido no válido. Caracteres admitidos: "a-zA-ZñÑáéíóúÁÉÍÓÚüÜ".'
      document.getElementById('iApellido2').style.color = 'red'
      document.getElementById('iApellido2').style.borderColor = 'red'
      validado = false
    } else {
      document.getElementById('iApellido2').style.color = 'black'
      document.getElementById('iApellido2').style.borderColor = 'black'
    }
  }

  //Muestra mensaje si no está validado.
  if (!validado) {
    mostrarVentanaEmergente(mensaje, 'error')
  }
  return validado
}
