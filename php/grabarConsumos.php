<?php
/*
Proyecto realizado por: José A. Rodríguez López
Fecha: 13/02/2023
Grabar registro en la base de datos.
*/

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
include('conexionBD.php');
//Recibe el array con los datos JSON.
$contenido = $_POST['Todo'];
//Acondicionamiento de la cadena para ser tratada.
$contenido = str_replace("\\", "", $contenido);
//Se decodifican los datos JSON.
$array = json_decode($contenido, true);
//Extracción de los datos.
$tmpArray = array();

foreach ($array as $dato) {
	$tmpArray[] = $dato;
}

//Si hay error en la conexión.
if ($connect->connect_errno) {
	echo "Fallo al conectar a MySQL: (" . $connect->connect_errno . ") " . $connect->connect_error;
	//Si no hay error en la conexión.
} else {
	if ($tmpArray[0] != "") {
		//Consulta de inserción en la base de datos.
		$query = "insert into consumos(IdDispositivo,Fecha_medida,Medida,Precio) VALUES ('$tmpArray[0]','$tmpArray[1]','$tmpArray[2]',$tmpArray[3])";
		//Si la consulta se ha realizado correctamente.
		if (mysqli_query($connect, $query)) {
			echo "Registro grabado correctamente.";
		//Si la consulta no se ha realizado correctamente.
		} else {
			echo "Error en la grabación de los consumos.";
		}
	}
	$connect->close();
}
?>