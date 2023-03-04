<!DOCTYPE html>

<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta charset="UTF-8">
    <title>Gestión de aguas</title>
    <link rel="stylesheet" href="./css/estilosIndex.css" />
    <link rel="icon" href="data:,"> <!--Elimina error favicon.ico-->
    <!--Script objetos y eventos sobre el documento-->
    <!-- SweetAlert -->
    <!--Plugin con el cual podremos dar un aspecto profesional a los mensajes que lancemos a los usuarios acorde a las tendencias actuales -->
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>
    <!--Script funciones-->
    <script src="./js/Funciones.js"></script>
    <!--Script operaciones de generación fechas-->
    <script src="./js/GeneradorFechas.js" defer></script>
</head>

<?php
$mensaje = "";
$error = false;

//Si se ha establecido el login.
if (isset($_POST['acceder'])) {
    require_once './php/conexionBD.php';
    if (isset($connect)) {
        $usuario = $_POST['usuario'];
        $password = $_POST['password'];
        $password = hash('sha256', $password); //Codifica la contraseña.

        $stmt = $connect->stmt_init();
        $consulta = "select count(*) as cont from usuarios where usuario=? and pass=?;";
        $stmt->prepare($consulta);
        $stmt->bind_param('ss', $usuario, $password);
        if ($stmt->execute()) {
            $resultado = $stmt->get_result();
            if (isset($resultado)) {
                $registro = $resultado->fetch_assoc();
                if ($registro['cont'] == 1) {
                    $_SESSION['usuario'] = $usuario;
                    header("Location: ./principal.html");
                } else {
                    $error = true;
                    $mensaje = "Los datos de login son incorrectos.";
                }
            } else {
                $error = true;
                $mensaje = "Los datos de login son incorrectos.";
            }
        } else {
            $error = true;
            $mensaje = "Se ha producido un error en la ejecución de la consulta.";
        }
    }
}
?>

<body>
    <header>
        <img src="./images/AquaGest.jpg" alt="Logo AquaGest">
        <h1>Gestión de aguas</h1>
        <p id="fecha"></p>
    </header>

    <main>
        <div id="contenedor">
            <div id="formulario">
                <form name="formulario_login" id="formulario_login" action="<?php echo $_SERVER['PHP_SELF']; ?>"
                    method="post">
                    <h2>Identifíquese</h2>
                    <div class="elemento">
                        <label for="usuario">Usuario:</label>
                        <input type="text" name="usuario" id="usuario">
                    </div>
                    <div class="elemento">
                        <label for="password">Contraseña:</label>
                        <input type="password" name="password" id="password">
                    </div>
                    <div class="elemento">
                        <input type="submit" name="acceder" id="acceder" value="Acceder">
                    </div>
                </form>
            </div>
        </div>
    </main>

    <!--Pie de página-->
    <footer id="pie">
        <div>
            <img src="./images/JARL_Logo.jpg" alt="JARL_Logo">
            <div>
                <p>Desarrollo de aplicaciones Web(DAW) &copy; CIFP Santa Catalina</p>
                <p>Realizado por: José A. Rodríguez López.</p>
            </div>
        </div>
    </footer>
    <script>
        <?php
        if ($error == true) {
            echo "mostrarVentanaEmergente('" . $mensaje . "', 'error')";
        }
        ?>
    </script>
</body>

</html>