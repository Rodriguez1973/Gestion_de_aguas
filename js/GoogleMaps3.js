let mapa //Referencia del mapa.
let latitud = 41.670141205551865 //Latitud de inicio de centrado del mapa.
let longitud = -3.689933230224045 //Longitud de inicio del centro del mapa.
let coordenadasValidas = true //Flag para controlar si las coordenadas son válidas con el fin de poner el marcador en el mapa.
let marcadores = new Array()

//--------------------------------------------------------------------------------------------------
//Función de inicio. Representa el mapa en el contenedor de la interfaz.
function mostrarMapa() {
  mapa = new google.maps.Map(document.getElementById('map_canvas'), {
    // En el mapa se visualiza el mapa correspondiente a esta latitud, longitud
    center: new google.maps.LatLng(latitud, longitud), //El mapa se visualiza centrado en las coordenadas de latitud y longitud pasadas como argumento
    zoom: 17, //Zoom del mapa
    draggableCursor: 'auto', //El nombre o la URL del cursor que se muestra al desplazar el mouse sobre un mapa arrastrable.
    draggingCursor: 'crosshair', //El nombre o la URL del cursor que se muestra cuando se arrastra el mapa.
    mapTypeId: google.maps.MapTypeId.SATELLITE, //Tipo de mapa.
  })
}

//------------------------------------------------------------------------------------------------
//Referencia a un icono. Define sus propiedades.
let iconoIndividual = {
  url: './images/DispositivoIndividual.png', //Imagen del marcador de posición.
  scaledSize: new google.maps.Size(12, 12), //Tamaño escala.
  origin: new google.maps.Point(0, 0), //Origen imgen.
  anchor: new google.maps.Point(6, 6), //Punto de anclaje
}

//------------------------------------------------------------------------------------------------
//Referencia a un icono. Define sus propiedades.
let iconoMaestro = {
  url: './images/DispositivoIndividual.png', //Imagen del marcador de posición.
  scaledSize: new google.maps.Size(12, 12), //Tamaño escala.
  origin: new google.maps.Point(0, 0), //Origen imgen.
  anchor: new google.maps.Point(6, 6), //Punto de anclaje
}



//--------------------------------------------------------------------------------------------------
// Añadir un marcador de información al mapa.
function añadirMarcadorInformacion(registro) {
  let marcador = null

  marcador = new google.maps.Marker({
    icon: iconoIndividual,
    position: new google.maps.LatLng(parseFloat(registro.Latitud), parseFloat(registro.Longitud)),
    map: mapa,
    hora: obtenerHoraActual(),
    fecha: obtenerFechaActual(),
    Id: registro.Id,
    NIF: registro.NIF,
    Puesta_servicio: registro.Puesta_servicio,
    Direccion: registro.Direccion,
    Medida: registro.Medida,
  })

  //Añade el evento click al marcador.
  google.maps.event.addListener(
    marcador,
    'click',
    function () {
      mostrarInformacionMarcador(marcador)
    },
    false,
  )
  marcadores.push(marcador)
}


//-------------------------------------------------------------------------------------------------
//Muestra la información del marcador.
function mostrarInformacionMarcador(marcador) {
  Swal.fire({
    title: 'DATOS DISPOSITIVO',
    icon: 'info',
    html:
      '<p style="text-align:justify"><b>ID dispositivo: </b>' +
      marcador.Id +
      '</p>' +
      '<p style="text-align:justify"><b>NIF Abonado: </b>' +
      marcador.NIF +
      '</p>' +
      '<p style="text-align:justify"><b>Puesta en servicio: </b>' +
      marcador.Puesta_servicio +
      '<p>' +
      '<p style="text-align:justify"><b>Toma muestra: </b>' +
      marcador.fecha + " " + marcador.hora +
      '</p>' +
      '<p style="text-align:justify"><b>Dirección: </b>' +
      marcador.Direccion +
      '</p>' +
      '<p style="text-align:justify"><b>Medida: </b>' +
      marcador.Medida +
      'm&#179;</p>',
    confirmButtonText: 'Aceptar',
  })
}

//--------------------------------------------------------------------------------------------------
//Leer los registros de los dispositivos de la base de datos.
async function leerDispositivosMapa() {
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
        mostrarDispositivosMapa(JSON.parse(datosLeidos))
      } else {
        mostrarVentanaEmergente('No existen dispositivos de alta en la base de datos.', 'info')
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

//-----------------------------------------------------------------------------------------------
//Muestra los dispositivos en mapa.
function mostrarDispositivosMapa(dispositivos) {
  for (let i = 0; i < dispositivos.length; i++) {
    añadirMarcadorInformacion(dispositivos[i])
  }
}

//--------------------------------------------------------------------------------------------------
//Llamada a la función que muestra el mapa.
mostrarMapa() //Muestra el mapa.
leerDispositivosMapa()