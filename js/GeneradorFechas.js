/*
Proyecto realizado por: José A. Rodríguez López
Fecha: 20/02/2023
*/

let tiempoGeneradorFechas = 5000 //Tiempo en milisegundos del generador de fechas para el cambio de día.
let tareaGeneradorFechas //Tarea temporizada que genera fechas para la simulación.

//--------------------------------------------------------------------------------------------------
//Busqueda de la fecha más alta en la base de datos y si no existe se coge la fecha actual.
function buscarFechaMasAlta() {
    //Proporciona una forma fácil de obtener información de una URL sin tener que recargar la página completa. XMLHttpRequest es ampliamente usado en la programación AJAX.
    //A pesar de su nombre, XMLHttpRequest puede ser usado para recibir cualquier tipo de dato, no solo XML, y admite otros formatos además de HTTP (incluyendo file y ftp).
    var ajaxrequest = new XMLHttpRequest()

    ajaxrequest.open(
        'POST',
        'https://www.informaticasc.com/curso22_23/Rodriguez/Gestion_de_aguas/php/fechaMasAlta.php',
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
            fecha = JSON.parse(datosLeidos)[0].MaxFecha
            if (fecha) {
                procesarFechaMasAlta(fecha, 1)
            } else {
                procesarFechaMasAlta(obtenerFechaActual())
            }
        }
    }
    let envio = 'Envio'

    ajaxrequest.setRequestHeader(
        'Content-type',
        'application/x-www-form-urlencoded',
    )
    ajaxrequest.send(envio)
}

//--------------------------------------------------------------------------------------------------
//Procesa la fecha para asignarlo a las variables globales.
function procesarFechaMasAlta(fecha, incremento = 0) {
    window.sessionStorage.setItem("dia", parseInt(fecha.substring(8)) + incremento)
    window.sessionStorage.setItem("mes", parseInt(fecha.substring(5, 7)))
    window.sessionStorage.setItem("anio", parseInt(fecha.substring(0, 4)))
    actualizarFecha();
}

//--------------------------------------------------------------------------------------------------
//Inicia la tarea periodica que genera las fechas.
function inicioGeneradorFechas() {
    //Ejecuta la función repetidamente cada intervalo indicado en milisegundos.
    tareaGeneradorFechas = setInterval(() => {
        incrementaFecha()
    }, tiempoGeneradorFechas)
}

//--------------------------------------------------------------------------------------------------
function incrementaFecha() {
    window.sessionStorage.setItem("dia", parseInt(window.sessionStorage.getItem("dia")) + 1)
    if (parseInt(window.sessionStorage.getItem("dia")) > 30) {   //Para la simulación se toma que todos los meses tienen 30 días.
        window.sessionStorage.setItem("dia", 1)
        window.sessionStorage.setItem("mes", parseInt(window.sessionStorage.getItem("mes")) + 1)
        if (parseInt(window.sessionStorage.getItem("mes")) > 12) {
            window.sessionStorage.setItem("mes", 1)
            window.sessionStorage.setItem("anio", parseInt(window.sessionStorage.getItem("anio")) + 1)
        }
    }
    actualizarFecha()
}

//--------------------------------------------------------------------------------------------------
//Obtiene la fecha de las variables globales.
function obtenerFecha(dia, mes, anio) {
    if (parseInt(dia) < 10) dia = '0' + dia //Agrega cero si es menor de 10
    if (parseInt(mes) < 10) mes = '0' + mes //Agrega cero si es menor de 10
    return anio + '-' + mes + '-' + dia
}

//--------------------------------------------------------------------------------------------------
//Actualiza la fecha.
function actualizarFecha() {
    document.getElementById('fecha').innerHTML = "Fecha: " + cambiarFormatoFecha(obtenerFecha(window.sessionStorage.getItem("dia"),
            window.sessionStorage.getItem("mes"), window.sessionStorage.getItem("anio")))

}

//--------------------------------------------------------------------------------------------------
//Inicia la tarea temporizadas.
if (!window.sessionStorage.getItem("fechaIniciada")) {
    buscarFechaMasAlta()
    actualizarFecha()
    window.sessionStorage.setItem("fechaIniciada", true)
} else {
    actualizarFecha();
}

//--------------------------------------------------------------------------------------------------
//Ejecución.
inicioGeneradorFechas()