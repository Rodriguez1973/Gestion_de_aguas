<?php
/*
Proyecto realizado por: José A. Rodríguez López
Fecha: 13/02/2022
Borrar registro de la base de datos.
*/

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
include('conexionBD.php');

//Recibe el array con los datos JSON.
$Id = $_POST['Id'];
//Si hay error en la conexión.
if ($connect->connect_errno) {
    echo "Fallo al conectar a MySQL: (" . $connect->connect_errno . ") " . $connect->connect_error;
//Si no hay error en la conexión.
} else {
    //Consulta de actualización en la base de datos.
    $query = "DELETE FROM dispositivos WHERE Id ='". $Id."'";

    //Si la consulta se ha realizado correctamente.
	if(mysqli_query($connect,$query)){
       	echo "Registro borrado correctamente.";
	//Si la consulta no se ha realizado correctamente.
    }else{
		echo "Error al borrar el registro.";
	}
    $connect->close();
}