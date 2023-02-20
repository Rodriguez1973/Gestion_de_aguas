<?php

//CLAVEDOSPASOS  la obtenida configurando GMAIL en el tutorial  https://www.espai.es/blog/2022/06/phpmailer-ya-no-envia-correos-a-traves-de-gmail/
//(Activar la verificación en dos pasos)


require('PHPMailer.php');

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

    //Destinatario
    $mail->setFrom('gestionaguasaranda@gmail.com','SERVICIO_AGUAS');
    $mail->addAddress($tmpArray[3]);     //Añade un destinatario
    $mail->addReplyTo('gestionaguasaranda@gmail.com');


    //Content
    $mail->isHTML(true);                                 
    $mail->Subject = utf8_decode($tmpArray[0]);
    $mail->Body    = utf8_decode("<p><b>Fecha: </b>$tmpArray[5]</p><p><b>Dirección: </b>$tmpArray[4]</p>".
    "<p><b>Hola $tmpArray[2]:</b></p><p>En los próximos días, procederemos a domiciliar el recibo en su cuenta
    del servicio prestado, por un importe de $tmpArray[6]&euro;.</p><p>Los servicios municipales de aguas le 
    saludan atentamente.</p>");
    
    //Attachments
    $mail->AddAttachment("ficheroAEnviar.pdf"); //Opcional

    $mail->send();
    echo "El correo con la factura se envio correctamente";
} catch (Exception $e) {
    echo "Error en el envío. Mailer Error: {$mail->ErrorInfo}";
}