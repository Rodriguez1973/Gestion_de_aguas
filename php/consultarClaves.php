<?php
/*
Proyecto realizado por: José A. Rodríguez López
Fecha: 10/12/2022
Petición de registros a la base de datos.
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
} else {
    //Consulta a realizar a la base de datos.
    $sql = "select " . $parametros[0] . " from " .$parametros[1] . ";";
    //Realiza la consulta contra la base de datos.
    $resultado = mysqli_query($connect, $sql);
    //Busca el próximo registro de un conjunto de resultados como un array asociativo.
    while ($row = mysqli_fetch_assoc($resultado)) {
        $output[] = $row;
    }
    //Retorna la representación JSON de los datos de la consulta.
    print(json_encode($output));
    //Cierra la conexión a la base de datos.
    $connect->close();
}