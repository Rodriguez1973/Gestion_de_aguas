<?php

header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');
include('conexionBD.php');

$dispositivo=$_POST['idDispositivo'];

if (isset($connect)) {
    $sql="select d.id idDispositivo, a.NIF nif, a.Nombre nombre, a.Apellido1 apellido1, a.Apellido2 apellido2, ".
    "d.Direccion direccion, c.Fecha_medida fecha, c.Medida medida, c.Precio precio from abonados a inner join ".
    "dispositivos d on a.NIF=d.NIF inner join consumos c on c.IdDispositivo=d.Id where d.Id=".$dispositivo." order by fecha DESC;";
    
    $resultado=mysqli_query($connect,$sql);
    while ($registro=mysqli_fetch_assoc($resultado)) {
        $output[]=$registro;
    }
    print(json_encode($output));
    mysqli_close($connect);
}
?>