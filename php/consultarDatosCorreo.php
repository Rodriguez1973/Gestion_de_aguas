<?php
/*
Proyecto realizado por: José A. Rodríguez López.
Fecha: 13/02/2022.
Petición de un registro a la base de datos.
*/

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
include('conexionBD.php');
//Recibe el array con los datos JSON.
$IdDispositivo=$_POST['Envio'];
//Si hay error en la conexión.
if ($connect->connect_errno) {
    echo "Fallo al conectar a MySQL: (" . $connect->connect_errno . ") " . $connect->connect_error;
//Si no hay error en la conexión.
} else {
    //Consulta a realizar a la base de datos.
    $sql = "select a.NIF, a.Nombre, a.Apellido1, a.Apellido2, a.Email, d.Id, d.Direccion, c.Fecha_medida, c.Medida, c.Precio from 
    abonados a inner join dispositivos d on a.nif=d.nif inner join consumos c on c.IdDispositivo=d.Id where 
    Id=" . $IdDispositivo . " order by c.Fecha_medida desc limit 2;";

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
?>