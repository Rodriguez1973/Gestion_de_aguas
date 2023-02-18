<?php
/*
Proyecto realizado por: José A. Rodríguez López
Fecha: 13/02/2023
Modificar registro de la base de datos.
*/

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
include('conexionBD.php');

//Recibe una cadena de texto array con los datos.
$cadena = $_POST['Envio'];
//Se decodifican los datos JSON.
$parametros = explode("*%*",$cadena);

//Si hay error en la conexión.
if ($connect->connect_errno) {
    echo "Fallo al conectar a MySQL: (" . $connect->connect_errno . ") " . $connect->connect_error;
//Si no hay error en la conexión.
} else{
    //Consulta de actualización en la base de datos.
    $query = "UPDATE dispositivos SET Medida = $parametros[1] WHERE id = $parametros[0]";

    //Si la consulta se ha realizado correctamente.
	if(mysqli_query($connect,$query)){
        echo "Consumo actualizado.";
	//Si la consulta no se ha realizado correctamente.
    }else{
		echo "Error al actualizar el consumo.";
	}
    $connect->close();
}