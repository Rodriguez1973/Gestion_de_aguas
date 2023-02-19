/*
Proyecto realizado por: José A. Rodríguez López
Fecha: 18/02/2023
*/

const PRECIO_METRO_CUBICO = 3.5 //Constante que define el importe facturado por cada metro cubico de agua.
let facturado = false //Flag que indica si se ha producido la facturación.
let tiempoFacturacion = 10000 //Tiempo en milisegundos de la tarea proramada facturarConsumo. 20 minutos.
let tareaFacturacion //Tarea temporizada que genera la facturación.
let arrayIdDispositivos = null  //Array de dispositivos.

//--------------------------------------------------------------------------------------------------
//Inicia la tarea periodica que recopila las medidas para la facturación.
function inicioFacturacionMedidas() {
    //Ejecuta la función repetidamente cada intervalo indicado en milisegundos.
    tareaFacturacion = setInterval(() => {
        leerMedidasDispositivos(); //Lee el ID de los dispositivos
    }, tiempoFacturacion)
}

//--------------------------------------------------------------------------------------------------
//Leer los registros de los dispositivos de la base de datos.
async function leerMedidasDispositivos() {
    //Proporciona una forma fácil de obtener información de una URL sin tener que recargar la página completa. XMLHttpRequest es ampliamente usado en la programación AJAX.
    //A pesar de su nombre, XMLHttpRequest puede ser usado para recibir cualquier tipo de dato, no solo XML, y admite otros formatos además de HTTP (incluyendo file y ftp).
    var ajaxrequest = new XMLHttpRequest()

    ajaxrequest.open(
        'POST',
        'https://www.informaticasc.com/curso22_23/Rodriguez/Gestion_Aguas/php/consultarDatosDispositivos.php',
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
                facturacion(JSON.parse(datosLeidos))
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
//Recorre todos los dispositivos tomando sus medidas para guardarlos en la tabla de consumos.
function facturacion(dispositivos) {
    //Si hay dispositivos y no ha sido ya facturado el consumo.
    if (dispositivos && !facturado) {
        arrayIdDispositivos = []
        for (let i = 0; i < dispositivos.length; i++) {
            grabarMedidas(dispositivos[i].Id, obtenerFechaActual(), dispositivos[i].Medida, PRECIO_METRO_CUBICO)
            arrayIdDispositivos.push(dispositivos[i].id)
        }
        facturado = true;
    }
}

//--------------------------------------------------------------------------------------------------
//Función que actualiza la medida de un dispositivo.
function grabarMedidas(IdDispositivo, fecha, medida, precio) {
    let consumo =
        '{"' +
        'IdDispositivo' +
        '":' +
        '"' +
        IdDispositivo +
        '",' +
        '"' +
        'Fecha_medida' +
        '":' +
        '"' +
        fecha +
        '",' +
        '"' +
        'Medida' +
        '":' +
        '"' +
        medida +
        '",' +
        '"' +
        'Precio' +
        '":' +
        '"' +
        precio +
        '"}'


    //Proporciona una forma fácil de obtener información de una URL sin tener que recargar la página completa. XMLHttpRequest es ampliamente usado en la programación AJAX.
    //A pesar de su nombre, XMLHttpRequest puede ser usado para recibir cualquier tipo de dato, no solo XML, y admite otros formatos además de HTTP (incluyendo file y ftp).
    let ajaxrequest = new XMLHttpRequest()

    //Inicializa una solicitud recién creada o reinicializa una existente.
    ajaxrequest.open(
        'POST',
        'https://www.informaticasc.com/curso22_23/Rodriguez/Gestion_Aguas/php/grabarConsumos.php',
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
            let respuesta = ajaxrequest.responseText;
            if (respuesta === "Registro grabado correctamente.") {
                enviarCorreoConsumo(IdDispositivo)
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
    let envio = 'Todo=' + consumo
    ajaxrequest.send(envio)
}


//--------------------------------------------------------------------------------------------------
//Envia el correo de consumo al abonado.
function enviarCorreoConsumo(IdDispositivo) {
    //Proporciona una forma fácil de obtener información de una URL sin tener que recargar la página completa. XMLHttpRequest es ampliamente usado en la programación AJAX.
    //A pesar de su nombre, XMLHttpRequest puede ser usado para recibir cualquier tipo de dato, no solo XML, y admite otros formatos además de HTTP (incluyendo file y ftp).
    let ajaxrequest = new XMLHttpRequest()

    //Inicializa una solicitud recién creada o reinicializa una existente.
    ajaxrequest.open(
        'POST',
        'https://www.informaticasc.com/curso22_23/Rodriguez/Gestion_Aguas/php/consultarDatosCorreo.php',
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
            let datosLeidos = ajaxrequest.responseText;
            if (datosLeidos) {
                procesaCorreo(datosLeidos)
            } else {
                mostrarVentanaEmergente('Error en la lectura de datos para el envio del correo.', 'error')
            }
        }
    }

    ajaxrequest.setRequestHeader(
        'Content-type',
        'application/x-www-form-urlencoded',
    )

    //Envía la solicitud al servidor.
    let envio = 'Envio=' + IdDispositivo
    ajaxrequest.send(envio)
}

//--------------------------------------------------------------------------------------------------
//Procesa los datos y realiza el envio del correo con la cantidad a facturar.
function procesaCorreo(datosLeidos) {
    let datos = JSON.parse(datosLeidos)
    let consumo = 0;
    if (datos.length == 1) {
        consumo = datos[0].Medida;
    } else {
        consumo = datos[0].Medida - datos[1].Medida;
    }

    //Datos del correo electrónico.
    let datosCorreo =
    '{"' +
    'NIF' +
    '":' +
    '"' +
    datos[0].NIF +
    '",' +
    '"' +
    'Nombre' +
    '":' +
    '"' +
    datos[0].Nombre + " " + datos[0].Apellido1 +" " + datos[0].Apellido2 +
    '",' +
    '"' +
    'Email' +
    '":' +
    '"' +
    datos[0].Email+
    '",' +
    '"' +
    'Direccion' +
    '":' +
    '"' +
    datos[0].Direccion +
    '",' +
    '"' +
    'Fecha' +
    '":' +
    '"' +
    datos[0].Fecha_medida +
    '",' +
    '"' +
    'Consumo' +
    '":' +
    '"' +
    consumo +
    '",' +
    '"' +
    'Precio' +
    '":' +
    '"' +
    datos[0].Precio +
    '"}'
    
    console.log(datosCorreo)

    enviarEmail(datosCorreo)
}

//--------------------------------------------------------------------------------------------------
//Inicia la tarea temporizada de facturación.
inicioFacturacionMedidas()