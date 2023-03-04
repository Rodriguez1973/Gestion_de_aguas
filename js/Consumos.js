/*
Proyecto realizado por: José A. Rodríguez López
Fecha: 04/03/2023
*/

//-------------------------------------------------------------------------------------------------
//Referencias de los objetos del documento.
const iId = document.getElementById('iId')
const iNIF = document.getElementById('iNIF')
const iNombre = document.getElementById('iNombre')
const iDireccion = document.getElementById('iDireccion')
const contenedorTabla = document.getElementById('contenedorTabla')

//-------------------------------------------------------------------------------------------------
//Leer los datos del dispositivo y los consumos.
async function leerDatosYConsumosDispositivo() {
    let formData = new FormData();
    formData.append('idDispositivo', window.sessionStorage.getItem("idDispositivo"))

    fetch('https://www.informaticasc.com/curso22_23/Rodriguez/Gestion_de_aguas/php/consultarDatosYConsumos.php', {
        method: 'POST',
        body: formData,
    }).then(resp => {
        return resp.json()
    }).then(json => {
        if (json) {
            procesarDatosDispositivo(json)
        } else {
            mostrarVentanaEmergente('No existen consumos registrados para este dispositivo.', 'info')
        }
    }).catch(err => {
        console.log("ERROR :" + err);
    });
}

//-------------------------------------------------------------------------------------------------
//Procesa los datos del dispositivo.
function procesarDatosDispositivo(datos) {
    if (datos.length > 0) {
        iId.value = datos[0]['idDispositivo'];
        iNIF.value = datos[0]['nif'];
        iNombre.value = datos[0]['nombre'] + " " + datos[0]['apellido1'] + " " + datos[0]['apellido2']
        iDireccion.value = datos[0]['direccion']
        mostrarTablaConsumos(datos)
    }
}

//-------------------------------------------------------------------------------------------------
//Función que muestra la tabla con os consumos del dispositivo.
function mostrarTablaConsumos(datos) {
    contenedorTabla.innerHTML = '' //Borra la tabla.
    let tabla = document.createElement('table') //Crea la tabla.
    contenedorTabla.append(tabla) //Se añade al contenedor de la tabla.
    let thead = document.createElement('thead') //Se crea encabezado
    tabla.appendChild(thead) //Se añade al cuerpo de la tabla.
    let trEncabezado = document.createElement('tr') //Se crea una fila.
    thead.appendChild(trEncabezado) //Se añade la fila al thead.
    //Se crean los los th.
    th = document.createElement('th')
    th.innerText = 'Fecha'
    trEncabezado.appendChild(th)
    th = document.createElement('th')
    th.innerText = 'Lectura'
    trEncabezado.appendChild(th)
    th = document.createElement('th')
    th.innerText = 'Consumo'
    trEncabezado.appendChild(th)
    th = document.createElement('th')
    th.innerText = 'Precio'
    trEncabezado.appendChild(th)
    th = document.createElement('th')
    th.innerText = 'Importe'
    trEncabezado.appendChild(th)

    //Crea el tbody y lo añade a la tabla.
    let tbody = document.createElement('tbody')
    tabla.appendChild(tbody)
    //Bucle que genera las filas del cuerpo de la tabla.
    for (let i = 0; i < datos.length; i++) {
        let tr = document.createElement('tr')
        tbody.appendChild(tr)
        //Fecha.
        let celda = document.createElement('td') //Crea la celda
        tr.appendChild(celda) //Añade la celda a la fila.
        celda.innerText = cambiarFormatoFecha(datos[i]['fecha'])
        //Medida.
        celda = document.createElement('td') //Crea la celda
        tr.appendChild(celda) //Añade la celda a la fila.
        celda.innerText = datos[i]['medida']+"m³"
        //Consumo.
        celda = document.createElement('td') //Crea la celda
        tr.appendChild(celda) //Añade la celda a la fila.
        if (i < datos.length - 1) {
            $consumo = Math.round((parseFloat(datos[i]['medida']) - parseFloat(datos[i + 1]['medida'])) * 100) / 100
        } else {
            $consumo = Math.round(parseFloat(datos[i]['medida']) * 100) / 100
        }
        celda.innerText = $consumo + "m³"
        //Precio.
        celda = document.createElement('td') //Crea la celda
        tr.appendChild(celda) //Añade la celda a la fila.
        celda.innerText = datos[i]['precio'] + "€";
        //Importe.
        celda = document.createElement('td') //Crea la celda
        tr.appendChild(celda) //Añade la celda a la fila.
        celda.innerText = Math.round($consumo * parseFloat(datos[i]['precio']) * 100) / 100 + "€";
    }
}

//-------------------------------------------------------------------------------------------------
//Ejecución.
leerDatosYConsumosDispositivo()
