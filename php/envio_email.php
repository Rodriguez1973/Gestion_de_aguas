
<?php

//CLAVEDOSPASOS  la obtenida configurando GMAIL en el tutorial  https://www.espai.es/blog/2022/06/phpmailer-ya-no-envia-correos-a-traves-de-gmail/
//(Activar la verificación en dos pasos)
require('PHPMailer.php');

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');

//Recibe el array con los datos JSON.
$contenido = $_POST['Envio'];
//Acondicionamiento de la cadena para ser tratada.
$contenido = str_replace("\\", "", $contenido);
//Se decodifican los datos JSON.
$array = json_decode($contenido, true);
//Extracción de los datos.
$tmpArray = array();

foreach ($array as $dato) {
	$tmpArray[] = $dato;
}

$mail = new PHPMailer();
try {
    //Direcciones de envio y recepción.
    $mail->setFrom('s022045b_rodriguez@informaticasc.com');
    $mail->addAddress($tmpArray[2]);     //Añade un destinatario
    $mail->addReplyTo('s022045b_rodriguez@informaticasc.com');


    //Contenido
    $mail->isHTML(true);                                 
    $mail->Subject = 'Información del contrato del suministro de aguas';
    $mail->Body    = '<p><b>Fecha: </b>'.$tmpArray[4].'</p><p><b>Dirección: </b>'.$tmpArray[3].'</p>';
    
    //$mail->AddAttachment("ficheroAEnviar.pdf"); //Opcional

    $mail->send();
} catch (Exception $e) {
    echo "Error en el envío. Mailer Error: {$mail->ErrorInfo}";
}