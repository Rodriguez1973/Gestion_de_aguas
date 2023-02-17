<?php
/*
Proyecto realizado por: José A. Rodríguez López
Fecha: 13/02/2023
Modificar registro de la base de datos.
*/

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
include('conexionBD.php');

//Recibe el array con los datos JSON.
$contenido = $_POST['Todo'];
//Acondicionamiento de la cadena para ser tratada.
$contenido= str_replace("\\","", $contenido);
//Se decodifican los datos JSON.
$array = json_decode($contenido, true);
//Extracción de los datos.
$tmpArray = array();
foreach ($array as $dato){
	$tmpArray[]=$dato;
}
//Si hay error en la conexión.
if ($connect->connect_errno) {
    echo "Fallo al conectar a MySQL: (" . $connect->connect_errno . ") " . $connect->connect_error;
//Si no hay error en la conexión.
} else{
    //Consulta de actualización en la base de datos.
    $query = "UPDATE dispositivos SET
    NIF = '$tmpArray[1]', 
    Puesta_servicio = '$tmpArray[2]', 
    Latitud = '$tmpArray[3]', 
    Longitud = '$tmpArray[4]',
    Direccion = '$tmpArray[5]',
    Medida = '$tmpArray[6]'
    WHERE Id = '$tmpArray[0]'";

    //Si la consulta se ha realizado correctamente.
	if(mysqli_query($connect,$query)){
       	echo "Registro modificado correctamente.";
	//Si la consulta no se ha realizado correctamente.
    }else{
		echo "Error al modificar el registro.";
	}
    $connect->close();
}