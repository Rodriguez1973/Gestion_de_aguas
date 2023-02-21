/*
Proyecto realizado por: José A. Rodríguez López
Fecha: 18/02/2023
*/

let intervaloTiempo = 10000 //Tiempo en milisegundos de la tarea programada.
let tareaGeneracionConsumo //Tarea temporizada que genera el consumo de los caudalímetros aleatoriamente.

//--------------------------------------------------------------------------------------------------
//Inicia la tarea periodica que genera los consumos de los dispositivos.
function inicioGeneracionConsumos() {
    //Ejecuta la función repetidamente cada intervalo indicado en milisegundos.
    tareaGeneracionConsumo = setInterval(() => {
        leerDispositivos(); //Lee el ID de los dispositivos
    }, intervaloTiempo)
}

//--------------------------------------------------------------------------------------------------
//Función que genera los consumos aleatoriamente y los almacena en la base de datos.
function generarConsumo(dispositivos) {
    if (dispositivos) {
        for (let i = 0; i < dispositivos.length; i++) {
            //console.log(dispositivos[i].Id+"--"+(parseFloat(dispositivos[i].Medida)+Math.random()*10/100))
            actualizarConsumo(dispositivos[i].Id, (parseFloat(dispositivos[i].Medida) + Math.random() * 10 / 100))
        }
    }
}

//--------------------------------------------------------------------------------------------------
//Finalizar tarea periódica.
function finalizarTareaPeriodica(tarea) {
    clearInterval(tarea)
    iniciadoGeneradorFechas=false;
}

//--------------------------------------------------------------------------------------------------
//Leer los registros de los dispositivos de la base de datos.
async function leerDispositivos() {
    //Proporciona una forma fácil de obtener información de una URL sin tener que recargar la página completa. XMLHttpRequest es ampliamente usado en la programación AJAX.
    //A pesar de su nombre, XMLHttpRequest puede ser usado para recibir cualquier tipo de dato, no solo XML, y admite otros formatos además de HTTP (incluyendo file y ftp).
    var ajaxrequest = new XMLHttpRequest()

    ajaxrequest.open(
        'POST',
        'https://www.informaticasc.com/curso22_23/Rodriguez/Gestion_de_aguas/php/consultarDatosDispositivos.php',
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
                generarConsumo(JSON.parse(datosLeidos))
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
//Función que actualiza la medida de un dispositivo.
function actualizarConsumo(id, medida) {
    //Proporciona una forma fácil de obtener información de una URL sin tener que recargar la página completa. XMLHttpRequest es ampliamente usado en la programación AJAX.
    //A pesar de su nombre, XMLHttpRequest puede ser usado para recibir cualquier tipo de dato, no solo XML, y admite otros formatos además de HTTP (incluyendo file y ftp).
    let ajaxrequest = new XMLHttpRequest()

    //Inicializa una solicitud recién creada o reinicializa una existente.
    ajaxrequest.open(
        'POST',
        'https://www.informaticasc.com/curso22_23/Rodriguez/Gestion_de_aguas/php/actualizaConsumo.php',
        true,
    )

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
            let respuesta = ajaxrequest.responseText
            if (respuesta === "Error al actualizar el consumo.") {
                mostrarVentanaEmergente(respuesta, 'error')
            }
        }
    }

    ajaxrequest.setRequestHeader(
        'Content-type',
        'application/x-www-form-urlencoded',
    )

    //Envía la solicitud al servidor.
    let envio = "Envio=" + id + "*%*" + medida
    ajaxrequest.send(envio)
}

//--------------------------------------------------------------------------------------------------
//Inicia la tarea temporizada de generar caudales.
inicioGeneracionConsumos();